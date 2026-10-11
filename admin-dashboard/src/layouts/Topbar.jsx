import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Dropdown } from 'react-bootstrap';
import {
  FiSearch,
  FiBell,
  FiHelpCircle,
  FiUser,
  FiLogOut,
  FiChevronDown,
  FiMenu
} from 'react-icons/fi';
import {
  getUsers,
  getDonations,
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  getAdminProfile,
  logoutAdmin
} from '../services/adminService';

const TopbarContainer = styled.header`
  height: 64px;
  background: #ffffff;
  border-bottom: 1px solid #E6ECE8;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  z-index: 1000;

  @media (max-width: 768px) {
    padding: 0 12px;
  }

  .dropdown-toggle::after {
    display: none !important;
  }
`;

const FarLeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;

  @media (max-width: 576px) {
    gap: 8px;
  }
`;

const CollapseBtn = styled.button`
  background: #F7F8F6;
  border: 1px solid #E6ECE8;
  color: #185C4A;
  width: 38px;
  height: 38px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;

  @media (max-width: 576px) {
    width: 34px;
    height: 34px;
  }

  &:hover {
    background: #EEF8F4;
    border-color: #185C4A;
    color: #185C4A;
  }
`;

const BrandLogo = styled.img`
  height: 32px;
  width: auto;
  object-fit: contain;
  cursor: pointer;

  @media (max-width: 576px) {
    height: 25px;
  }
`;

// Google Merchant Center Style Wide Center Search Bar
const CenterSearchSection = styled.div`
  flex: 1;
  max-width: 640px;
  margin: 0 20px;
  position: relative;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;

  .search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #5f6368;
    font-size: 1rem;
  }
`;

const StyledSearchInput = styled(Form.Control)`
  border-radius: 8px;
  padding-left: 42px;
  padding-right: 16px;
  height: 40px;
  background: #F1F3F4;
  border: 1px solid transparent;
  font-size: 0.88rem;
  color: #202124;
  transition: all 0.15s ease;

  &:focus {
    background: #ffffff;
    border-color: #185C4A;
    box-shadow: 0 1px 6px rgba(32, 33, 36, 0.18);
  }

  &::placeholder {
    color: #5f6368;
  }
`;

const FarRightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 576px) {
    gap: 6px;
  }
`;

const HeaderIconButton = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #F7F8F6;
  border: 1px solid #E6ECE8;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5f6368;
  cursor: pointer;
  position: relative;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover {
    background: #EEF8F4;
    color: #185C4A;
    border-color: #185C4A;
  }

  .badge-dot {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #185C4A;
    border: 2px solid #ffffff;
  }

  &.help-btn {
    @media (max-width: 992px) {
      display: none !important;
    }
  }

  @media (max-width: 576px) {
    width: 34px;
    height: 34px;
  }
`;

const HeaderDivider = styled.div`
  width: 1px;
  height: 24px;
  background: #E6ECE8;
  margin: 0 4px;

  @media (max-width: 992px) {
    display: none !important;
  }
`;

// Google Merchant Style Account / Store Selector Pill
const AccountSelectorPill = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #F1F3F4;
  }

  .account-info {
    display: flex;
    flex-direction: column;
    text-align: right;

    .store-name {
      font-size: 0.82rem;
      font-weight: 600;
      color: #202124;
      line-height: 1.1;
    }

    .store-id {
      font-size: 0.68rem;
      color: #5f6368;
    }
  }

  @media (max-width: 992px) {
    display: none;
  }
`;

