import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Dropdown, Button, Toast, ToastContainer, Badge } from 'react-bootstrap';
import {
  FiUsers,
  FiHeart,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiAlertTriangle,
  FiCalendar,
  FiDownload,
  FiArrowRight,
  FiTruck,
  FiActivity
} from 'react-icons/fi';

import StatCard from '../../components/StatCard';
import StatusBadge from '../../components/StatusBadge';
import CategoryIcon from '../../components/CategoryIcon';
import {
  getDashboardStats,
  getUsers,
  getDonations,
  getRequests,
  getCategories,
  verifyNGO,
  updateRequestStatus,
  exportReportCSV,
  subscribeToAdminService
} from '../../services/adminService';

import {
  PageHeader,
  WelcomeText,
  HeaderActions,
  DatePill,
  ExportBtn,
  HeroCard,
  OperationalCard,
  OperationalItem,
  AuditUrgentItem,
  RequestUrgentItem,
  ExpiringUrgentItem,
  ScheduleWidgetCard,
  CalendarDayPicker,
  ScheduleTimelineItem,
  TransactionTableCard,
  WidgetHeader
} from './styles';

// Tonal Palette for Category Donut Segments & Legend Dots per Requirement 11
const categoryTonalColors = {
  'Prepared Meals': '#173F35',
  'Bakery & Bread': '#B9684D',
  'Fruits & Veggies': '#28624D',
  'Packaged Food': '#789B82',
  'Rice & Grains': '#A5AD72',
  'Dairy & Pantry': '#9BBCA4',
  'Other Items': '#E7DDC9',
  'Cooked Food': '#173F35',
  'Vegetables': '#28624D',
  'Bakery': '#B9684D',
  'Fruits': '#A5AD72',
  'Dairy': '#9BBCA4',
  'Other': '#E7DDC9'
};

