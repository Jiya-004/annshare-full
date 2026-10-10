import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Card, Table, Button, Form, Row, Col } from 'react-bootstrap';
import {
  FiEye,
  FiArrowLeft,
  FiSearch
} from 'react-icons/fi';

import {
  getComplaints,
  subscribeToAdminService
} from '../../services/adminService';

// Styled Components
const PageHeader = styled.div`
  margin-bottom: 24px;

  h2 {
    font-weight: 600;
    color: #12201B;
    margin: 0;
    font-size: 1.55rem;
    letter-spacing: -0.5px;
  }

  p {
    margin: 3px 0 0 0;
    color: #66736D;
    font-size: 0.86rem;
  }
`;

const MainCard = styled(Card)`
  border: 1px solid #E6ECE8;
  border-radius: 16px;
  background: #ffffff;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.015);
`;

const BackButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.84rem;
  padding: 6px 16px;
  border: 1px solid #E6ECE8;
  background: #ffffff;
  color: #12201B;
  transition: all 0.15s ease;

  &:hover {
    background: #EEF8F4;
    border-color: #185C4A;
    color: #185C4A;
  }
`;

const ViewButton = styled(Button)`
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.8rem;
  padding: 5px 14px;
  border: 1px solid #E6ECE8;
  background: #ffffff;
  color: #185C4A;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.15s ease;

  &:hover {
    background: #EEF8F4;
    border-color: #185C4A;
    color: #185C4A;
  }
`;

// Reference Image Exact Stacked List Container
const DetailCardContainer = styled.div`
  background: #ffffff;
  border: 1px solid #E6ECE8;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  margin-top: 16px;
`;

const DetailCardHeader = styled.div`
  background: #185C4A;
  color: #ffffff;
  padding: 14px 20px;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.2px;
`;

const DetailRow = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #E6ECE8;
  font-size: 0.92rem;
  color: #374151;

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.strong`
  color: #12201B;
  font-weight: 700;
  margin-right: 6px;
`;

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState(getComplaints());
  const [viewingFeedback, setViewingFeedback] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsub = subscribeToAdminService(() => {
      setFeedbackList(getComplaints());
    });
    return unsub;
  }, []);

  const filteredList = feedbackList.filter(item => {
    if (!searchTerm) return true;
    const name = item.fullName || item.userName || '';
    const email = item.email || '';
    const org = item.organization || '';
    const topic = item.topic || item.type || '';
    const term = searchTerm.toLowerCase();
    return (
      name.toLowerCase().includes(term) ||
      email.toLowerCase().includes(term) ||
      org.toLowerCase().includes(term) ||
      topic.toLowerCase().includes(term)
    );
  });

  const handleOpenView = (item) => {
    setViewingFeedback(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // -------------------------------------------------------------
  // VIEW 1: STANDALONE READ-ONLY FEEDBACK DETAILS PAGE VIEW
  // (Exact layout matching user's uploaded reference image)
  // -------------------------------------------------------------
  if (viewingFeedback) {
    const fdb = viewingFeedback;

    return (
      <Container fluid className="p-0">
        {/* Top Header & Breadcrumb Bar */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
          <BackButton variant="light" onClick={() => setViewingFeedback(null)}>
            <FiArrowLeft size={16} /> Back to Feedback List
          </BackButton>

          <div style={{ fontSize: '0.84rem', color: '#66736D', fontWeight: 500 }}>
            Dashboard / Contact Request / <span style={{ color: '#12201B', fontWeight: 600 }}>User Details</span>
          </div>
        </div>

        {/* Exact Reference Image User Details Stacked Card */}
        <Row className="justify-content-center">
          <Col lg={11} md={12}>
            <DetailCardContainer>
              <DetailCardHeader>
                User Details
              </DetailCardHeader>

              {/* 1. Full Name */}
              <DetailRow>
                <DetailLabel>Full Name :</DetailLabel>
                <span>{fdb.fullName || fdb.userName || 'Sarah Jenkins'}</span>
              </DetailRow>

              {/* 2. Email Address */}
              <DetailRow>
                <DetailLabel>Email Address :</DetailLabel>
                <span>{fdb.email || 'sarah.j@greenkitchen.com'}</span>
              </DetailRow>

              {/* 3. Phone Number */}
              <DetailRow>
                <DetailLabel>Phone Number :</DetailLabel>
                <span>{fdb.phone || '+977 9841234567'}</span>
              </DetailRow>

              {/* 4. Organization (Optional) */}
              <DetailRow>
                <DetailLabel>Organization (Optional) :</DetailLabel>
                <span>{fdb.organization || 'Green Kitchen Restaurant'}</span>
              </DetailRow>

              {/* 5. What can we help you with? */}
              <DetailRow>
                <DetailLabel>What can we help you with? :</DetailLabel>
                <span style={{ fontWeight: 600, color: '#185C4A' }}>
                  {fdb.topic || fdb.type || 'Food Donation'}
                </span>
              </DetailRow>

              {/* 6. Message */}
              <DetailRow>
                <DetailLabel>Message :</DetailLabel>
                <span style={{ lineHeight: '1.6' }}>
                  {fdb.message || fdb.description || 'No message content provided.'}
                </span>
              </DetailRow>

              {/* 7. Applied On */}
              <DetailRow>
                <DetailLabel>Applied On :</DetailLabel>
                <span>{fdb.date}</span>
              </DetailRow>
            </DetailCardContainer>
          </Col>
        </Row>
      </Container>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: MAIN FEEDBACK & COMPLAINTS TABLE VIEW
  // -------------------------------------------------------------
  return (
    <Container fluid className="p-0">
      <PageHeader>
        <h2>Feedback & Support Complaints</h2>
        <p>Review received user inquiries, food donation support requests, and messages.</p>
      </PageHeader>

      <MainCard>
        {/* Search Bar */}
        <Row className="g-3 mb-3">
          <Col md={6}>
            <div style={{ position: 'relative' }}>
              <FiSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#66736D', fontSize: '0.92rem' }} />
              <Form.Control
                type="text"
                placeholder="Search by name, email, organization, or help topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ paddingLeft: '38px', borderRadius: '20px', height: '38px', fontSize: '0.84rem', background: '#F7F8F6', border: '1px solid #E6ECE8' }}
              />
            </div>
          </Col>
        </Row>

        {/* Feedback Table */}
        <div className="table-responsive">
          <Table hover align="middle" className="mb-0" style={{ fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ fontSize: '0.74rem', color: '#66736D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>ID</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Full Name</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Email Address</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Phone Number</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Organization</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Help Topic</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }} className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length > 0 ? (
                filteredList.map(fdb => (
                  <tr key={fdb.id}>
                    <td>
                      <strong style={{ color: '#185C4A' }}>#{fdb.id}</strong>
                    </td>
                    <td>
                      <strong style={{ color: '#12201B' }}>{fdb.fullName || fdb.userName}</strong>
                    </td>
                    <td style={{ color: '#66736D' }}>{fdb.email || 'sarah.j@greenkitchen.com'}</td>
                    <td style={{ color: '#66736D' }}>{fdb.phone || '+977 9841234567'}</td>
                    <td style={{ color: '#12201B', fontWeight: 500 }}>{fdb.organization || 'N/A'}</td>
                    <td style={{ fontWeight: 600, color: '#185C4A' }}>
                      {fdb.topic || fdb.type || 'Food Donation'}
                    </td>
                    <td className="text-end">
                      <ViewButton onClick={() => handleOpenView(fdb)}>
                        <FiEye size={14} /> View
                      </ViewButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">
                    No feedback or complaint submissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </MainCard>
    </Container>
  );
};

export default Feedback;
