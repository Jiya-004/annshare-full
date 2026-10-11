import styled from 'styled-components';

export const SidebarOverlay = styled.div`
  display: none;
  @media (max-width: 992px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(18, 32, 27, 0.5);
    backdrop-filter: blur(3px);
    z-index: 1040;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.25s ease, visibility 0.25s ease;

    ${props => props.$mobileOpen && `
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    `}
  }
`;

export const SidebarContainer = styled.aside`
  width: ${props => (props.$desktopCollapsed ? '80px' : '260px')};
  height: calc(100vh - 64px);
  background: #ffffff;
  border-right: 1px solid #E6ECE8;
  color: #12201B;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: fixed;
  top: 64px;
  left: 0;
  bottom: 0;
  z-index: 999;

  @media (max-width: 992px) {
    top: 0;
    bottom: 0;
    left: 0;
    height: 100vh;
    width: 280px;
    max-width: 85vw;
    z-index: 1050;
    transform: translateX(-100%);
    visibility: hidden;
    pointer-events: none;
    box-shadow: none;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s ease, box-shadow 0.3s ease;

    ${props => props.$mobileOpen && `
      transform: translateX(0);
      visibility: visible;
      pointer-events: auto;
      box-shadow: 4px 0 28px rgba(18, 32, 27, 0.22);
    `}
  }
`;

export const MobileSidebarHeader = styled.div`
  display: none;
  @media (max-width: 992px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 18px;
    border-bottom: 1px solid #E6ECE8;
    background: #ffffff;

    .mobile-brand {
      display: flex;
      align-items: center;
      gap: 10px;

      img {
        height: 28px;
        width: auto;
        object-fit: contain;
      }

      span {
        font-weight: 700;
        font-size: 0.95rem;
        color: #185C4A;
      }
    }

    .close-btn {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: #F7F8F6;
      border: 1px solid #E6ECE8;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #66736D;
      cursor: pointer;
      transition: all 0.15s ease;

      &:hover {
        background: #EEF8F4;
        color: #185C4A;
      }
    }
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  .logo-img {
    height: 34px;
    width: auto;
    object-fit: contain;
  }
`;

export const CollapseBtn = styled.button`
  background: transparent;
  border: none;
  color: #5f6368;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;

  &:hover {
    background: #F1F3F4;
    color: #202124;
  }
`;

export const NavBody = styled.div`
  padding: 16px 12px;
  flex-grow: 1;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
    width: 0;
    height: 0;
  }
`;

export const SectionHeader = styled.div`
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.8px;
  color: #66736D;
  margin: 16px 12px 8px 12px;
  text-transform: uppercase;
  display: ${props => (props.$desktopCollapsed ? 'none' : 'block')};

  @media (max-width: 992px) {
    display: block !important;
  }
`;

export const NavItem = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-radius: ${props => (props.$active ? '20px' : '10px')};
  color: ${props => (props.$active ? '#ffffff' : '#66736D')};
  background: ${props => (props.$active ? '#185C4A' : 'transparent')};
  font-size: 0.88rem;
  font-weight: ${props => (props.$active ? '600' : '500')};
  text-decoration: none;
  transition: all 0.15s ease;
  margin-bottom: 4px;
  cursor: pointer;
  justify-content: ${props => (props.$desktopCollapsed ? 'center' : 'flex-start')};
  box-shadow: ${props => (props.$active ? '0 4px 10px rgba(24, 92, 74, 0.2)' : 'none')};

  &:hover {
    color: ${props => (props.$active ? '#ffffff' : '#185C4A')};
    background: ${props => (props.$active ? '#185C4A' : '#F7F8F6')};
  }

  .nav-icon {
    font-size: 1.15rem;
    flex-shrink: 0;
    color: ${props => (props.$active ? '#ffffff' : '#66736D')};
  }

  .nav-text {
    display: ${props => (props.$desktopCollapsed ? 'none' : 'inline')};
    white-space: nowrap;
  }

  @media (max-width: 992px) {
    justify-content: flex-start !important;
    .nav-text {
      display: inline !important;
    }
  }
`;

export const SidebarFooter = styled.div`
  padding: 16px;
  border-top: 1px solid #E6ECE8;
  display: ${props => (props.$desktopCollapsed ? 'none' : 'block')};

  @media (max-width: 992px) {
    display: block !important;
  }
`;

export const SidebarPromoCard = styled.div`
  background: linear-gradient(135deg, #EEF8F4 0%, #DFF1E9 100%);
  border: 1px solid #DFF1E9;
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 16px;

  h6 {
    font-size: 0.86rem;
    font-weight: 600;
    color: #185C4A;
    margin: 0 0 6px 0;
  }

  p {
    font-size: 0.76rem;
    color: #374151;
    margin: 0 0 12px 0;
    line-height: 1.3;
  }

  button {
    background: #185C4A;
    border: none;
    color: #ffffff;
    font-size: 0.76rem;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 16px;
    width: 100%;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
      background: #12201B;
    }
  }
`;

export const FooterLink = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.82rem;
  color: #66736D;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #F7F8F6;
    color: #12201B;
  }
`;
