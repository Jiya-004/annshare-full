import styled from "styled-components";

export const DiscoveryWrapper = styled.section`
  position: relative;
  margin-top: -36px;
  z-index: 10;
  padding: 0 0 40px;

  @media (max-width: 768px) {
    margin-top: 0;
    padding: 0px 0 32px;
  }
`;

export const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 32px;

  @media (max-width: 992px) {
    padding: 0 24px;
  }

  @media (max-width: 860px) {
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

export const SearchCard = styled.div`
  background: #FFFFFF;
  border-radius: 28px;
  padding: 24px 32px;
  box-shadow: 0 16px 48px rgba(23, 74, 58, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(23, 74, 58, 0.1);

  .header-row {
    margin-bottom: 18px;

    h3 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.25rem;
      font-weight: 600;
      color: #174A3A;
      margin: 0;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const DesktopSearchCard = SearchCard;

export const SegmentsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1.3fr auto;
  align-items: center;
  gap: 12px;
  background: #F8F5ED;
  padding: 6px;
  border-radius: 999px;
  border: 1px solid rgba(23, 74, 58, 0.08);

  @media (max-width: 992px) {
    grid-template-columns: 1fr 1fr;
    border-radius: 20px;
    padding: 12px;
    gap: 10px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const SegmentButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 18px;
  border-radius: 999px;
  border: none;
  background: ${({ $isActive }) => ($isActive ? "#FFFFFF" : "transparent")};
  box-shadow: ${({ $isActive }) =>
    $isActive ? "0 2px 10px rgba(23, 74, 58, 0.08)" : "none"};
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;

  .label {
    font-size: 0.76rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: ${({ $isActive }) => ($isActive ? "#2E7D5B" : "#556B64")};
  }

  .value {
    font-size: 0.94rem;
    font-weight: 700;
    color: #174A3A;
    margin-top: 2px;
  }

  &:hover {
    background: ${({ $isActive }) => ($isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)")};
  }

  @media (max-width: 992px) {
    border-radius: 12px;
    padding: 10px 14px;
  }
`;

export const LocationSegment = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 18px;
  position: relative;

  .label {
    font-size: 0.76rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #556B64;
  }

  .input-box {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 2px;

    svg {
      color: #2E7D5B;
      font-size: 1.1rem;
    }

    select {
      background: transparent;
      border: none;
      font-family: inherit;
      font-size: 0.94rem;
      font-weight: 700;
      color: #174A3A;
      outline: none;
      cursor: pointer;
      width: 100%;
    }
  }

  @media (max-width: 992px) {
    padding: 8px 14px;
  }
`;

export const SearchSubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  background: #174A3A;
  color: #FFFFFF;
  border-radius: 999px;
  border: none;
  font-family: inherit;
  font-size: 0.96rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(23, 74, 58, 0.2);
  transition: all 0.22s ease;

  &:hover {
    background: #2E7D5B;
    transform: scale(1.02);
  }

  @media (max-width: 992px) {
    grid-column: span 2;
    padding: 12px;
  }

  @media (max-width: 600px) {
    grid-column: span 1;
  }
`;

/* ==========================================================================
   MOBILE-FIRST APP-LIKE SEARCH CARD (iOS / Airbnb / Uber aesthetic)
   ========================================================================== */
export const MobileSearchCard = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    background: #FFFFFF;
    border-radius: 24px;
    padding: 22px 18px 20px;
    box-shadow: 0 14px 40px rgba(23, 74, 58, 0.08), 0 2px 8px rgba(0, 0, 0, 0.03);
    border: 1px solid rgba(23, 74, 58, 0.08);
    gap: 16px;
    box-sizing: border-box;
  }
`;

export const MobileCardHeader = styled.div`
  h4 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #173F35;
    margin: 0;
  }
`;

export const SegmentedControl = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #F3EFE6;
  padding: 4px;
  border-radius: 16px;
  gap: 4px;
  height: 44px;
  align-items: center;
  border: 1px solid rgba(23, 74, 58, 0.06);
`;

