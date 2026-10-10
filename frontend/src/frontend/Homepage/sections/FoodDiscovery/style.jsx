import styled from "styled-components";

export const SectionWrapper = styled.section`
  padding: 90px 0;
  background-color: #FFFFFF;

  @media (max-width: 768px) {
    padding: 40px 0;
  }
`;

export const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 32px;
  box-sizing: border-box;

  @media (max-width: 992px) {
    padding: 0 24px;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 768px) {
    margin-bottom: 18px;
    gap: 10px;
  }

  .title-group {
    h2 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 2.3rem;
      font-weight: 600;
      color: #174A3A;
      margin: 0 0 8px;

      @media (max-width: 768px) {
        font-size: 1.35rem;
        margin-bottom: 4px;
      }
    }
    p {
      font-size: 1rem;
      color: #556B64;
      margin: 0;

      @media (max-width: 768px) {
        font-size: 0.82rem;
      }
    }
  }

  .view-all-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.94rem;
    font-weight: 700;
    color: #2E7D5B;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }

    &:hover {
      color: #174A3A;
      transform: translateX(3px);
    }
  }
`;

export const FilterPillsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 36px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: none;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    gap: 8px;
    padding-bottom: 4px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FilterPill = styled.button`
  padding: 8px 18px;
  border-radius: 999px;
  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 600;
  border: 1px solid
    ${({ $isActive }) =>
      $isActive ? "#174A3A" : "rgba(23, 74, 58, 0.14)"};
  background-color: ${({ $isActive }) =>
    $isActive ? "#174A3A" : "#FFFFFF"};
  color: ${({ $isActive }) => ($isActive ? "#F8F5ED" : "#174A3A")};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  @media (max-width: 768px) {
    font-size: 0.76rem;
    padding: 6px 14px;
  }

  &:hover {
    border-color: #174A3A;
    background-color: ${({ $isActive }) =>
      $isActive ? "#174A3A" : "rgba(23, 74, 58, 0.05)"};
  }
`;

export const FoodCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1040px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
  }
`;

