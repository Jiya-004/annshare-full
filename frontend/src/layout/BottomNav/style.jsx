import styled from "styled-components";

export const BottomNavWrapper = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 68px;
  background-color: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-top: 1px solid rgba(18, 61, 50, 0.1);
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.06);
  z-index: 999;
  display: none;
  align-items: center;
  justify-content: space-around;
  padding: 0 12px;

  @media (max-width: 860px) {
    display: flex;
  }
`;

export const NavButton = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  color: ${({ $isActive }) => ($isActive ? "#123D32" : "#6B7280")};
  font-size: 0.72rem;
  font-weight: ${({ $isActive }) => ($isActive ? "700" : "500")};
  text-decoration: none;
  flex: 1;
  height: 100%;
  transition: all 0.2s ease;

  .nav-icon {
    font-size: 1.3rem;
    line-height: 1;
    color: ${({ $isActive }) => ($isActive ? "#123D32" : "#6B7280")};
    transition: transform 0.2s ease;
  }

  &:hover {
    color: #123D32;
    .nav-icon {
      transform: translateY(-2px);
      color: #123D32;
    }
  }
`;

export const FloatingActionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #123D32 0%, #10B981 100%);
  color: #FFFFFF;
  border: 3px solid #FFFFFF;
  box-shadow: 0 4px 14px rgba(18, 61, 50, 0.35);
  cursor: pointer;
  margin-top: -24px;
  font-size: 1.4rem;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: scale(1.08) translateY(-2px);
    box-shadow: 0 6px 18px rgba(18, 61, 50, 0.45);
  }

  &:active {
    transform: scale(0.96);
  }
`;
