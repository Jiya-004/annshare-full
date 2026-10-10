import React from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import { FiTruck, FiArrowRight } from 'react-icons/fi';
import StatusBadge from './StatusBadge';

const WalletCard = styled.div`
  border: 1px solid #F3F4F6;
  border-radius: 12px;
  background: #F9FAFB;
  padding: 14px 16px;
  transition: all 0.15s ease;

  &:hover {
    background: #ffffff;
    border-color: #E5E7EB;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }
`;

const IconPill = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #E3F5EA;
  color: #1B4D3E;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  flex-shrink: 0;
`;

const RouteText = styled.div`
  font-size: 0.84rem;
  font-weight: 600;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 5px;

  span.donor {
    color: #111827;
  }
  span.ngo {
    color: #1B4D3E;
  }
`;

const QuantityText = styled.div`
  font-size: 0.76rem;
  color: #6B7280;
  margin-top: 4px;
`;

const ActiveRescueCard = ({ item }) => {
  return (
    <WalletCard>
      <div className="d-flex align-items-center justify-content-between mb-2">
        <IconPill>
          <FiTruck />
        </IconPill>
        <StatusBadge status={item.status} />
      </div>

      <RouteText>
        <span className="donor">{item.donor}</span>
        <FiArrowRight size={11} className="text-muted" />
        <span className="ngo">{item.ngo}</span>
      </RouteText>

      <QuantityText>{item.foodItem}</QuantityText>
    </WalletCard>
  );
};

export default ActiveRescueCard;
