import React, { useState } from 'react';
import { Modal, Button, Nav, Accordion, Card, Row, Col, Badge } from 'react-bootstrap';
import {
  FiHelpCircle,
  FiMail,
  FiPhone,
  FiBookOpen,
  FiCheckCircle,
  FiExternalLink,
  FiShield,
  FiClock,
  FiMessageSquare
} from 'react-icons/fi';

const SupportDocsModal = ({ show, onHide }) => {
  const [activeTab, setActiveTab] = useState('faqs');

  const faqsList = [
    {
      q: 'How do I audit and verify a new NGO or shelter?',
      a: 'Navigate to the "Users" page and filter by "Pending Verification". Click the action menu next to the NGO record and select "Audit Verification Docs". Review their submitted Business License, Hygiene Certificate, or Tax Exemption PDF before clicking Approve or Reject.'
    },
    {
      q: 'What happens when a food donation listing expires?',
      a: 'Food listings automatically transition to "Expired" status when their pickup window passes without being claimed. Expired items are logged in the System Audit Trail and removed from active search listings on the public platform.'
    },
    {
      q: 'How are CO2 emissions savings calculated?',
      a: 'ANNShare estimates carbon offset using standard food waste metrics: approximately 2.5 kg of CO2 equivalent emissions are prevented for every 1.0 kg of surplus food successfully rescued and distributed.'
    },
    {
      q: 'How do I handle food safety complaints or temperature issues?',
      a: 'All reported issues appear under the "Feedback / Complaints" module. High priority temperature non-conformity complaints should be immediately assigned to an operations supervisor to re-audit the donor kitchen.'
    },
    {
      q: 'What phone format is required for local users in Nepal?',
      a: 'All local contact phone numbers must follow standard Nepali formats, such as +977 98XXXXXXXX (mobile) or +977 1-XXXXXXX (Kathmandu Valley landline).'
    }
  ];

  return (
    <Modal show={show} onHide={onHide} size="lg" centered style={{ borderRadius: '16px' }}>
      <Modal.Header closeButton style={{ borderBottom: '1px solid #E6ECE8', padding: '20px 24px', background: '#F7F8F6' }}>
        <Modal.Title style={{ color: '#173F35', fontWeight: 700, fontSize: '1.25rem', fontFamily: 'Poppins, sans-serif' }} className="d-flex align-items-center gap-2">
          <FiHelpCircle style={{ color: '#173F35' }} />
          ANNShare Operations Support & Documentation
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: '24px', background: '#ffffff' }}>
        <Nav variant="pills" activeKey={activeTab} onSelect={(t) => setActiveTab(t)} className="mb-4 gap-2">
          <Nav.Item>
            <Nav.Link
              eventKey="faqs"
              style={{
                borderRadius: '20px',
                fontWeight: 600,
                fontSize: '0.84rem',
                background: activeTab === 'faqs' ? '#173F35' : '#EEF5F2',
                color: activeTab === 'faqs' ? '#ffffff' : '#173F35'
              }}
            >
              <FiHelpCircle className="me-1" /> Frequently Asked Questions
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="contact"
              style={{
                borderRadius: '20px',
                fontWeight: 600,
                fontSize: '0.84rem',
                background: activeTab === 'contact' ? '#173F35' : '#EEF5F2',
                color: activeTab === 'contact' ? '#ffffff' : '#173F35'
              }}
            >
              <FiMail className="me-1" /> Help Desk & Support
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="docs"
              style={{
                borderRadius: '20px',
                fontWeight: 600,
                fontSize: '0.84rem',
                background: activeTab === 'docs' ? '#173F35' : '#EEF5F2',
                color: activeTab === 'docs' ? '#ffffff' : '#173F35'
              }}
            >
              <FiBookOpen className="me-1" /> Operations Guide
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {activeTab === 'faqs' && (
          <div>
            <h6 style={{ fontWeight: 700, color: '#173F35', marginBottom: '14px' }}>
              Common Operations & Platform FAQs
            </h6>
            <Accordion defaultActiveKey="0" className="custom-support-accordion">
              {faqsList.map((faq, idx) => (
                <Accordion.Item eventKey={String(idx)} key={idx} style={{ border: '1px solid #E6ECE8', borderRadius: '10px', marginBottom: '10px', overflow: 'hidden' }}>
                  <Accordion.Header style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                    {faq.q}
                  </Accordion.Header>
                  <Accordion.Body style={{ fontSize: '0.84rem', color: '#374151', background: '#F7F8F6', lineHeight: '1.5' }}>
                    {faq.a}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        )}

        {activeTab === 'contact' && (
          <div>
            <h6 style={{ fontWeight: 700, color: '#173F35', marginBottom: '14px' }}>
              Operations Support & Emergency Contacts
            </h6>
            <Row className="g-3 mb-4">
              <Col md={6}>
                <Card style={{ border: '1px solid #E6ECE8', borderRadius: '12px', padding: '16px', background: '#EEF5F2' }}>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <FiMail style={{ color: '#173F35', fontSize: '1.1rem' }} />
                    <strong style={{ color: '#173F35', fontSize: '0.9rem' }}>Email Help Desk</strong>
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#374151' }}>support@annshare.org</div>
                  <div style={{ fontSize: '0.76rem', color: '#68736D', marginTop: '4px' }}>24/7 Monitoring • Response within 2 hours</div>
                </Card>
              </Col>

              <Col md={6}>
                <Card style={{ border: '1px solid #E6ECE8', borderRadius: '12px', padding: '16px', background: '#FDF2EE' }}>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <FiPhone style={{ color: '#B9684D', fontSize: '1.1rem' }} />
                    <strong style={{ color: '#B9684D', fontSize: '0.9rem' }}>Kathmandu Hotline</strong>
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#374151' }}>+977 1-4234567 / +977 9841234567</div>
                  <div style={{ fontSize: '0.76rem', color: '#68736D', marginTop: '4px' }}>Emergency Courier Dispatch Support</div>
                </Card>
              </Col>
            </Row>

            <div className="p-3 rounded" style={{ background: '#F7F8F6', border: '1px solid #E6ECE8', fontSize: '0.84rem' }}>
              <div className="d-flex align-items-center gap-2 mb-1">
                <FiClock style={{ color: '#173F35' }} />
                <strong>Support Desk Hours:</strong>
              </div>
              <p style={{ margin: 0, color: '#68736D' }}>
                Sunday – Friday: 8:00 AM – 8:00 PM NPT (Kathmandu Valley Operations Team)
              </p>
            </div>
          </div>
        )}

        {activeTab === 'docs' && (
          <div>
            <h6 style={{ fontWeight: 700, color: '#173F35', marginBottom: '14px' }}>
              ANNShare Platform Operations Manual
            </h6>
            <div className="d-flex flex-column gap-3" style={{ fontSize: '0.85rem' }}>
              <div className="p-3 rounded" style={{ border: '1px solid #E6ECE8', background: '#ffffff' }}>
                <strong style={{ color: '#173F35' }}>1. Surplus Food Category Management</strong>
                <p style={{ margin: '4px 0 0 0', color: '#68736D' }}>
                  All donations must adhere to the 7 canonical platform categories: <em>Prepared Meals, Bakery & Bread, Fruits & Veggies, Packaged Food, Rice & Grains, Dairy & Pantry, Other Items</em>.
                </p>
              </div>

              <div className="p-3 rounded" style={{ border: '1px solid #E6ECE8', background: '#ffffff' }}>
                <strong style={{ color: '#173F35' }}>2. NGO Verification Requirements</strong>
                <p style={{ margin: '4px 0 0 0', color: '#68736D' }}>
                  NGO partners must present valid registration or tax-exempt status in Nepal before claiming hot meal boxes or bakery surplus listings.
                </p>
              </div>

              <div className="p-3 rounded" style={{ border: '1px solid #E6ECE8', background: '#ffffff' }}>
                <strong style={{ color: '#173F35' }}>3. Standardized Quantities & Data Model</strong>
                <p style={{ margin: '4px 0 0 0', color: '#68736D' }}>
                  Quantities are stored cleanly with exact display units (e.g. 50 boxes, 25 bags, 45 kg) without secondary parenthetical weight additions.
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer style={{ borderTop: '1px solid #E6ECE8', padding: '16px 24px', background: '#F7F8F6' }}>
        <Button variant="secondary" size="sm" onClick={onHide} style={{ borderRadius: '20px', padding: '6px 18px', fontWeight: 600 }}>
          Close Support Window
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SupportDocsModal;
