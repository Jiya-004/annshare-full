import styled from "styled-components";

export const StoryWrapper = styled.section`
  padding: 100px 0;
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

  @media (max-width: 992px) {
    padding: 0 24px;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

export const StoryCard = styled.div`
  background: #F8F5ED;
  border-radius: 36px;
  border: 1px solid rgba(23, 74, 58, 0.08);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  box-shadow: 0 20px 50px rgba(23, 74, 58, 0.06);

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    border-radius: 20px;
  }
`;

export const VisualSide = styled.div`
  position: relative;
  min-height: 460px;

  @media (max-width: 768px) {
    min-height: 240px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .stat-pill-group {
    position: absolute;
    bottom: 24px;
    left: 24px;
    right: 24px;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      bottom: 14px;
      left: 14px;
      right: 14px;
      gap: 8px;
    }

    .stat-pill {
      background: rgba(23, 74, 58, 0.85);
      backdrop-filter: blur(10px);
      color: #FFFFFF;
      padding: 8px 16px;
      border-radius: 12px;
      font-size: 0.82rem;
      font-weight: 700;

      @media (max-width: 768px) {
        font-size: 0.72rem;
        padding: 5px 10px;
        border-radius: 8px;
      }
    }
  }
`;

export const ContentSide = styled.div`
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 22px 18px;
  }

  .badge {
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #2E7D5B;
    background: rgba(46, 125, 91, 0.1);
    padding: 5px 14px;
    border-radius: 999px;
    display: inline-block;
    align-self: flex-start;
    margin-bottom: 16px;

    @media (max-width: 768px) {
      font-size: 0.68rem;
      padding: 4px 10px;
      margin-bottom: 8px;
    }
  }

  h2 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 2.3rem;
    font-weight: 600;
    color: #174A3A;
    line-height: 1.25;
    margin: 0 0 20px;

    @media (max-width: 768px) {
      font-size: 1.35rem;
      margin-bottom: 10px;
    }

    @media (max-width: 480px) {
      font-size: 1.25rem;
    }
  }

  blockquote {
    font-size: 1.08rem;
    font-style: italic;
    color: #4A5B55;
    line-height: 1.65;
    margin: 0 0 24px;
    position: relative;
    padding-left: 20px;
    border-left: 3px solid #2E7D5B;

    @media (max-width: 768px) {
      font-size: 0.82rem;
      line-height: 1.5;
      margin-bottom: 14px;
      padding-left: 12px;
    }
  }

  .author-meta {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: 10px;

    @media (max-width: 768px) {
      gap: 10px;
      margin-top: 6px;
    }

    .avatar {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: #174A3A;
      color: #FFFFFF;
      font-weight: 700;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      justify-content: center;

      @media (max-width: 768px) {
        width: 36px;
        height: 36px;
        font-size: 0.95rem;
      }
    }

    .info {
      .name {
        font-family: var(--font-display, 'Poppins', sans-serif);
        font-size: 1rem;
        font-weight: 600;
        color: #174A3A;

        @media (max-width: 768px) {
          font-size: 0.88rem;
        }
      }
      .role {
        font-size: 0.84rem;
        color: #66756F;

        @media (max-width: 768px) {
          font-size: 0.74rem;
        }
      }
    }
  }
`;
