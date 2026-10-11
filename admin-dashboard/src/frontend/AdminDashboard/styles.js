import styled from 'styled-components';
import { Card, Table, Button } from 'react-bootstrap';

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 576px) {
    margin-bottom: 16px;
    gap: 10px;
  }
`;

export const WelcomeText = styled.div`
  h2 {
    margin: 0;
    font-weight: 600;
    color: #12201B;
    font-size: 1.55rem;
    letter-spacing: -0.5px;

    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }

  p {
    margin: 3px 0 0 0;
    color: #66736D;
    font-size: 0.86rem;

    @media (max-width: 768px) {
      font-size: 0.78rem;
    }
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 576px) {
    width: 100%;
    justify-content: space-between;
    gap: 8px;
  }
`;

export const DatePill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #ffffff;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 500;
  color: #12201B;
  border: 1px solid #E6ECE8;
  white-space: nowrap;

  @media (max-width: 576px) {
    font-size: 0.72rem;
    padding: 4px 10px;
  }
`;

export const ExportBtn = styled(Button)`
  background: #185C4A;
  border: 1px solid #185C4A;
  border-radius: 20px;
  padding: 6px 18px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #ffffff;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.15s ease;
  white-space: nowrap;

  &:hover, &:focus {
    background: #12201B;
    border-color: #12201B;
    color: #ffffff;
  }

  @media (max-width: 576px) {
    font-size: 0.76rem;
    padding: 5px 12px;
  }
`;

// Asymmetric Hero Card (Matching Reference Layout Large Hero Card)
export const HeroCard = styled(Card)`
  background: linear-gradient(135deg, #EEF8F4 0%, #DFF1E9 100%);
  border: 1.5px solid #DFF1E9;
  border-radius: 16px;
  padding: 22px;
  height: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(24, 92, 74, 0.04);

  @media (max-width: 576px) {
    padding: 16px;
  }

  .hero-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: #185C4A;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    margin-bottom: 14px;

    @media (max-width: 576px) {
      width: 36px;
      height: 36px;
      margin-bottom: 10px;
      font-size: 1.1rem;
    }
  }

  .hero-label {
    font-size: 0.74rem;
    font-weight: 600;
    color: #185C4A;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  .hero-value {
    font-size: 2.2rem;
    font-weight: 800;
    color: #12201B;
    margin: 6px 0 6px 0;
    letter-spacing: -1px;
    line-height: 1;

    @media (max-width: 768px) {
      font-size: 1.8rem;
    }
  }

  .hero-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 0.72rem;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 14px;
    background: #185C4A;
    color: #ffffff;
  }
`;

export const OperationalCard = styled(Card)`
  border: 1px solid #E6ECE8;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.015);
  padding: 20px;
  height: 100%;

  @media (max-width: 576px) {
    padding: 14px;
  }
`;

export const WidgetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  h5 {
    margin: 0;
    font-weight: 600;
    color: #12201B;
    font-size: 1.02rem;

    @media (max-width: 576px) {
      font-size: 0.92rem;
    }
  }
`;

export const OperationalItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-radius: 10px;
  background: #F7F8F6;
  border: 1px solid #E6ECE8;
  margin-bottom: 8px;
  transition: all 0.15s ease;
  gap: 8px;

  @media (max-width: 576px) {
    padding: 10px 12px;
  }

  &:hover {
    background: #ffffff;
    border-color: #DFF1E9;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  }

  .title {
    font-weight: 600;
    color: #12201B;
    font-size: 0.86rem;
  }

  .meta {
    font-size: 0.75rem;
    color: #66736D;
    margin-top: 2px;
  }
`;

// Primary Green Tonal Urgent Item Components
export const ExpiringUrgentItem = styled.div`
  padding: 12px 14px;
  border-radius: 10px;
  background: #EEF8F4;
  border: 1px solid #DFF1E9;
  border-left: 4px solid #185C4A;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 10px;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px;

    button {
      width: 100%;
      margin-top: 4px;
    }
  }

  .title {
    font-size: 0.86rem;
    font-weight: 600;
    color: #185C4A;
  }
  .desc {
    font-size: 0.76rem;
    color: #2F7D67;
    margin-top: 2px;
  }
`;

export const AuditUrgentItem = styled.div`
  padding: 10px 14px;
  border-radius: 10px;
  background: #F5FAF7;
  border: 1px solid #E6ECE8;
  border-left: 4px solid #2F7D67;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 10px;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px;

    button {
      width: 100%;
      margin-top: 4px;
    }
  }

  .title {
    font-size: 0.84rem;
    font-weight: 600;
    color: #2F7D67;
  }
  .desc {
    font-size: 0.76rem;
    color: #52A88F;
    margin-top: 2px;
  }
`;

export const RequestUrgentItem = styled.div`
  padding: 10px 14px;
  border-radius: 10px;
  background: #F7F8F6;
  border: 1px solid #E6ECE8;
  border-left: 4px solid #52A88F;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  gap: 10px;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px;

    button {
      width: 100%;
      margin-top: 4px;
    }
  }

  .title {
    font-size: 0.84rem;
    font-weight: 600;
    color: #185C4A;
  }
  .desc {
    font-size: 0.76rem;
    color: #66736D;
    margin-top: 2px;
  }
`;

// Rescue Schedule Widget Styling
export const ScheduleWidgetCard = styled(Card)`
  border: 1px solid #E6ECE8;
  border-radius: 14px;
  background: #ffffff;
  padding: 20px;
  height: 100%;
`;

export const CalendarDayPicker = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #F7F8F6;
  border: 1px solid #E6ECE8;
  border-radius: 12px;
  padding: 8px 10px;
  margin-bottom: 14px;
  overflow-x: auto;
  gap: 4px;

  .day-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.72rem;
    font-weight: 600;
    color: #66736D;
    gap: 4px;
    cursor: pointer;
    flex-shrink: 0;

    .num {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.76rem;
      font-weight: 700;
    }

    &.active {
      color: #185C4A;
      .num {
        background: #185C4A;
        color: #ffffff;
      }
    }
  }
`;

export const ScheduleTimelineItem = styled.div`
  background: #EEF8F4;
  border-left: 3px solid #185C4A;
  border-radius: 8px;
  padding: 10px 12px;
  margin-bottom: 8px;

  .time {
    font-size: 0.7rem;
    font-weight: 700;
    color: #185C4A;
  }

  .title {
    font-size: 0.82rem;
    font-weight: 600;
    color: #12201B;
    margin-top: 2px;
  }

  .sub {
    font-size: 0.74rem;
    color: #66736D;
  }
`;

export const TransactionTableCard = styled(Card)`
  border: 1px solid #E6ECE8;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.015);
  padding: 20px;
  height: 100%;
  overflow: hidden;

  @media (max-width: 576px) {
    padding: 14px;
  }
`;