const UserProfilePill = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 12px 4px 4px;
  border-radius: 24px;
  background: #F7F8F6;
  border: 1px solid #E6ECE8;
  cursor: pointer;
  transition: all 0.15s ease;
  margin-left: 2px;
  flex-shrink: 0;

  &::after {
    display: none !important;
  }

  &:hover {
    background: #ffffff;
    border-color: #185C4A;
  }

  .user-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #185C4A;
    color: #ffffff;
    font-weight: 700;
    font-size: 0.78rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .user-info {
    display: flex;
    flex-direction: column;

    .name {
      font-size: 0.82rem;
      font-weight: 600;
      color: #12201B;
      line-height: 1.1;
      white-space: nowrap;
    }

    .role {
      font-size: 0.68rem;
      color: #66736D;
      white-space: nowrap;
    }
  }

  .chevron-icon {
    flex-shrink: 0;
    color: #66736D;
  }

  @media (max-width: 992px) {
    padding: 0;
    background: transparent;
    border: none;
    margin-left: 0;

    .user-info, .chevron-icon {
      display: none !important;
    }

    .user-avatar {
      width: 34px;
      height: 34px;
      font-size: 0.8rem;
      border: 1.5px solid #185C4A;
      box-shadow: 0 1px 4px rgba(24, 92, 74, 0.2);
    }
  }
`;

const SearchDropdown = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1px solid #E6ECE8;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  max-height: 320px;
  overflow-y: auto;
  z-index: 1000;
  padding: 8px;
`;

