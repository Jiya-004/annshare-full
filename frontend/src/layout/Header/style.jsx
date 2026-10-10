import styled from "styled-components";

/* ==========================================================================
   ANNShare Airbnb-Inspired Header Styled Components
   Palette:
   Deep Forest Green: #174A3A
   Emerald:           #2E7D5B
   Warm Cream:        #F8F5ED
   Accent Coral/Rose: #E11D48
   ========================================================================== */

export const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ $isScrolled }) => ($isScrolled ? "70px" : "82px")};
  z-index: 1000;
  background-color: ${({ $isScrolled }) =>
    $isScrolled ? "rgba(255, 255, 255, 0.94)" : "rgba(255, 253, 247, 0.92)"};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid
    ${({ $isScrolled }) =>
      $isScrolled ? "rgba(23, 74, 58, 0.08)" : "rgba(23, 74, 58, 0.04)"};
  box-shadow: ${({ $isScrolled }) =>
    $isScrolled ? "0 4px 28px rgba(23, 74, 58, 0.06)" : "none"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: height 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    background-color 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 860px) {
    height: auto;
    min-height: 72px;
    padding-bottom: 8px;
    background-color: rgba(255, 255, 255, 0.98);
    border-bottom: 1px solid rgba(23, 74, 58, 0.08);
  }
`;

export const HeaderContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 992px) {
    padding: 0 24px;
    gap: 12px;
  }

  @media (max-width: 860px) {
    display: none;
  }
`;

/* ==========================================================================
   LEFT ZONE: BRAND
   ========================================================================== */
export const BrandZone = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const BrandLogoLink = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover {
    opacity: 0.94;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const HeaderLogoImage = styled.img`
  height: 44px;
  width: auto;
  object-fit: contain;
  display: block;
  mix-blend-mode: multiply;
  transition: all 0.25s ease;

  @media (max-width: 860px) {
    height: 38px;
  }
`;

/* ==========================================================================
   CENTER ZONE: AIRBNB-INSPIRED FLOATING PILL NAVIGATION
   ========================================================================== */
export const CenterNavZone = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-width: 660px;

  @media (max-width: 860px) {
    display: none;
  }
`;

export const FloatingPillBar = styled.nav`
  display: inline-flex;
  align-items: center;
  background: #FFFFFF;
  border: 1px solid rgba(23, 74, 58, 0.12);
  border-radius: 999px;
  padding: 4px;
  box-shadow: 0 2px 14px rgba(23, 74, 58, 0.06), 0 1px 3px rgba(0, 0, 0, 0.02);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;

  &:hover {
    box-shadow: 0 4px 20px rgba(23, 74, 58, 0.1), 0 2px 6px rgba(0, 0, 0, 0.03);
    border-color: rgba(46, 125, 91, 0.25);
  }
`;

export const PillNavItem = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  border-radius: 999px;
  border: none;
  background: ${({ $isActive }) =>
    $isActive ? "rgba(46, 125, 91, 0.09)" : "transparent"};
  color: ${({ $isActive }) => ($isActive ? "#174A3A" : "#243E36")};
  font-family: var(--font-sans, 'Inter', sans-serif);
  font-size: 0.88rem;
  font-weight: ${({ $isActive }) => ($isActive ? "700" : "600")};
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  position: relative;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  .pill-icon {
    font-size: 1.05rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ $isActive }) => ($isActive ? "#2E7D5B" : "inherit")};
    transition: transform 0.2s ease;
  }

  .pill-label {
    letter-spacing: -0.01em;
  }

  &:hover {
    background: ${({ $isActive }) =>
      $isActive ? "rgba(46, 125, 91, 0.12)" : "rgba(23, 74, 58, 0.05)"};
    color: #174A3A;

    .pill-icon {
      transform: scale(1.08);
    }
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 1120px) {
    padding: 8px 14px;
    font-size: 0.84rem;
  }
`;

export const PillDivider = styled.div`
  width: 1px;
  height: 20px;
  background-color: rgba(23, 74, 58, 0.1);
  margin: 0 1px;
`;

/* ==========================================================================
   RIGHT ZONE: ACTIONS
   ========================================================================== */
export const RightActionsZone = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;

  @media (max-width: 860px) {
    display: none;
  }
`;

export const ActionButtonWrapper = styled.div`
  position: relative;
`;

/* Notification Circle Trigger */
export const IconButton = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid
    ${({ $isOpen }) =>
      $isOpen ? "#2E7D5B" : "rgba(23, 74, 58, 0.12)"};
  background-color: ${({ $isOpen }) =>
    $isOpen ? "rgba(46, 125, 91, 0.08)" : "#FFFFFF"};
  color: #174A3A;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  box-shadow: 0 1px 4px rgba(23, 74, 58, 0.04);

  &:hover {
    background-color: rgba(46, 125, 91, 0.06);
    border-color: rgba(46, 125, 91, 0.3);
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(23, 74, 58, 0.08);
  }

  &:active {
    transform: translateY(0);
  }

  .badge {
    position: absolute;
    top: -3px;
    right: -3px;
    background: #E11D48;
    color: #FFFFFF;
    font-size: 0.68rem;
    font-weight: 700;
    min-width: 18px;
    height: 18px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #FFFFFF;
    box-shadow: 0 2px 5px rgba(225, 29, 72, 0.3);
    padding: 0 3px;
  }
`;

/* Saved Button with Heart & Label */
export const SavedPillButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid
    ${({ $isOpen }) =>
      $isOpen ? "#2E7D5B" : "rgba(23, 74, 58, 0.12)"};
  background-color: ${({ $isOpen }) =>
    $isOpen ? "rgba(46, 125, 91, 0.08)" : "#FFFFFF"};
  color: #174A3A;
  font-family: var(--font-sans, 'Inter', sans-serif);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 4px rgba(23, 74, 58, 0.04);

  .heart-icon {
    font-size: 1.1rem;
    color: #E11D48;
  }

  .saved-badge {
    font-size: 0.7rem;
    font-weight: 700;
    background: rgba(225, 29, 72, 0.1);
    color: #E11D48;
    padding: 1px 6px;
    border-radius: 999px;
  }

  &:hover {
    background-color: rgba(46, 125, 91, 0.06);
    border-color: rgba(46, 125, 91, 0.3);
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(23, 74, 58, 0.08);
  }
`;

/* Log In Text Link */
export const LoginTextButton = styled.button`
  font-family: var(--font-sans, 'Inter', sans-serif);
  font-size: 0.92rem;
  font-weight: 600;
  color: #174A3A;
  background: transparent;
  border: none;
  padding: 8px 14px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(23, 74, 58, 0.06);
    color: #103328;
  }
