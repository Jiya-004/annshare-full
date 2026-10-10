import React, { useState } from 'react';
import { Container, Card, Row, Col, Form, Button, Table, Toast, ToastContainer, ProgressBar } from 'react-bootstrap';
import { FiBarChart2, FiDownload, FiFilter, FiCalendar, FiCheckCircle, FiClock } from 'react-icons/fi';
import { getDonations, getCategories } from '../../services/adminService';

const Reports = () => {
  const [reportType, setReportType] = useState('Donations & Impact');
  const [dateRange, setDateRange] = useState('This Month');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const donations = getDonations();
  const categories = getCategories();

  const handleExportCSV = () => {
    const headers = ["Donation ID", "Food Name", "Category", "Donor", "Quantity", "Location", "Status"];
    const rows = donations.map(d => [d.id, d.foodName || d.title, d.category, d.donor, d.quantity, d.location, d.status]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ANNShare_Report_${dateRange.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage("Report CSV successfully downloaded!");
    setShowToast(true);
  };

  const handleExportPDF = () => {
    setToastMessage("Generating PDF report package... Download starting.");
    setShowToast(true);
  };

  return (
    <Container fluid className="p-0">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2 style={{ fontWeight: 700, color: 'var(--evergreen)', margin: 0, fontSize: '1.6rem', fontFamily: 'var(--font-heading)' }}>
            Reports & Analytics Generator
          </h2>
          <p style={{ margin: '4px 0 0 0', color: 'var(--muted)', fontSize: '0.88rem' }}>
            Generate impact analytics, food waste metrics, and export data.
          </p>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Button variant="outline-success" size="sm" style={{ borderRadius: '20px', fontWeight: 600, color: 'var(--evergreen)', borderColor: 'var(--evergreen)' }} onClick={handleExportCSV}>
            <FiDownload className="me-1" /> Export CSV
          </Button>
          <Button variant="success" size="sm" style={{ background: 'var(--evergreen)', borderColor: 'var(--evergreen)', borderRadius: '20px', fontWeight: 600 }} onClick={handleExportPDF}>
            <FiDownload className="me-1" /> Export PDF
          </Button>
        </div>
      </div>

      {/* Filter Controls Card */}
      <Card style={{ border: '1px solid var(--border)', borderRadius: '16px', background: '#ffffff', padding: '20px', marginBottom: '24px' }}>
        <Row className="g-3">
          <Col lg={3} md={6}>
            <Form.Group>
              <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--charcoal)' }}>Report Type</Form.Label>
              <Form.Select value={reportType} onChange={(e) => setReportType(e.target.value)} style={{ borderRadius: '8px', fontSize: '0.86rem' }}>
                <option value="Donations & Impact">Donations & Food Waste Saved</option>
                <option value="NGO Distribution">NGO Distribution & Meals Received</option>
                <option value="Donor Performance">Top Donor Performance</option>
                <option value="Expired Food Log">Expired & Unclaimed Surplus</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col lg={3} md={6}>
            <Form.Group>
              <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--charcoal)' }}>Date Range</Form.Label>
              <Form.Select value={dateRange} onChange={(e) => setDateRange(e.target.value)} style={{ borderRadius: '8px', fontSize: '0.86rem' }}>
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="This Month">This Month (Aug 2026)</option>
                <option value="Last Quarter">Last Quarter (Q2 2026)</option>
                <option value="Full Year 2026">Full Year 2026</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col lg={3} md={6}>
            <Form.Group>
              <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--charcoal)' }}>Category Filter</Form.Label>
              <Form.Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} style={{ borderRadius: '8px', fontSize: '0.86rem' }}>
                <option value="All">All Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col lg={3} md={6} className="d-flex align-items-end">
            <Button style={{ background: 'var(--forest)', borderColor: 'var(--forest)', color: '#ffffff', borderRadius: '8px', width: '100%', fontSize: '0.86rem', fontWeight: 600 }}>
              <FiFilter className="me-1" /> Apply Report Filters
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Generated Report Content */}
      <Row className="g-4 mb-4">
        <Col lg={6}>
          <Card style={{ border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', background: '#ffffff', height: '100%' }}>
            <h5 style={{ fontWeight: 700, color: 'var(--evergreen)', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>Impact Metrics Summary</h5>
            <div className="d-flex flex-column gap-3">
              <div>
                <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.84rem' }}>
                  <span>Prepared Meals Rescued</span>
                  <strong>14,250 kg (42%)</strong>
                </div>
                <ProgressBar now={42} style={{ height: '8px', borderRadius: '4px', backgroundColor: 'var(--sand-light)' }}>
                  <ProgressBar now={42} style={{ backgroundColor: 'var(--evergreen)', borderRadius: '4px' }} />
                </ProgressBar>
              </div>

              <div>
                <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.84rem' }}>
                  <span>Fruits & Veggies Saved</span>
                  <strong>11,800 kg (35%)</strong>
                </div>
                <ProgressBar now={35} style={{ height: '8px', borderRadius: '4px', backgroundColor: 'var(--sand-light)' }}>
                  <ProgressBar now={35} style={{ backgroundColor: 'var(--forest)', borderRadius: '4px' }} />
                </ProgressBar>
              </div>

              <div>
                <div className="d-flex justify-content-between mb-1" style={{ fontSize: '0.84rem' }}>
                  <span>Bakery & Bread Delivered</span>
                  <strong>7,750 kg (23%)</strong>
                </div>
                <ProgressBar now={23} style={{ height: '8px', borderRadius: '4px', backgroundColor: 'var(--sand-light)' }}>
                  <ProgressBar now={23} style={{ backgroundColor: 'var(--terracotta)', borderRadius: '4px' }} />
                </ProgressBar>
              </div>
            </div>
          </Card>
        </Col>

        <Col lg={6}>
          <Card style={{ border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', background: '#ffffff', height: '100%' }}>
            <h5 style={{ fontWeight: 700, color: 'var(--evergreen)', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>Key Performance Highlights</h5>
            <div className="d-flex flex-column gap-2" style={{ fontSize: '0.88rem', color: 'var(--charcoal)' }}>
              <div className="p-2 rounded d-flex align-items-center gap-2" style={{ background: 'var(--cream)' }}>
                <FiBarChart2 style={{ color: 'var(--evergreen)' }} />
                <span><strong>CO2 Equivalency Saved:</strong> 38,500 kg CO2e</span>
              </div>
              <div className="p-2 rounded d-flex align-items-center gap-2" style={{ background: 'var(--cream)' }}>
                <FiCalendar style={{ color: 'var(--evergreen)' }} />
                <span><strong>Total Meals Served:</strong> 128,450 meals</span>
              </div>
              <div className="p-2 rounded d-flex align-items-center gap-2" style={{ background: 'var(--cream)' }}>
                <FiClock style={{ color: 'var(--evergreen)' }} />
                <span><strong>Avg Pickup Time:</strong> 34 minutes from posting</span>
              </div>
              <div className="p-2 rounded d-flex align-items-center gap-2" style={{ background: 'var(--cream)' }}>
                <FiFilter style={{ color: 'var(--evergreen)' }} />
                <span><strong>Active Partner Network:</strong> 48 Donors, 186 NGOs</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Report Data Table */}
      <Card style={{ border: '1px solid var(--border)', borderRadius: '16px', background: '#ffffff', padding: '24px' }}>
        <h5 style={{ fontWeight: 700, color: 'var(--evergreen)', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>Generated Report Breakdown</h5>
        <div className="table-responsive">
          <Table hover align="middle" className="mb-0" style={{ fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ fontSize: '0.74rem', color: 'var(--muted)', textTransform: 'uppercase' }}>
                <th style={{ background: 'transparent', borderBottom: '1px solid var(--border)' }}>Listing ID</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid var(--border)' }}>Food Item</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid var(--border)' }}>Category</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid var(--border)' }}>Donor</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid var(--border)' }}>Quantity</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid var(--border)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(don => (
                <tr key={don.id}>
                  <td><strong>#{don.id}</strong></td>
                  <td>{don.foodName || don.title}</td>
                  <td>{don.category}</td>
                  <td>{don.donor}</td>
                  <td>{don.quantity}</td>
                  <td>
                    <span style={{ fontSize: '0.76rem', padding: '2px 8px', borderRadius: '12px', background: '#EEF5F2', color: 'var(--evergreen)', fontWeight: 600 }}>
                      {don.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>

      {/* Toast Feedback */}
      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3500} autohide bg="light">
          <Toast.Header>
            <FiCheckCircle className="me-2 text-success" />
            <strong className="me-auto" style={{ color: 'var(--charcoal)' }}>ANNShare Reports</strong>
          </Toast.Header>
          <Toast.Body style={{ fontSize: '0.84rem', color: 'var(--charcoal)' }}>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default Reports;