const Topbar = ({ toggleSidebar, searchTerm, setSearchTerm, setActiveNav }) => {
  const [notifications, setNotifications] = useState(getNotifications());
  const [showSearchDrop, setShowSearchDrop] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const usersList = getUsers();
  const donationsList = getDonations();

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setShowSearchDrop(val.trim().length > 0);
  };

  const filterUsers = usersList.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filterDonations = donationsList.filter(d => d.foodName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <TopbarContainer>
      {/* 1. Far Left Group: Hamburger + ANNShare Logo */}
      <FarLeftGroup>
        <CollapseBtn title="Toggle Sidebar" onClick={toggleSidebar}>
          <FiMenu size={20} />
        </CollapseBtn>

        <BrandLogo src="/logo/logo.png" alt="ANNShare Logo" onClick={() => setActiveNav && setActiveNav('Dashboard')} />
      </FarLeftGroup>

      {/* 2. Center Section: Google-Style Wide Search Bar */}
      <CenterSearchSection>
        <SearchWrapper>
          <FiSearch className="search-icon" />
          <StyledSearchInput
            type="text"
            placeholder="Search ANNShare Operations..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => searchTerm.trim() && setShowSearchDrop(true)}
            onBlur={() => setTimeout(() => setShowSearchDrop(false), 200)}
          />

          {showSearchDrop && (
            <SearchDropdown>
              {filterUsers.length > 0 && (
                <div className="p-2 border-bottom">
                  <small className="text-muted fw-bold text-uppercase" style={{ fontSize: '0.65rem' }}>Users</small>
                  {filterUsers.slice(0, 2).map(u => (
                    <div key={u.id} className="py-1 px-2 hover-bg rounded" style={{ fontSize: '0.8rem', cursor: 'pointer' }} onClick={() => setActiveNav('Users')}>
                      <strong>{u.name}</strong> <span className="text-secondary">({u.role})</span>
                    </div>
                  ))}
                </div>
              )}

              {filterDonations.length > 0 && (
                <div className="p-2 border-bottom">
                  <small className="text-muted fw-bold text-uppercase" style={{ fontSize: '0.65rem' }}>Donations</small>
                  {filterDonations.slice(0, 2).map(d => (
                    <div key={d.id} className="py-1 px-2 hover-bg rounded" style={{ fontSize: '0.8rem', cursor: 'pointer' }} onClick={() => setActiveNav('Donations')}>
                      <strong>{d.foodName}</strong> <span className="text-secondary">({d.donor})</span>
                    </div>
                  ))}
                </div>
              )}

              {filterUsers.length === 0 && filterDonations.length === 0 && (
                <div className="p-3 text-center text-muted" style={{ fontSize: '0.8rem' }}>
                  No results found for "{searchTerm}"
                </div>
              )}
            </SearchDropdown>
          )}
        </SearchWrapper>
      </CenterSearchSection>

      {/* 3. Far Right Group: Google Merchant Layout + Admin User Profile Pill */}
      <FarRightGroup>
        {/* Help Icon Button */}
        <HeaderIconButton className="help-btn" onClick={() => setActiveNav('Settings')} title="Support & Settings">
          <FiHelpCircle size={20} />
        </HeaderIconButton>

        <HeaderDivider />

        {/* Store / Account Selector Pill */}
        <Dropdown align="end">
          <Dropdown.Toggle as="div">
            <AccountSelectorPill>
              <div className="account-info">
                <span className="store-name">ANNShare Food Rescue</span>
                <span className="store-id">ID: 5847769439</span>
              </div>
              <FiChevronDown size={14} color="#5f6368" />
            </AccountSelectorPill>
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ padding: '8px', borderRadius: '10px', border: '1px solid #E6ECE8' }}>
            <Dropdown.Item onClick={() => setActiveNav('Dashboard')} style={{ fontSize: '0.82rem' }}>
              <strong>ANNShare Food Rescue</strong> (Main)
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setActiveNav('Settings')} style={{ fontSize: '0.82rem' }}>
              ANNShare Community Hub
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <HeaderDivider />

        {/* Notifications Icon Button */}
        <Dropdown align="end">
          <Dropdown.Toggle as={HeaderIconButton} id="notif-toggle">
            <FiBell size={19} />
            {unreadCount > 0 && <span className="badge-dot" />}
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ width: 'min(320px, calc(100vw - 28px))', maxWidth: '320px', padding: '12px', borderRadius: '12px', border: '1px solid #E6ECE8' }}>
            <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
              <strong style={{ fontSize: '0.86rem', color: '#12201B' }}>Notifications</strong>
              <button
                className="btn btn-link p-0 text-decoration-none"
                style={{ fontSize: '0.74rem', color: '#185C4A', fontWeight: 600 }}
                onClick={() => { markAllNotificationsRead(); setNotifications(getNotifications()); }}
              >
                Mark all read
              </button>
            </div>

            {notifications.map(n => (
              <div
                key={n.id}
                className="p-2 mb-1 rounded d-flex justify-content-between align-items-start"
                style={{ background: n.read ? '#ffffff' : '#F7F8F6', fontSize: '0.78rem', cursor: 'pointer' }}
                onClick={() => { markNotificationRead(n.id); setNotifications(getNotifications()); }}
              >
                <div>
                  <div style={{ fontWeight: n.read ? 500 : 700, color: '#12201B' }}>{n.title}</div>
                  <div style={{ fontSize: '0.72rem', color: '#66736D' }}>{n.time}</div>
                </div>
                {!n.read && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#185C4A', marginTop: '4px' }} />}
              </div>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {/* Full Admin User Profile Pill (Responsive) */}
        {(() => {
          const adminUser = getAdminProfile();
          return (
            <Dropdown align="end">
              <Dropdown.Toggle as="div">
                <UserProfilePill>
                  <div className="user-avatar">{adminUser.avatarText || 'AJ'}</div>
                  <div className="user-info">
                    <span className="name">{adminUser.name || 'Admin User'}</span>
                    <span className="role">{adminUser.badge || 'System Admin'}</span>
                  </div>
                  <FiChevronDown size={14} className="chevron-icon" />
                </UserProfilePill>
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ padding: '8px', borderRadius: '12px', border: '1px solid #E6ECE8', minWidth: '190px' }}>
                <div className="d-lg-none px-3 py-2 border-bottom mb-2 bg-light rounded">
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#12201B' }}>{adminUser.name || 'Admin User'}</div>
                  <div style={{ fontSize: '0.72rem', color: '#185C4A', fontWeight: 600 }}>{adminUser.badge || 'System Admin'}</div>
                </div>
                <Dropdown.Item onClick={() => setActiveNav('Settings')} style={{ fontSize: '0.82rem' }}>
                  <FiUser className="me-2" /> Admin Profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => logoutAdmin()} style={{ fontSize: '0.82rem', color: '#991B1B' }}>
                  <FiLogOut className="me-2" /> Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          );
        })()}
      </FarRightGroup>
    </TopbarContainer>
  );
};

export default Topbar;
