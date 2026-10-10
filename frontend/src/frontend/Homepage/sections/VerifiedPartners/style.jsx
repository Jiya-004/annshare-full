import styled from "styled-components";

export const PartnersWrapper = styled.section`
  padding: 100px 0;
  background-color: #F8F5ED;

  @media (max-width: 768px) {
    padding: 40px 0;
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

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

export const HeaderArea = styled.div`
  text-align: center;
  max-width: 680px;
  margin: 0 auto 44px;

  @media (max-width: 768px) {
    margin: 0 auto 20px;
  }

  .badge {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #2E7D5B;
    background: rgba(46, 125, 91, 0.1);
    padding: 6px 16px;
    border-radius: 999px;
    display: inline-block;
    margin-bottom: 14px;

    @media (max-width: 768px) {
      font-size: 0.68rem;
      padding: 4px 10px;
      margin-bottom: 8px;
    }
  }

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.5rem;
    font-weight: 600;
    color: #174A3A;
    margin: 0 0 14px;

    @media (max-width: 768px) {
      font-size: 1.35rem;
      margin-bottom: 6px;
    }

    @media (max-width: 480px) {
      font-size: 1.25rem;
    }
  }

  p {
    font-size: 1.05rem;
    color: #556B64;
    line-height: 1.6;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 0.82rem;
    }
  }
`;

export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 44px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
    gap: 8px;
  }

  .filter-btn {
    background: #FFFFFF;
    border: 1px solid rgba(23, 74, 58, 0.12);
    padding: 10px 22px;
    border-radius: 999px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #174A3A;
    cursor: pointer;
    transition: all 0.25s ease;

    @media (max-width: 768px) {
      font-size: 0.76rem;
      padding: 6px 14px;
    }

    &:hover {
      border-color: #2E7D5B;
      color: #2E7D5B;
    }

    &.active {
      background: #174A3A;
      color: #FFFFFF;
      border-color: #174A3A;
      box-shadow: 0 4px 14px rgba(23, 74, 58, 0.2);
    }
  }
`;

export const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

export const PartnerCard = styled.div`
  background: #FFFFFF;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid rgba(23, 74, 58, 0.08);
  box-shadow: 0 6px 20px rgba(23, 74, 58, 0.04);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 18px 16px;
    border-radius: 16px;
    gap: 14px;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 30px rgba(23, 74, 58, 0.09);
    border-color: rgba(46, 125, 91, 0.25);
  }

  .top-meta {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;

    .initials-box {
      width: 46px;
      height: 46px;
      border-radius: 12px;
      background: #F8F5ED;
      color: #174A3A;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      font-weight: 800;
      border: 1px solid rgba(23, 74, 58, 0.1);

      @media (max-width: 768px) {
        width: 36px;
        height: 36px;
        font-size: 0.95rem;
        border-radius: 10px;
      }
    }

    .verified-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(46, 125, 91, 0.1);
      color: #2E7D5B;
      font-size: 0.74rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 999px;

      @media (max-width: 768px) {
        font-size: 0.68rem;
        padding: 3px 8px;
      }
    }
  }

  .main-info {
    h3 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.15rem;
      font-weight: 600;
      color: #174A3A;
      margin: 0 0 6px;

      @media (max-width: 768px) {
        font-size: 1.0rem;
        margin-bottom: 3px;
      }
    }

    .category {
      font-size: 0.82rem;
      color: #66756F;
      display: flex;
      align-items: center;
      gap: 6px;

      @media (max-width: 768px) {
        font-size: 0.76rem;
      }
    }
  }

  .bottom-stat {
    padding-top: 14px;
    border-top: 1px solid rgba(23, 74, 58, 0.06);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.84rem;

    @media (max-width: 768px) {
      padding-top: 10px;
      font-size: 0.76rem;
    }

    .stat-lbl {
      color: #8C9E98;
    }
    .stat-val {
      font-weight: 700;
      color: #174A3A;
    }
  }
`;
