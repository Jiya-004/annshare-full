import styled from 'styled-components';

export const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: var(--bg-cream);
  color: var(--text-dark);
  display: flex;
  flex-direction: column;
`;

export const MainContent = styled.main`
  flex: 1;
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 24px 20px 60px 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media (max-width: 768px) {
    padding: 16px 12px 40px 12px;
    gap: 24px;
  }
`;

export const GridTwoColumn = styled.div`
  display: grid;
  grid-template-columns: 1.8fr 1fr;
  gap: 24px;
  align-items: start;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const SidebarColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const PrimaryCard = styled.div`
  background: var(--card-bg);
  border-radius: 18px;
  padding: 24px;
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-soft);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: var(--shadow-hover);
  }

  @media (max-width: 576px) {
    padding: 16px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--primary-dark);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .badge-count {
    background: var(--accent-light-bg);
    color: var(--primary-dark);
    font-size: 0.8rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 20px;
  }

  .action-link {
    color: var(--primary-dark);
    font-size: 0.9rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;

    &:hover {
      color: var(--accent-mint);
    }
  }
`;

export const PillTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.3px;

  ${props => props.$type === 'primary' && `
    background: rgba(46, 204, 113, 0.15);
    color: #10B981;
  `}
  ${props => props.$type === 'warning' && `
    background: #FEF9E7;
    color: #D35400;
  `}
  ${props => props.$type === 'info' && `
    background: #EBF5FB;
    color: #2980B9;
  `}
  ${props => props.$type === 'success' && `
    background: #E8F8F5;
    color: #10B981;
  `}
  ${props => props.$type === 'dark' && `
    background: rgba(255, 255, 255, 0.15);
    color: #FFFFFF;
  `}
`;
