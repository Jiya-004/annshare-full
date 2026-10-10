import React, { useState } from 'react';
import { Container, Card, Row, Col, Form, Button, Nav, Accordion, Toast, ToastContainer } from 'react-bootstrap';
import {
  FiHelpCircle,
  FiMail,
  FiPhone,
  FiBookOpen,
  FiSearch,
  FiClock,
  FiCheckCircle,
  FiSend,
  FiShield,
  FiFileText
} from 'react-icons/fi';

import { addSupportTicket } from '../../services/adminService';

const SupportDocs = () => {
  const [activeTab, setActiveTab] = useState('faqs');
  const [searchFaq, setSearchFaq] = useState('');
  
  // Contact Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const faqsList = [
    {
      q: 'How do I audit and verify a new NGO or shelter?',
      category: 'NGO Verification',
      a: 'Navigate to the "Users" page and filter by "Pending Verification". Click the action menu next to the NGO record and select "Audit Verification Docs". Review their submitted Business License, Hygiene Certificate, or Tax Exemption PDF before clicking Approve or Reject.'
    },
    {
      q: 'What happens when a food donation listing expires?',
      category: 'Food Listings',
      a: 'Food listings automatically transition to "Expired" status when their pickup window passes without being claimed. Expired items are logged in the System Audit Trail and removed from active search listings on the public platform.'
    },
    {
      q: 'How are CO2 emissions savings calculated?',
      category: 'Impact Analytics',
      a: 'ANNShare estimates carbon offset using standard food waste metrics: approximately 2.5 kg of CO2 equivalent emissions are prevented for every 1.0 kg of surplus food successfully rescued and distributed.'
    },
    {
      q: 'How do I handle food safety complaints or temperature issues?',
      category: 'Safety Compliance',
      a: 'All reported issues appear under the "Feedback / Complaints" module. High priority temperature non-conformity complaints should be immediately assigned to an operations supervisor to re-audit the donor kitchen.'
    },
    {
      q: 'What phone format is required for local users in Nepal?',
      category: 'User Accounts',
      a: 'All local contact phone numbers must follow standard Nepali formats, such as +977 98XXXXXXXX (mobile) or +977 1-XXXXXXX (Kathmandu Valley landline).'
    },
    {
      q: 'What are the 7 canonical food categories allowed on the platform?',
      category: 'Food Categories',
      a: 'The 7 canonical platform categories are: Prepared Meals, Bakery & Bread, Fruits & Veggies, Packaged Food, Rice & Grains, Dairy & Pantry, and Other Items.'
    }
  ];

  const filteredFaqs = faqsList.filter(f =>
    f.q.toLowerCase().includes(searchFaq.toLowerCase()) ||
    f.a.toLowerCase().includes(searchFaq.toLowerCase()) ||
    f.category.toLowerCase().includes(searchFaq.toLowerCase())
  );

  const handleSubmitSupportTicket = (e) => {
    e.preventDefault();
    const ticket = addSupportTicket({ fullName, email, subject, message });
    setFullName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setToastMessage(`Support ticket #${ticket.id} submitted! Recorded in Feedback / Complaints.`);
    setShowToast(true);
  };

  return (
    <Container fluid className="p-0">
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 2000 }}>
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={4000} autohide bg="success">
          <Toast.Body className="text-white d-flex align-items-center gap-2">
            <FiCheckCircle size={18} />
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Page Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 style={{ fontWeight: 700, color: 'var(--evergreen)', margin: 0, fontSize: '1.6rem', fontFamily: 'var(--font-heading)' }}>
            Operations Support & Documentation
          </h2>
          <p style={{ margin: '4px 0 0 0', color: 'var(--muted)', fontSize: '0.88rem' }}>
            Frequently Asked Questions, Help Desk Contact, and Platform Guidelines.
          </p>
        </div>
      </div>

      {/* Main Card Wrapper */}
      <Card style={{ border: '1px solid var(--border)', borderRadius: '16px', background: '#ffffff', padding: '24px' }}>
        {/* Navigation Tabs */}
        <Nav variant="tabs" activeKey={activeTab} onSelect={(t) => setActiveTab(t)} className="mb-4">
          <Nav.Item>
            <Nav.Link eventKey="faqs" style={{ fontWeight: 600, fontSize: '0.88rem', color: activeTab === 'faqs' ? 'var(--evergreen)' : 'var(--muted)' }}>
              <FiHelpCircle className="me-2" /> Frequently Asked Questions
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="contact" style={{ fontWeight: 600, fontSize: '0.88rem', color: activeTab === 'contact' ? 'var(--evergreen)' : 'var(--muted)' }}>
              <FiMail className="me-2" /> Help Desk & Contact
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="docs" style={{ fontWeight: 600, fontSize: '0.88rem', color: activeTab === 'docs' ? 'var(--evergreen)' : 'var(--muted)' }}>
              <FiBookOpen className="me-2" /> System Documentation
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Tab 1: FAQs */}
        {activeTab === 'faqs' && (
          <div>
            <div className="mb-4" style={{ maxWidth: '500px', position: 'relative' }}>
              <FiSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
              <Form.Control
                type="text"
                placeholder="Search FAQs by keyword or category..."
                value={searchFaq}
                onChange={(e) => setSearchFaq(e.target.value)}
                style={{ paddingLeft: '38px', borderRadius: '20px', fontSize: '0.86rem' }}
              />
            </div>

            {filteredFaqs.length > 0 ? (
              <Accordion defaultActiveKey="0">
                {filteredFaqs.map((faq, idx) => (
                  <Accordion.Item eventKey={String(idx)} key={idx} style={{ border: '1px solid var(--border)', borderRadius: '12px', marginBottom: '12px', overflow: 'hidden' }}>
                    <Accordion.Header>
                      <div className="d-flex align-items-center gap-2">
                        <span style={{ fontSize: '0.74rem', padding: '2px 8px', borderRadius: '12px', background: 'var(--cream)', color: 'var(--evergreen)', fontWeight: 600 }}>
                          {faq.category}
                        </span>
                        <strong style={{ fontSize: '0.9rem', color: 'var(--charcoal)' }}>{faq.q}</strong>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body style={{ fontSize: '0.86rem', color: 'var(--charcoal)', background: '#F7F8F6', lineHeight: '1.6' }}>
                      {faq.a}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-4 text-muted">
                No FAQs found matching "{searchFaq}".
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Help Desk & Contact */}
        {activeTab === 'contact' && (
          <Row className="g-4">
            <Col lg={5}>
              <div className="d-flex flex-column gap-3">
                <Card style={{ border: '1px solid var(--border)', borderRadius: '14px', padding: '20px', background: '#EEF5F2' }}>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <FiMail style={{ color: 'var(--evergreen)', fontSize: '1.2rem' }} />
                    <strong style={{ color: 'var(--evergreen)', fontSize: '0.95rem' }}>Email Help Desk</strong>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--charcoal)' }}>support@annshare.org</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '4px' }}>24/7 Ops Monitoring • Response within 2 hours</div>
                </Card>

                <Card style={{ border: '1px solid var(--border)', borderRadius: '14px', padding: '20px', background: '#FDF2EE' }}>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <FiPhone style={{ color: 'var(--terracotta)', fontSize: '1.2rem' }} />
                    <strong style={{ color: 'var(--terracotta)', fontSize: '0.95rem' }}>Kathmandu Hotline</strong>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--charcoal)' }}>+977 1-4234567 / +977 9841234567</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '4px' }}>Emergency Dispatch & Field Support</div>
                </Card>

                <Card style={{ border: '1px solid var(--border)', borderRadius: '14px', padding: '20px', background: '#ffffff' }}>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <FiClock style={{ color: 'var(--evergreen)' }} />
                    <strong style={{ fontSize: '0.88rem' }}>Operating Hours:</strong>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>
                    Sunday – Friday: 8:00 AM – 8:00 PM NPT (Kathmandu Valley Headquarters)
                  </p>
                </Card>
              </div>
            </Col>

            <Col lg={7}>
              <Card style={{ border: '1px solid var(--border)', borderRadius: '14px', padding: '20px', background: '#ffffff' }}>
                <h5 style={{ fontWeight: 700, color: 'var(--evergreen)', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>
                  Submit Operational Support Ticket
                </h5>
                <Form onSubmit={handleSubmitSupportTicket}>
                  <Row className="g-3 mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label style={{ fontSize: '0.84rem', fontWeight: 600 }}>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Your Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                          style={{ fontSize: '0.86rem' }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label style={{ fontSize: '0.84rem', fontWeight: 600 }}>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="admin@annshare.org"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          style={{ fontSize: '0.86rem' }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontSize: '0.84rem', fontWeight: 600 }}>Inquiry Subject</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. NGO Audit Verification issue, Category update..."
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      style={{ fontSize: '0.86rem' }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ fontSize: '0.84rem', fontWeight: 600 }}>Message Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Describe your inquiry or issue details..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      style={{ fontSize: '0.86rem' }}
                    />
                  </Form.Group>

                  <Button type="submit" style={{ background: 'var(--evergreen)', borderColor: 'var(--evergreen)', borderRadius: '20px', padding: '8px 22px', fontWeight: 600, fontSize: '0.86rem' }}>
                    <FiSend className="me-1" /> Send Support Ticket
                  </Button>
                </Form>
              </Card>
            </Col>
          </Row>
        )}

        {/* Tab 3: System Documentation */}
        {activeTab === 'docs' && (
          <div className="d-flex flex-column gap-3">
            <Card style={{ border: '1px solid var(--border)', borderRadius: '14px', padding: '20px', background: '#ffffff' }}>
              <h6 style={{ fontWeight: 700, color: 'var(--evergreen)', className: 'd-flex align-items-center gap-2 mb-2' }}>
                <FiShield style={{ color: 'var(--evergreen)' }} /> 1. Surplus Food Category Management & Standard
              </h6>
              <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--muted)', lineHeight: '1.6' }}>
                All surplus food donations listed on the platform must be categorized into one of the 7 canonical platform categories:
                <strong> Prepared Meals</strong>, <strong>Bakery & Bread</strong>, <strong>Fruits & Veggies</strong>, <strong>Packaged Food</strong>, <strong>Rice & Grains</strong>, <strong>Dairy & Pantry</strong>, or <strong>Other Items</strong>.
              </p>
            </Card>

            <Card style={{ border: '1px solid var(--border)', borderRadius: '14px', padding: '20px', background: '#ffffff' }}>
              <h6 style={{ fontWeight: 700, color: 'var(--evergreen)', className: 'd-flex align-items-center gap-2 mb-2' }}>
                <FiFileText style={{ color: 'var(--evergreen)' }} /> 2. NGO Compliance Audit & Document Protocol
              </h6>
              <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--muted)', lineHeight: '1.6' }}>
                Before an NGO or community shelter can claim food listings, they must upload government registration, tax-exemption proof, or hygiene audit documentation. Admins verify these documents in the <em>User & Partner Management</em> module before assigning a <strong>Verified Partner</strong> badge.
              </p>
            </Card>

            <Card style={{ border: '1px solid var(--border)', borderRadius: '14px', padding: '20px', background: '#ffffff' }}>
              <h6 style={{ fontWeight: 700, color: 'var(--evergreen)', className: 'd-flex align-items-center gap-2 mb-2' }}>
                <FiCheckCircle style={{ color: 'var(--evergreen)' }} /> 3. Data Model & Quantity Standards
              </h6>
              <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--muted)', lineHeight: '1.6' }}>
                All quantities across listings, donation management tables, and reports are formatted cleanly with exact stored unit values (e.g. <em>50 boxes</em>, <em>25 bags</em>, <em>45 kg</em>) without invented parenthetical weight conversions.
              </p>
            </Card>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default SupportDocs;
