import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Card, Table, Button, Form, Row, Col, Dropdown, Badge, Modal } from 'react-bootstrap';
import {
  FiHeart,
  FiSearch,
  FiMoreVertical,
  FiEye,
  FiTrash2,
  FiCheckCircle,
  FiRefreshCw,
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
  FiDownload,
  FiCopy,
  FiCheck,
  FiPhone,
  FiCalendar,
  FiShield
} from 'react-icons/fi';

import {
  getWorkerDonations,
  getWorkerDonationStats,
  syncWorkerDonationsFromBackend,
  updateWorkerDonationStatus,
  deleteWorkerDonation,
  subscribeToAdminService
} from '../../services/adminService';

const PageHeader = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;

  .title-group {
    h2 {
      font-weight: 700;
      color: #12201B;
      margin: 0;
      font-size: 1.6rem;
      letter-spacing: -0.5px;
      display: flex;
      align-items: center;
      gap: 10px;

      svg {
        color: #E53E3E;
      }
    }

    p {
      margin: 4px 0 0 0;
      color: #66736D;
      font-size: 0.88rem;
    }
  }

  .action-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const StatCard = styled(Card)`
  border: 1px solid #E6ECE8;
  border-radius: 16px;
  background: #ffffff;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(18, 54, 43, 0.06);
  }

  .icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: ${props => props.$bg || '#EEF8F4'};
    color: ${props => props.$color || '#185C4A'};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.35rem;
    flex-shrink: 0;
  }

  .meta {
    display: flex;
    flex-direction: column;

    .label {
      font-size: 0.78rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #66736D;
    }

    .value {
      font-size: 1.45rem;
      font-weight: 700;
      color: #12201B;
      margin-top: 2px;
    }
  }
`;

const MethodGridCard = styled(Card)`
  border: 1px solid #E6ECE8;
  border-radius: 16px;
  background: #ffffff;
  padding: 16px 20px;
  margin-bottom: 24px;

  .grid-header {
    font-size: 0.86rem;
    font-weight: 700;
    color: #173F35;
    margin-bottom: 12px;
  }

  .methods-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .method-item {
    background: #F8F5ED;
    border: 1px solid rgba(23, 74, 58, 0.08);
    border-radius: 12px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 2px;

    .m-title {
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      color: #66756F;
    }
    .m-val {
      font-size: 1.15rem;
      font-weight: 700;
      color: #174A3A;
    }
  }
`;

const MainCard = styled(Card)`
  border: 1px solid #E6ECE8;
  border-radius: 16px;
  background: #ffffff;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.015);
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 20px;

  .search-box {
    position: relative;
    min-width: 280px;
    flex: 1;
    max-width: 400px;

    svg {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #9AA7A0;
      font-size: 1rem;
    }

    input {
      width: 100%;
      padding: 9px 12px 9px 36px;
      border-radius: 10px;
      border: 1px solid #D6E0DA;
      font-size: 0.88rem;
      outline: none;

      &:focus {
        border-color: #185C4A;
        box-shadow: 0 0 0 3px rgba(24, 92, 74, 0.1);
      }
    }
  }

  .filter-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
`;

const MethodTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.76rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 3px 10px;
  border-radius: 8px;
  background: ${props => props.$bg || '#F0FDF4'};
  color: ${props => props.$color || '#166534'};
  border: 1px solid ${props => props.$border || 'transparent'};
`;

const ActionIconButton = styled.div`
  cursor: pointer;
  padding: 6px 10px;
  color: #66736D;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  &::after {
    display: none !important;
  }

  &:hover {
    background: #EEF8F4;
    color: #185C4A;
  }
