import React from 'react';
import styled from 'styled-components';
import { Card, Button } from 'react-bootstrap';
import { FiTrendingUp, FiTrendingDown, FiList, FiUserCheck } from 'react-icons/fi';

const StyledCard = styled(Card)`
  border: 1px solid ${props => props.$isImpact ? '#DFF1E9' : '#E6ECE8'};
  border-radius: 14px;
  background: ${props => props.$isImpact ? 'linear-gradient(180deg, #EEF8F4 0%, #ffffff 100%)' : '#ffffff'};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.015);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%;
  padding: 16px 18px;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  }
`;

const IconCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: ${props => props.$isImpact ? '#185C4A' : '#F7F8F6'};
  color: ${props => props.$isImpact ? '#ffffff' : '#185C4A'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  flex-shrink: 0;
`;

const CardLabel = styled.span`
  font-size: 0.68rem;
  font-weight: 700;
  color: ${props => props.$isImpact ? '#185C4A' : '#66736D'};
  text-transform: uppercase;
  letter-spacing: 0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
`;

const StatValue = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.$isImpact ? '#185C4A' : '#12201B'};
  margin: 0;
  letter-spacing: -0.6px;
  line-height: 1;
`;

const TrendBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 7px;
  border-radius: 12px;
  background: ${props => props.$isPositive ? '#EEF8F4' : '#FFF4F3'};
  color: ${props => props.$isPositive ? '#185C4A' : '#991B1B'};
  white-space: nowrap;
  flex-shrink: 0;
`;

const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
`;

const FilledActionBtn = styled(Button)`
  background: #185C4A;
  border: 1px solid #185C4A;
  color: #ffffff;
  font-size: 0.76rem;
  font-weight: 600;
  border-radius: 20px;
  padding: 5px 12px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 0.15s ease;

  &:hover, &:focus {
    background: #12201B;
    border-color: #12201B;
    color: #ffffff;
  }
`;

const OutlinedActionBtn = styled(Button)`
  background: transparent;
  border: 1px solid #E6ECE8;
  color: #12201B;
  font-size: 0.76rem;
  font-weight: 600;
  border-radius: 20px;
  padding: 5px 12px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 0.15s ease;

  &:hover, &:focus {
    background: #F7F8F6;
    border-color: #66736D;
    color: #12201B;
  }
`;

const StatCard = ({ title, value, trend, icon: Icon, isPositive = true, isImpact = false, showActions = false, onActionClick }) => {
  return (
    <StyledCard $isImpact={isImpact}>
      <div className="d-flex align-items-center gap-2 mb-2">
        {Icon && (
          <IconCircle $isImpact={isImpact}>
            <Icon />
          </IconCircle>
        )}
        <CardLabel $isImpact={isImpact} title={title}>{title}</CardLabel>
      </div>

      <div className="d-flex align-items-baseline justify-content-between gap-2 mt-1">
        <StatValue $isImpact={isImpact}>{value}</StatValue>
        {trend && (
          <TrendBadge $isPositive={isPositive}>
            {isPositive ? <FiTrendingUp size={10} /> : <FiTrendingDown size={10} />}
            {trend}
          </TrendBadge>
        )}
      </div>

      {showActions && (
        <ActionsGroup>
          <FilledActionBtn size="sm" onClick={() => onActionClick && onActionClick('Review Listings')}>
            <FiList size={12} />
            Review
          </FilledActionBtn>
          <OutlinedActionBtn size="sm" onClick={() => onActionClick && onActionClick('Assign Volunteer')}>
            <FiUserCheck size={12} />
            Assign
          </OutlinedActionBtn>
        </ActionsGroup>
      )}
    </StyledCard>
  );
};

export default StatCard;