const AdminDashboard = ({ setActiveNav }) => {
  const [stats, setStats] = useState(getDashboardStats());
  const [users, setUsers] = useState(getUsers());
  const [donations, setDonations] = useState(getDonations());
  const [requests, setRequests] = useState(getRequests());
  const [categories, setCategories] = useState(getCategories());
  const [timeframe, setTimeframe] = useState('Last 6 months');
  const [activeTab, setActiveTab] = useState('All');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const unsub = subscribeToAdminService(() => {
      setStats(getDashboardStats());
      setUsers(getUsers());
      setDonations(getDonations());
      setRequests(getRequests());
      setCategories(getCategories());
    });
    return unsub;
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  const handleVerify = (ngo) => {
    verifyNGO(ngo.id);
    triggerToast(`NGO ${ngo.name} verified in mock state.`);
  };

  const handleReview = (req) => {
    updateRequestStatus(req.id, 'Confirmed');
    triggerToast(`Request ${req.id} confirmed in mock state.`);
  };

  const handleExport = () => {
    exportReportCSV();
    triggerToast('Generated client-side CSV report from mock data.');
  };

  const pendingNGOs = users.filter(u => u.verificationStatus === 'pending' || u.verificationStatus === 'Pending Verification');
  const pendingRequestsList = requests.filter(r => r.status === 'Pending' || r.status === 'pending');
  const expiringDonations = donations.filter(d => d.status === 'Available' || d.status === 'available');

  // Today's Food Rescue Operations live items
  const todaysRescueItems = [
    { id: 1, foodName: '50 Hot Prepared Meals', donor: 'Green Kitchen Restaurant', status: 'Available', meta: 'Pickup by 4:00 PM' },
    { id: 2, foodName: 'Fresh Bakery Surplus', donor: 'Central Bistro & Bakery', status: 'Requested', meta: 'Request pending' },
    { id: 3, foodName: 'Fresh Vegetables & Fruits', donor: 'Fresh Harvest Market', status: 'Picked Up', meta: 'Pickup scheduled' }
  ];

  const totalCategoryItems = categories.reduce((acc, c) => acc + c.itemCount, 0);

  const filteredDonations = activeTab === 'All' 
    ? donations 
    : donations.filter(d => d.status.toLowerCase() === activeTab.toLowerCase());

  return (
    <Container fluid className="p-0">
      {/* 1. Dashboard Header */}
      <PageHeader>
        <WelcomeText>
          <h2>Welcome back, Admin</h2>
          <p>Here's what's happening across ANNShare today.</p>
        </WelcomeText>

        <HeaderActions>
          <DatePill>
            <FiCalendar size={13} className="text-secondary" />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </DatePill>

          <ExportBtn onClick={handleExport}>
            <FiDownload size={14} />
            <span>Export Report</span>
          </ExportBtn>
        </HeaderActions>
      </PageHeader>

      {/* 2. Asymmetric Hero Metric Composition */}
      <Row className="g-3 mb-3">
        {/* Hero Card 1: Food Rescued */}
        <Col xl={4} lg={6}>
          <HeroCard>
            <div className="hero-icon">
              <FiCheckCircle />
            </div>
            <div className="hero-label">Total Surplus Food Rescued</div>
            <div className="hero-value">{stats.foodSharedKg}</div>
            <div>
              <span className="hero-pill">
                <FiTrendingUp size={12} /> Saved from landfill
              </span>
            </div>
          </HeroCard>
        </Col>

        {/* Stacked Metric Cards */}
        <Col xl={3} lg={6}>
          <div className="d-flex flex-column gap-3 h-100">
            <div style={{ flex: 1 }}>
              <StatCard title="EST. MEALS PROVIDED" value={stats.estimatedMeals} trend="+14.2%" icon={FiHeart} isPositive={true} isImpact={true} />
            </div>
            <div style={{ flex: 1 }}>
              <StatCard title="ACTIVE DONATIONS" value={stats.activeDonations} trend="Available now" icon={FiClock} isPositive={true} />
            </div>
          </div>
        </Col>

        {/* Donations Trend Mini-Chart */}
        <Col xl={3} lg={6}>
          <Card style={{ border: '1px solid #E6ECE8', borderRadius: '14px', padding: '16px 18px', background: '#ffffff', height: '100%' }}>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#66736D', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Donations Trend</span>
              <Dropdown>
                <Dropdown.Toggle size="sm" variant="light" style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '12px', border: '1px solid #E6ECE8' }}>
                  {timeframe}
                </Dropdown.Toggle>
                <Dropdown.Menu align="end" style={{ fontSize: '0.78rem' }}>
                  <Dropdown.Item onClick={() => setTimeframe('Last 7 days')}>Last 7 days</Dropdown.Item>
                  <Dropdown.Item onClick={() => setTimeframe('Last 30 days')}>Last 30 days</Dropdown.Item>
                  <Dropdown.Item onClick={() => setTimeframe('Last 6 months')}>Last 6 months</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="d-flex align-items-baseline gap-2 mb-2">
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#12201B', margin: 0 }}>2,850</h3>
              <Badge style={{ background: '#EEF8F4', color: '#185C4A', fontSize: '0.7rem', fontWeight: 600 }}>+18.2%</Badge>
            </div>

            {/* SVG Trend Line Chart */}
            <div style={{ height: '65px', width: '100%', marginTop: '8px' }}>
              <svg width="100%" height="100%" viewBox="0 0 200 60" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#185C4A" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#185C4A" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M 0 50 Q 40 30, 80 40 T 160 15 T 200 10 L 200 60 L 0 60 Z" fill="url(#chartGrad)" />
                <path d="M 0 50 Q 40 30, 80 40 T 160 15 T 200 10" fill="none" stroke="#185C4A" strokeWidth="2.5" />
              </svg>
            </div>
          </Card>
        </Col>

        {/* Partner Network Summary Card */}
        <Col xl={2} lg={6}>
          <div className="d-flex flex-column gap-3 h-100">
            <div style={{ flex: 1 }}>
              <StatCard title="TOTAL DONORS" value={stats.totalDonors} trend="+4" icon={FiUsers} isPositive={true} />
            </div>
            <div style={{ flex: 1 }}>
              <StatCard title="RECEIVERS / NGOS" value={stats.totalReceivers} trend="+2" icon={FiHeart} isPositive={true} />
            </div>
          </div>
        </Col>
      </Row>

      {/* 3. Middle Operational & Schedule Row */}
      <Row className="g-3 mb-3">
        {/* Left Column (7-col): Urgent Items & Today's Food Rescue */}
        <Col lg={7}>
          <div className="d-flex flex-column gap-3 h-100">
            {/* Urgent Items */}
            <OperationalCard>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 style={{ margin: 0, fontWeight: 700, color: '#12201B' }} className="d-flex align-items-center gap-2">
                  <FiAlertTriangle style={{ color: '#185C4A' }} />
                  Urgent Items Requiring Attention
                </h5>
                <span style={{ fontSize: '0.72rem', background: '#EEF8F4', color: '#185C4A', border: '1px solid #DFF1E9', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>
                  {pendingNGOs.length + pendingRequestsList.length} Pending Actions
                </span>
              </div>

              <div className="d-flex flex-column gap-1">
                {/* Expiring Food Surplus */}
                {expiringDonations.map(don => (
                  <ExpiringUrgentItem key={don.id}>
                    <div className="d-flex align-items-center gap-2">
                      <FiAlertTriangle size={15} style={{ color: '#185C4A', flexShrink: 0 }} />
                      <div>
                        <div className="title">Expiring Food Surplus</div>
                        <div className="desc">{don.foodName} expires {don.expiryTime}.</div>
                      </div>
                    </div>
                    <Button size="sm" style={{ fontSize: '0.74rem', fontWeight: 600, background: '#185C4A', borderColor: '#185C4A', color: '#ffffff', borderRadius: '8px' }} onClick={() => setActiveNav && setActiveNav('Donations')}>
                      View Listing
                    </Button>
                  </ExpiringUrgentItem>
                ))}

                {/* Pending NGO Audit */}
                {pendingNGOs.map(ngo => (
                  <AuditUrgentItem key={ngo.id}>
                    <div>
                      <div className="title">Pending NGO Audit</div>
                      <div className="desc">{ngo.name} uploaded audit verification documents.</div>
                    </div>
                    <Button size="sm" style={{ fontSize: '0.74rem', fontWeight: 600, background: '#28624D', borderColor: '#28624D', color: '#ffffff', borderRadius: '8px' }} onClick={() => handleVerify(ngo)}>
                      Verify Now
                    </Button>
                  </AuditUrgentItem>
                ))}

                {/* Pending Food Request */}
                {pendingRequestsList.map(req => (
                  <RequestUrgentItem key={req.id}>
                    <div>
                      <div className="title">Pending Food Request</div>
                      <div className="desc">{req.receiverName} requested {req.foodName}.</div>
                    </div>
                    <Button size="sm" style={{ fontSize: '0.74rem', fontWeight: 600, background: '#789B82', borderColor: '#789B82', color: '#ffffff', borderRadius: '8px' }} onClick={() => handleReview(req)}>
                      Review Request
                    </Button>
                  </RequestUrgentItem>
                ))}
              </div>
            </OperationalCard>

            {/* Today's Food Rescue Operations */}
            <OperationalCard>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 style={{ margin: 0, fontWeight: 700, color: '#12201B' }} className="d-flex align-items-center gap-2">
                  <FiTruck style={{ color: '#173F35' }} />
                  Today's Food Rescue Operations
                </h5>
                <Button variant="link" style={{ fontSize: '0.78rem', color: '#173F35', textDecoration: 'none', fontWeight: 600, padding: 0 }} onClick={() => setActiveNav && setActiveNav('Donations')}>
                  View All <FiArrowRight />
                </Button>
              </div>

              {todaysRescueItems.map(item => (
                <OperationalItem key={item.id}>
                  <div>
                    <div className="title">{item.foodName}</div>
                    <div className="meta">{item.donor} • <span style={{ color: '#66736D' }}>{item.meta}</span></div>
                  </div>
                  <StatusBadge status={item.status} />
                </OperationalItem>
              ))}
            </OperationalCard>
          </div>
        </Col>

        {/* Right Column (5-col): Food Categories Distribution & Rescue Schedule */}
        <Col lg={5}>
          <div className="d-flex flex-column gap-3 h-100">
            {/* Food Categories Distribution Donut Chart */}
            <Card style={{ border: '1px solid #E6ECE8', borderRadius: '14px', padding: '18px 20px', background: '#ffffff' }}>
              <h5 style={{ margin: 0, fontWeight: 700, color: '#12201B', marginBottom: '12px', fontSize: '0.98rem' }}>Food Categories Distribution</h5>

              <div className="d-flex align-items-center justify-content-center my-2">
                <div style={{ position: 'relative', width: '105px', height: '105px', borderRadius: '50%', background: 'conic-gradient(#173F35 0% 24%, #28624D 24% 43%, #B9684D 43% 59%, #A5AD72 59% 73%, #789B82 73% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#12201B', lineHeight: 1 }}>{totalCategoryItems}</span>
                    <span style={{ fontSize: '0.62rem', color: '#66736D', fontWeight: 600, marginTop: '2px' }}>Total Items</span>
                  </div>
                </div>
              </div>

              {/* Legend List */}
              <div className="d-flex flex-column gap-1" style={{ fontSize: '0.74rem' }}>
                {categories.slice(0, 5).map((cat) => {
                  const pct = Math.round((cat.itemCount / totalCategoryItems) * 100);
                  const dotColor = categoryTonalColors[cat.name] || '#185C4A';
                  return (
                    <div key={cat.id} className="d-flex align-items-center justify-content-between py-1 border-bottom-subtle">
                      <div className="d-flex align-items-center gap-2 overflow-hidden me-2">
                        <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: dotColor, display: 'inline-block', flexShrink: 0 }} />
                        <CategoryIcon icon={cat.icon} size={12} />
                        <span style={{ fontWeight: 600, color: '#12201B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cat.name}</span>
                      </div>
                      <span style={{ color: '#66736D', flexShrink: 0 }}>
                        <strong>{cat.itemCount} items</strong> ({pct}%)
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Food Rescue Schedule Timeline Widget */}
            <ScheduleWidgetCard>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 style={{ margin: 0, fontWeight: 700, color: '#12201B', fontSize: '0.98rem' }}>Rescue Schedules</h5>
                <span style={{ fontSize: '0.74rem', color: '#66736D', fontWeight: 600 }}>August 2026</span>
              </div>

              {/* Day Picker Row */}
              <CalendarDayPicker>
                <div className="day-col"><span className="num">17</span><span>S</span></div>
                <div className="day-col"><span className="num">18</span><span>M</span></div>
                <div className="day-col"><span className="num">19</span><span>T</span></div>
                <div className="day-col active"><span className="num">20</span><span>W</span></div>
                <div className="day-col"><span className="num">21</span><span>T</span></div>
                <div className="day-col"><span className="num">22</span><span>F</span></div>
                <div className="day-col"><span className="num">23</span><span>S</span></div>
              </CalendarDayPicker>

              {/* Timeline Items */}
              <ScheduleTimelineItem>
                <div className="time">09:30 AM</div>
                <div className="title">Morning Bakery Pickup</div>
                <div className="sub">Central Bistro & Bakery • 25 bags surplus</div>
              </ScheduleTimelineItem>

              <ScheduleTimelineItem>
                <div className="time">01:15 PM</div>
                <div className="title">Pantry NGO Audit Visit</div>
                <div className="sub">Mercy Community Pantry • Hygiene Verification</div>
              </ScheduleTimelineItem>

              <ScheduleTimelineItem>
                <div className="time">04:00 PM</div>
                <div className="title">Hot Prepared Meals Pickup</div>
                <div className="sub">Green Kitchen Restaurant • 50 meal boxes</div>
              </ScheduleTimelineItem>
            </ScheduleWidgetCard>
          </div>
        </Col>
      </Row>

      {/* 4. Section 4: Tabbed Recent Activity Table */}
      <Row className="g-3">
        <Col lg={12}>
          <TransactionTableCard>
            <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
              <WidgetHeader style={{ margin: 0 }}>
                <h5 className="d-flex align-items-center gap-2">
                  <FiActivity style={{ color: '#185C4A' }} />
                  Recent Platform Activity
                </h5>
              </WidgetHeader>

              {/* Filter Tabs */}
              <div
                className="d-flex align-items-center gap-1 bg-light p-1 rounded-pill"
                style={{
                  border: '1px solid #E6ECE8',
                  fontSize: '0.78rem',
                  overflowX: 'auto',
                  maxWidth: '100%',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {['All', 'Available', 'Requested', 'Picked Up', 'Completed'].map(tab => (
                  <Button
                    key={tab}
                    size="sm"
                    variant={activeTab === tab ? 'success' : 'light'}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      borderRadius: '16px',
                      padding: '3px 12px',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      background: activeTab === tab ? '#185C4A' : 'transparent',
                      borderColor: 'transparent',
                      color: activeTab === tab ? '#ffffff' : '#66736D',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {tab}
                  </Button>
                ))}
              </div>
            </div>

            <div className="table-responsive">
              <table className="table hover align-middle mb-0" style={{ fontSize: '0.84rem' }}>
                <thead>
                  <tr style={{ fontSize: '0.72rem', color: '#66736D', textTransform: 'uppercase' }}>
                    <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Item & Partner</th>
                    <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Category</th>
                    <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Date Posted</th>
                    <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDonations.map(don => (
                    <tr key={don.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#EEF8F4', color: '#185C4A', fontWeight: 700, fontSize: '0.75rem', display: 'flex', flexShrink: 0, alignItems: 'center', justifyContent: 'center' }}>
                            {don.donor.charAt(0)}
                          </div>
                          <div>
                            <strong style={{ color: '#12201B' }}>{don.foodName}</strong>
                            <div style={{ fontSize: '0.75rem', color: '#66736D' }}>{don.donor}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '2px 8px', borderRadius: '12px', background: '#F7F8F6', color: '#12201B' }}>
                          {don.category}
                        </span>
                      </td>
                      <td style={{ color: '#66736D', fontSize: '0.8rem' }}>{don.postedDate}</td>
                      <td>
                        <StatusBadge status={don.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TransactionTableCard>
        </Col>
      </Row>

      {/* Toast Feedback */}
      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="light">
          <Toast.Header>
            <FiCheckCircle className="me-2 text-success" />
            <strong className="me-auto" style={{ color: '#12201B' }}>ANNShare System</strong>
          </Toast.Header>
          <Toast.Body style={{ fontSize: '0.84rem', color: '#374151' }}>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default AdminDashboard;
