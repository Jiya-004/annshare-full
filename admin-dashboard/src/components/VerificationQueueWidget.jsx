import React from 'react';
import styled from 'styled-components';
import { Card, ProgressBar } from 'react-bootstrap';
import { FiShield, FiCheckCircle } from 'react-icons/fi';
import { verificationQueueData } from '../data/verificationQueue';

const StyledCard = styled(Card)`
  border: 1px solid #E5E7EB;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  padding: 24px;
  height: 100%;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  h5 {
    margin: 0;
    font-weight: 700;
    color: #111827;
    font-size: 1.05rem;
  }
`;

const QueueList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const QueueItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const IconWrapper = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #F3F4F6;
  color: #374151;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
`;

const ItemContent = styled.div`
  flex-grow: 1;

  .item-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
  }

  h6 {
    margin: 0;
    font-size: 0.85rem;
    font-weight: 600;
    color: #111827;
  }

  span.percentage {
    font-size: 0.78rem;
    font-weight: 600;
    color: #1B4D3E;
  }
`;

const StyledProgressBar = styled(ProgressBar)`
  height: 6px;
  border-radius: 3px;
  background-color: #F3F4F6;

  .progress-bar {
    background-color: #2ECC71;
    border-radius: 3px;
  }
`;

const VerificationQueueWidget = () => {
  return (
    <StyledCard>
      <CardHeader>
        <h5>Verification Queue</h5>
        <span style={{ fontSize: '0.78rem', color: '#6B7280', fontWeight: 500 }}>
          {verificationQueueData.length} pending
        </span>
      </CardHeader>

      <QueueList>
        {verificationQueueData.map(item => (
          <QueueItem key={item.id}>
            <IconWrapper>
              <FiShield />
            </IconWrapper>

            <ItemContent>
              <div className="item-top">
                <h6>{item.name}</h6>
                <span className="percentage">{item.progress}%</span>
              </div>
              <StyledProgressBar now={item.progress} />
            </ItemContent>
          </QueueItem>
        ))}
      </QueueList>
    </StyledCard>
  );
};

export default VerificationQueueWidget;
