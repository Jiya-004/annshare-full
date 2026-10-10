import styled from 'styled-components';

export const SidebarOverlay = styled.div`
  display: none;
  @media (max-width: 992px) {
    display: ${props => (props.$collapsed ? 'none' : 'block')};
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(18, 32, 27, 0.45);
    backdrop-filter: blur(3px);
    z-index: 998;
    transition: opacity 0.25s ease;
  }
`;

export const SidebarContainer = styled.aside`
  width: ${props => (props.$collapsed ? '80px' : '260px')};
  height: calc(100vh - 64px);
  background: #ffffff;
  border-right: 1px solid #E6ECE8;
  color: #12201B;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: fixed;
  top: 64px;
  left: 0;
  bottom: 0;
  z-index: 999;

  @media (max-width: 992px) {
    width: 260px;
    transform: ${props => (props.$collapsed ? 'translateX(-100%)' : 'translateX(0)')};
    box-shadow: ${props => (props.$collapsed ? 'none' : '4px 0 20px rgba(0, 0, 0, 0.12)')};
  }
`;

export const SidebarHeader = styled.div`
  display: none;
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
  display: ${props => (props.$collapsed ? 'none' : 'block')};
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
  justify-content: ${props => (props.$collapsed ? 'center' : 'flex-start')};
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
    display: ${props => (props.$collapsed ? 'none' : 'inline')};
    white-space: nowrap;
  }
`;

export const SidebarFooter = styled.div`
  padding: 16px;
  border-top: 1px solid #E6ECE8;
  display: ${props => (props.$collapsed ? 'none' : 'block')};
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
