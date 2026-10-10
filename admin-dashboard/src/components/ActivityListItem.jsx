import React from 'react';
import styled from 'styled-components';
import { FiActivity, FiCheckCircle, FiAlertCircle, FiPackage, FiTruck } from 'react-icons/fi';

const ActivityWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }
`;

const IconCircle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${props => props.$bg || 'rgba(27, 77, 62, 0.1)'};
  color: ${props => props.$color || '#1B4D3E'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Content = styled.div`
  flex-grow: 1;

  p.text {
    margin: 0;
    font-size: 0.85rem;
    font-weight: 600;
    color: #1e293b;
  }

  span.time {
    font-size: 0.75rem;
    color: #94a3b8;
  }
`;

const ActivityListItem = ({ text, time, category }) => {
  const getIcon = () => {
    if (category?.includes('Delivery')) return <FiTruck size={16} />;
    if (category?.includes('Listing')) return <FiPackage size={16} />;
    if (category?.includes('Expired')) return <FiAlertCircle size={16} />;
    return <FiCheckCircle size={16} />;
  };

  return (
    <ActivityWrapper>
      <IconCircle $bg="rgba(46, 204, 113, 0.15)" $color="#1e8449">
        {getIcon()}
      </IconCircle>
      <Content>
        <p className="text">{text}</p>
        <span className="time">{time}</span>
      </Content>
    </ActivityWrapper>
  );
};

export default ActivityListItem;