`;

export default function WorkerDonations() {
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({ totalRaised: 0, totalCount: 0, average: 0, methodBreakdown: {} });
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewingDonation, setViewingDonation] = useState(null);
  const [deletingDonation, setDeletingDonation] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const loadData = () => {
    setDonations(getWorkerDonations());
    setStats(getWorkerDonationStats());
  };

  useEffect(() => {
    loadData();
    const unsub = subscribeToAdminService(() => {
      loadData();
    });
    return () => unsub();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await syncWorkerDonationsFromBackend();
    loadData();
    setIsRefreshing(false);
  };

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleMarkVerified = async (don) => {
    await updateWorkerDonationStatus(don.id || don._id, 'Verified');
    loadData();
    if (viewingDonation && viewingDonation.id === don.id) {
      setViewingDonation(prev => ({ ...prev, status: 'Verified' }));
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingDonation) {
      await deleteWorkerDonation(deletingDonation.id || deletingDonation._id);
      loadData();
      setDeletingDonation(null);
      if (viewingDonation && viewingDonation.id === deletingDonation.id) {
        setViewingDonation(null);
      }
    }
  };

  const exportCSV = () => {
    let csv = 'Transaction ID,Donor Name,Phone,Amount (NPR),Payment Method,Status,Date\n';
    donations.forEach(d => {
      csv += `"${d.transactionId || d.id}","${d.donorName}","${d.donorPhone || ''}",${d.amount},"${d.paymentMethod}","${d.status}","${d.date}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Worker_Donations_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  const filtered = donations.filter(d => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      !term ||
      (d.donorName && d.donorName.toLowerCase().includes(term)) ||
      (d.donorPhone && d.donorPhone.includes(term)) ||
      (d.transactionId && d.transactionId.toLowerCase().includes(term));

    if (!matchesSearch) return false;
    if (methodFilter !== 'All' && d.paymentMethod?.toLowerCase() !== methodFilter.toLowerCase()) return false;
    if (statusFilter !== 'All' && d.status !== statusFilter) return false;
    return true;
  });

  const getMethodBadgeProps = (method) => {
    switch (method?.toLowerCase()) {
      case 'esewa':
        return { name: 'eSewa', bg: '#F0FDF4', color: '#166534', border: '#BBF7D0' };
      case 'khalti':
        return { name: 'Khalti', bg: '#FAF5FF', color: '#6B21A8', border: '#E9D5FF' };
      case 'fonepay':
        return { name: 'Fonepay QR', bg: '#FEF2F2', color: '#991B1B', border: '#FECACA' };
      case 'bank':
        return { name: 'Bank Transfer', bg: '#EFF6FF', color: '#1E40AF', border: '#BFDBFE' };
      default:
        return { name: method || 'Other', bg: '#F3F4F6', color: '#374151', border: '#E5E7EB' };
    }
  };

  return (
    <Container fluid style={{ padding: 0 }}>
      <PageHeader>
        <div className="title-group">
          <h2>
            <FiHeart /> Worker Welfare Fund Donations
          </h2>
          <p>
            Monetary contributions collected through the website footer to support food rescue workers and logistics.
          </p>
        </div>
        <div className="action-group">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            style={{ borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <FiRefreshCw className={isRefreshing ? 'fa-spin' : ''} />
            {isRefreshing ? 'Syncing...' : 'Sync Live'}
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={exportCSV}
            style={{ borderRadius: '10px', background: '#173F35', borderColor: '#173F35', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <FiDownload /> Export CSV
          </Button>
        </div>
      </PageHeader>

      {/* Metric Cards */}
      <Row className="g-3 mb-4">
        <Col xs={12} sm={6} lg={3}>
          <StatCard $bg="#FFF5F5" $color="#E53E3E">
            <div className="icon-wrapper">
              <FiHeart />
            </div>
            <div className="meta">
              <span className="label">Total Funds Raised</span>
              <span className="value">Rs. {stats.totalRaised.toLocaleString()}</span>
            </div>
          </StatCard>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <StatCard $bg="#EEF8F4" $color="#185C4A">
            <div className="icon-wrapper">
              <FiUsers />
            </div>
            <div className="meta">
              <span className="label">Total Donors</span>
              <span className="value">{stats.totalCount} Contributions</span>
            </div>
          </StatCard>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <StatCard $bg="#EFF6FF" $color="#1E40AF">
            <div className="icon-wrapper">
              <FiTrendingUp />
            </div>
            <div className="meta">
              <span className="label">Average Contribution</span>
              <span className="value">Rs. {stats.average.toLocaleString()}</span>
            </div>
          </StatCard>
        </Col>

        <Col xs={12} sm={6} lg={3}>
          <StatCard $bg="#F0FDF4" $color="#166534">
            <div className="icon-wrapper">
              <FiCheckCircle />
            </div>
            <div className="meta">
              <span className="label">Completed / Verified</span>
              <span className="value">{stats.verifiedCount} / {stats.totalCount}</span>
            </div>
          </StatCard>
        </Col>
      </Row>

      {/* Method Distribution Summary */}
      <MethodGridCard>
        <div className="grid-header">Gateway Distribution (NPR)</div>
        <div className="methods-row">
          <div className="method-item">
            <span className="m-title">eSewa Wallet</span>
            <span className="m-val">Rs. {(stats.methodBreakdown?.esewa || 0).toLocaleString()}</span>
          </div>
          <div className="method-item">
            <span className="m-title">Khalti Wallet</span>
            <span className="m-val">Rs. {(stats.methodBreakdown?.khalti || 0).toLocaleString()}</span>
          </div>
          <div className="method-item">
            <span className="m-title">Fonepay QR</span>
            <span className="m-val">Rs. {(stats.methodBreakdown?.fonepay || 0).toLocaleString()}</span>
          </div>
          <div className="method-item">
            <span className="m-title">Direct Bank Transfer</span>
            <span className="m-val">Rs. {(stats.methodBreakdown?.bank || 0).toLocaleString()}</span>
          </div>
        </div>
      </MethodGridCard>

      {/* Main Table */}
      <MainCard>
        <FilterRow>
          <div className="search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Search donor name, phone, or reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-controls">
            <Form.Select
              size="sm"
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              style={{ width: '150px', borderRadius: '10px' }}
            >
              <option value="All">All Gateways</option>
              <option value="esewa">eSewa</option>
              <option value="khalti">Khalti</option>
              <option value="fonepay">Fonepay QR</option>
              <option value="bank">Bank Transfer</option>
            </Form.Select>

            <Form.Select
              size="sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ width: '150px', borderRadius: '10px' }}
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
            </Form.Select>
          </div>
        </FilterRow>

        <div className="table-responsive">
          <Table hover align="middle" style={{ margin: 0 }}>
            <thead style={{ background: '#F8F9FA', fontSize: '0.8rem', color: '#66736D' }}>
              <tr>
                <th>TRANSACTION REF</th>
                <th>DONOR NAME</th>
                <th>AMOUNT</th>
                <th>PAYMENT METHOD</th>
                <th>DATE & TIME</th>
                <th>STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '0.88rem' }}>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-5 text-muted">
                    No worker donations found matching your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const badge = getMethodBadgeProps(item.paymentMethod);
                  return (
                    <tr key={item.id || item._id || item.transactionId}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#173F35' }}>
                            {item.transactionId || item.id}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(item.transactionId || item.id)}
                            style={{ background: 'none', border: 'none', color: '#9AA7A0', cursor: 'pointer', padding: 0 }}
                            title="Copy Ref"
                          >
                            {copiedId === (item.transactionId || item.id) ? (
                              <FiCheck style={{ color: '#166534' }} size={13} />
                            ) : (
                              <FiCopy size={13} />
                            )}
                          </button>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: 600, color: '#12201B' }}>{item.donorName}</span>
                          {item.donorPhone && (
                            <span style={{ fontSize: '0.78rem', color: '#66736D' }}>
                              {item.donorPhone}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span style={{ fontWeight: 700, color: '#185C4A', fontSize: '0.94rem' }}>
                          Rs. {Number(item.amount).toLocaleString()}
                        </span>
                      </td>
                      <td>
                        <MethodTag $bg={badge.bg} $color={badge.color} $border={badge.border}>
                          {badge.name}
                        </MethodTag>
                      </td>
                      <td style={{ color: '#66736D', fontSize: '0.84rem' }}>{item.date}</td>
                      <td>
                        <Badge
                          bg={
                            item.status === 'Verified'
                              ? 'success'
                              : item.status === 'Completed'
                              ? 'primary'
                              : 'warning'
                          }
                          style={{ fontWeight: 600, padding: '5px 10px', borderRadius: '8px' }}
                        >
                          {item.status}
                        </Badge>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <Dropdown align="end">
                          <Dropdown.Toggle as={ActionIconButton}>
                            <FiMoreVertical size={16} />
                          </Dropdown.Toggle>
                          <Dropdown.Menu style={{ borderRadius: '12px', padding: '6px' }}>
                            <Dropdown.Item onClick={() => setViewingDonation(item)}>
                              <FiEye className="me-2 text-primary" /> View Details
                            </Dropdown.Item>
                            {item.status !== 'Verified' && (
                              <Dropdown.Item onClick={() => handleMarkVerified(item)}>
                                <FiCheckCircle className="me-2 text-success" /> Mark Verified
                              </Dropdown.Item>
                            )}
                            <Dropdown.Divider />
                            <Dropdown.Item
                              onClick={() => setDeletingDonation(item)}
                              className="text-danger"
                            >
                              <FiTrash2 className="me-2" /> Delete Record
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </div>
      </MainCard>

      {/* Details Modal */}
      {viewingDonation && (
        <Modal show={true} onHide={() => setViewingDonation(null)} centered>
          <Modal.Header closeButton style={{ borderBottom: '1px solid #E6ECE8' }}>
            <Modal.Title style={{ fontSize: '1.15rem', fontWeight: 700, color: '#173F35' }}>
              Worker Donation Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: '20px 24px' }}>
            <div style={{ background: '#F8F5ED', padding: '16px', borderRadius: '14px', marginBottom: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: '#66756F', textTransform: 'uppercase', fontWeight: 600 }}>
                Donated Amount
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#174A3A' }}>
                Rs. {Number(viewingDonation.amount).toLocaleString()}
              </div>
              <Badge bg="success" style={{ marginTop: '4px' }}>
                Worker Welfare Fund
              </Badge>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F0F2F1', paddingBottom: '8px' }}>
                <span className="text-muted">Transaction ID:</span>
                <strong style={{ fontFamily: 'monospace' }}>{viewingDonation.transactionId || viewingDonation.id}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F0F2F1', paddingBottom: '8px' }}>
                <span className="text-muted">Donor Name:</span>
                <strong>{viewingDonation.donorName}</strong>
              </div>
              {viewingDonation.donorPhone && (
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F0F2F1', paddingBottom: '8px' }}>
                  <span className="text-muted">Phone Number:</span>
                  <strong>{viewingDonation.donorPhone}</strong>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F0F2F1', paddingBottom: '8px' }}>
                <span className="text-muted">Payment Gateway:</span>
                <strong style={{ textTransform: 'uppercase' }}>{viewingDonation.paymentMethod}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F0F2F1', paddingBottom: '8px' }}>
                <span className="text-muted">Date & Time:</span>
                <strong>{viewingDonation.date}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '4px' }}>
                <span className="text-muted">Status:</span>
                <strong>{viewingDonation.status}</strong>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ borderTop: '1px solid #E6ECE8' }}>
            {viewingDonation.status !== 'Verified' && (
              <Button variant="success" size="sm" onClick={() => handleMarkVerified(viewingDonation)}>
                <FiCheckCircle className="me-1" /> Mark Verified
              </Button>
            )}
            <Button variant="secondary" size="sm" onClick={() => setViewingDonation(null)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deletingDonation && (
        <Modal show={true} onHide={() => setDeletingDonation(null)} centered>
          <Modal.Header closeButton>
            <Modal.Title style={{ fontSize: '1.1rem', fontWeight: 700, color: '#991B1B' }}>
              Confirm Deletion
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the worker donation record for{' '}
            <strong>{deletingDonation.donorName}</strong> (Rs. {deletingDonation.amount})? This action cannot be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" size="sm" onClick={() => setDeletingDonation(null)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}