`;

/* Primary Sign Up Rounded Button */
export const SignUpPillButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 22px;
  border-radius: 999px;
  background-color: #174A3A;
  color: #FFFFFF;
  border: none;
  font-family: var(--font-sans, 'Inter', sans-serif);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(23, 74, 58, 0.22);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background-color: #2E7D5B;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(46, 125, 91, 0.28);
  }

  &:active {
    transform: translateY(0);
  }
`;

/* ==========================================================================
   VISITOR (LOGGED-OUT) STATE: AVATAR BUTTON & DROPDOWN
   ========================================================================== */
export const VisitorAvatarButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 5px 6px 5px 14px;
  border-radius: 999px;
  border: 1px solid
    ${({ $isOpen }) =>
      $isOpen ? "#2E7D5B" : "rgba(23, 74, 58, 0.15)"};
  background-color: #FFFFFF;
  cursor: pointer;
  box-shadow: ${({ $isOpen }) =>
    $isOpen
      ? "0 4px 18px rgba(23, 74, 58, 0.14)"
      : "0 2px 10px rgba(23, 74, 58, 0.06)"};
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  .menu-icon {
    font-size: 1.15rem;
    color: #174A3A;
    display: flex;
    align-items: center;
    transition: color 0.2s ease;
  }

  .visitor-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: linear-gradient(135deg, #174A3A 0%, #2E7D5B 100%);
    color: #FFFFFF;
    font-size: 1.08rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(23, 74, 58, 0.2);
    transition: transform 0.25s ease;
  }

  &:hover {
    border-color: rgba(46, 125, 91, 0.38);
    box-shadow: 0 4px 18px rgba(23, 74, 58, 0.12);
    transform: translateY(-1px);

    .visitor-avatar {
      transform: scale(1.05);
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

export const VisitorMenuDropdown = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 270px;
  background: #FFFFFF;
  border-radius: 20px;
  border: 1px solid rgba(23, 74, 58, 0.12);
  box-shadow: 0 16px 42px rgba(23, 74, 58, 0.15);
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  padding: 8px 0;
  z-index: 1100;
  animation: dropIn 0.22s cubic-bezier(0.16, 1, 0.3, 1);

  .visitor-header-card {
    padding: 14px 18px 12px;
    border-bottom: 1px solid rgba(23, 74, 58, 0.08);
    background: #F8F5ED;
    margin-bottom: 4px;

    .greeting-title {
      display: block;
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-weight: 700;
      color: #174A3A;
      font-size: 0.95rem;
      letter-spacing: -0.01em;
    }

    .greeting-sub {
      display: block;
      font-family: var(--font-sans, 'Inter', sans-serif);
      font-size: 0.76rem;
      color: #556B64;
      margin-top: 2px;
      line-height: 1.35;
    }
  }
`;

export const VisitorMenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 10px 18px;
  background: ${({ $isPrimary }) =>
    $isPrimary ? "rgba(46, 125, 91, 0.05)" : "transparent"};
  border: none;
  font-family: var(--font-sans, 'Inter', sans-serif);
  text-align: left;
  cursor: pointer;
  transition: all 0.18s ease;

  .item-icon {
    font-size: 1.15rem;
    color: ${({ $isPrimary }) => ($isPrimary ? "#2E7D5B" : "#174A3A")};
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .item-text {
    display: flex;
    flex-direction: column;
    gap: 1px;

    .item-title {
      font-size: 0.88rem;
      font-weight: ${({ $isPrimary }) => ($isPrimary ? "700" : "600")};
      color: #174A3A;
    }

    .item-hint {
      font-size: 0.73rem;
      color: #71877F;
    }
  }

  &:hover {
    background-color: #F8F5ED;
    padding-left: 22px;

    .item-icon {
      color: #2E7D5B;
    }
  }
`;

/* ==========================================================================
   LOGGED-IN STATE: PROFILE PILL & DROPDOWN
   ========================================================================== */
export const ProfilePillButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 5px 14px 5px 6px;
  border-radius: 999px;
  border: 1px solid
    ${({ $isOpen }) =>
      $isOpen ? "#2E7D5B" : "rgba(23, 74, 58, 0.14)"};
  background-color: #FFFFFF;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(23, 74, 58, 0.06);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  .avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: linear-gradient(135deg, #174A3A 0%, #2E7D5B 100%);
    color: #F8F5ED;
    font-size: 0.85rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 6px rgba(23, 74, 58, 0.2);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .user-name {
    font-family: var(--font-sans, 'Inter', sans-serif);
    font-size: 0.92rem;
    font-weight: 600;
    color: #174A3A;
  }

  .chevron {
    font-size: 0.85rem;
    color: #556B64;
    transition: transform 0.2s ease;
    transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  }

  &:hover {
    border-color: rgba(46, 125, 91, 0.35);
    box-shadow: 0 4px 16px rgba(23, 74, 58, 0.1);
    transform: translateY(-1px);
  }
`;

export const ProfileMenuDropdown = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 250px;
  background: #FFFFFF;
  border-radius: 20px;
  border: 1px solid rgba(23, 74, 58, 0.12);
  box-shadow: 0 16px 42px rgba(23, 74, 58, 0.15);
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  padding: 8px 0;
  z-index: 1100;
  animation: dropIn 0.22s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes dropIn {
    from {
      opacity: 0;
      transform: translateY(-8px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .user-header-card {
    padding: 12px 18px;
    border-bottom: 1px solid rgba(23, 74, 58, 0.08);
    background: #F8F5ED;
    margin-bottom: 4px;

    .full-name {
      display: block;
      font-weight: 600;
      color: #174A3A;
      font-size: 0.94rem;
    }
    .verified-role {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.75rem;
      font-weight: 600;
      color: #2E7D5B;
      margin-top: 2px;
    }
  }
`;

export const ProfileMenuItem = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 18px;
  font-family: var(--font-sans, 'Inter', sans-serif);
  font-size: 0.88rem;
  font-weight: ${({ $isBold }) => ($isBold ? "700" : "500")};
  color: ${({ $isDanger }) => ($isDanger ? "#DC2626" : "#174A3A")};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.18s ease;

  .item-icon {
    font-size: 1.1rem;
    color: ${({ $isDanger }) => ($isDanger ? "#DC2626" : "#2E7D5B")};
    display: flex;
    align-items: center;
  }

  &:hover {
    background-color: ${({ $isDanger }) =>
      $isDanger ? "rgba(220, 38, 38, 0.06)" : "#F8F5ED"};
    color: ${({ $isDanger }) => ($isDanger ? "#B91C1C" : "#0D3328")};
    padding-left: 22px;
  }
`;

export const MenuDivider = styled.div`
  height: 1px;
  background-color: rgba(23, 74, 58, 0.08);
  margin: 6px 0;
`;

/* ==========================================================================
   NOTIFICATIONS DROPDOWN
   ========================================================================== */
export const NotificationDropdownCard = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 360px;
  background: #FFFFFF;
  border-radius: 20px;
  border: 1px solid rgba(23, 74, 58, 0.12);
  box-shadow: 0 16px 42px rgba(23, 74, 58, 0.15);
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  overflow: hidden;
  z-index: 1100;
  animation: dropIn 0.22s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 480px) {
    width: calc(100vw - 32px);
    right: -100px;
  }

  .notif-header {
    padding: 14px 20px;
    background: #F8F5ED;
    border-bottom: 1px solid rgba(23, 74, 58, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;

    h4 {
      margin: 0;
      font-size: 0.94rem;
      font-weight: 600;
      color: #174A3A;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .mark-read-btn {
      font-size: 0.78rem;
      font-weight: 600;
      color: #2E7D5B;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px 6px;
      border-radius: 6px;

      &:hover {
        background: rgba(46, 125, 91, 0.1);
      }
    }
  }

  .notif-list {
    max-height: 330px;
    overflow-y: auto;
  }

  .notif-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 20px;
    border-bottom: 1px solid rgba(23, 74, 58, 0.05);
    background: #FFFFFF;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: #F8F5ED;
    }

    &.unread {
      background: rgba(46, 125, 91, 0.04);

      .notif-icon {
        background: rgba(46, 125, 91, 0.15);
      }

      .notif-content .title {
        font-weight: 700;
      }
    }

    .notif-icon {
      width: 34px;
      height: 34px;
      border-radius: 10px;
      background: rgba(23, 74, 58, 0.06);
      color: #174A3A;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      flex-shrink: 0;
    }

    .notif-content {
      flex: 1;

      .title {
        display: block;
        font-size: 0.88rem;
        font-weight: 600;
        color: #174A3A;
        line-height: 1.3;
      }

      .desc {
        display: block;
        font-size: 0.8rem;
        color: #556B64;
        margin-top: 3px;
        line-height: 1.4;
      }

      .time {
        display: block;
        font-size: 0.72rem;
        color: #8C9E98;
        margin-top: 4px;
      }
    }

    .unread-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #2E7D5B;
      flex-shrink: 0;
      margin-top: 6px;
    }
  }
`;

/* ==========================================================================
   MOBILE HEADER ARCHITECTURE
   ========================================================================== */
export const MobileHeaderTopRow = styled.div`
  display: none;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 10px 24px 6px;

  @media (max-width: 860px) {
    display: flex;
  }

  @media (max-width: 480px) {
    padding: 10px 16px 6px;
  }
`;

export const MobileActionsCluster = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const MobileScrollablePillNav = styled.div`
  display: none;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding: 4px 24px 6px;
  gap: 8px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 860px) {
    display: flex;
    align-items: center;
  }

  @media (max-width: 480px) {
    padding: 4px 16px 6px;
  }
`;

export const MobilePill = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid
    ${({ $isActive }) =>
      $isActive ? "#174A3A" : "rgba(23, 74, 58, 0.14)"};
  background-color: ${({ $isActive }) =>
    $isActive ? "#174A3A" : "#FFFFFF"};
  color: ${({ $isActive }) => ($isActive ? "#F8F5ED" : "#174A3A")};
  font-family: var(--font-sans, 'Inter', sans-serif);
  font-size: 0.82rem;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(23, 74, 58, 0.05);
  cursor: pointer;

  &:active {
    transform: scale(0.96);
  }
`;

/* Mobile Sliding Drawer */
export const MobileDrawer = styled.div`
  display: none;

  @media (max-width: 860px) {
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    width: 320px;
    height: 100vh;
    background: #FFFFFF;
    box-shadow: -8px 0 32px rgba(23, 74, 58, 0.2);
    z-index: 2500;
    overflow-y: auto;
    animation: slideLeft 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes slideLeft {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }

  .drawer-header {
    padding: 20px;
    background: #F8F5ED;
    border-bottom: 1px solid rgba(23, 74, 58, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .drawer-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .drawer-link {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.95rem;
    font-weight: 600;
    color: #174A3A;
    text-decoration: none;
    padding: 10px 0;
    border-bottom: 1px solid rgba(23, 74, 58, 0.06);

    svg {
      font-size: 1.25rem;
      color: #2E7D5B;
    }
  }

  .auth-stack {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const DrawerBackdrop = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  position: fixed;
  inset: 0;
  background: rgba(23, 74, 58, 0.5);
  backdrop-filter: blur(4px);
  z-index: 2400;
`;