export const SegmentTab = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 100%;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-family: var(--font-sans, 'Inter', sans-serif);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  background: ${({ $isSelected }) => ($isSelected ? "#FFFFFF" : "transparent")};
  color: ${({ $isSelected }) => ($isSelected ? "#173F35" : "#627B72")};
  box-shadow: ${({ $isSelected }) =>
    $isSelected ? "0 3px 12px rgba(23, 74, 58, 0.1)" : "none"};
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);

  .tab-icon {
    font-size: 0.88rem;
    color: ${({ $isSelected }) => ($isSelected ? "#2E7D5B" : "#7C948B")};
    transition: color 0.2s ease;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ActionContentCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 2px 2px;

  .action-title {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 0.88rem;
    font-weight: 700;
    color: #173F35;
    line-height: 1.3;
  }

  .action-desc {
    font-family: var(--font-sans, 'Inter', sans-serif);
    font-size: 0.75rem;
    color: #556B64;
    line-height: 1.4;
  }
`;

export const LocationRowWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const LocationNativeRow = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 48px;
  padding: 0 14px;
  background: #F8F5ED;
  border-radius: 14px;
  border: 1px solid rgba(23, 74, 58, 0.08);
  cursor: pointer;
  transition: all 0.2s ease;

  .loc-left {
    display: flex;
    align-items: center;
    gap: 8px;

    .loc-pin {
      color: #2E7D5B;
      font-size: 1.05rem;
      display: flex;
      align-items: center;
    }

    .loc-name {
      font-family: var(--font-sans, 'Inter', sans-serif);
      font-size: 0.82rem;
      font-weight: 600;
      color: #174A3A;
    }
  }

  .loc-chevron {
    font-size: 1rem;
    color: #7C948B;
    display: flex;
    align-items: center;
    transition: transform 0.2s ease;
    transform: ${({ $isOpen }) => ($isOpen ? "rotate(90deg)" : "rotate(0deg)")};
  }

  &:active {
    background: #EFE9DC;
    transform: scale(0.99);
  }
`;

export const LocationDropdownList = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: #FFFFFF;
  border-radius: 14px;
  border: 1px solid rgba(23, 74, 58, 0.12);
  box-shadow: 0 10px 28px rgba(23, 74, 58, 0.12);
  padding: 6px;
  max-height: 210px;
  overflow-y: auto;
  z-index: 20;
  animation: dropDownFade 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes dropDownFade {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const LocationOptionItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  background: ${({ $isSelected }) => ($isSelected ? "#E8F5E9" : "transparent")};
  color: ${({ $isSelected }) => ($isSelected ? "#2E7D5B" : "#174A3A")};
  font-family: var(--font-sans, 'Inter', sans-serif);
  font-size: 0.8rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s ease;

  .check-icon {
    font-size: 1rem;
    color: #2E7D5B;
  }

  &:hover {
    background: ${({ $isSelected }) => ($isSelected ? "#E8F5E9" : "#F8F5ED")};
  }
`;

export const MobilePrimaryCtaButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 48px;
  background: #173F35;
  color: #FFFFFF;
  border: none;
  border-radius: 24px;
  font-family: var(--font-sans, 'Inter', sans-serif);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  box-shadow: 0 8px 24px rgba(23, 63, 53, 0.24);
  cursor: pointer;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);

  .cta-arrow {
    font-size: 1rem;
    transition: transform 0.2s ease;
  }

  &:hover {
    background: #23584A;
    box-shadow: 0 10px 28px rgba(23, 63, 53, 0.3);

    .cta-arrow {
      transform: translateX(3px);
    }
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 4px 14px rgba(23, 63, 53, 0.2);
  }
`;

export const MicroDetailText = styled.p`
  font-family: var(--font-sans, 'Inter', sans-serif);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #71877F;
  text-align: center;
  margin: 0;
`;
