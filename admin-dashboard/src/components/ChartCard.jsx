import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Dropdown } from 'react-bootstrap';
import { FiCalendar, FiChevronDown } from 'react-icons/fi';
import { monthlyChartData } from '../data/chartData';

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
  margin-bottom: 24px;
`;

const HeaderTitle = styled.div`
  h5 {
    margin: 0;
    font-weight: 700;
    color: #111827;
    font-size: 1.05rem;
  }

  p {
    margin: 2px 0 0 0;
    color: #6B7280;
    font-size: 0.78rem;
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.76rem;
  color: #6B7280;
  font-weight: 500;

  span.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #2ECC71;
  }
`;

const BarsWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 200px;
  gap: 10px;
  padding-top: 20px;
  border-bottom: 1px dashed #E5E7EB;
  position: relative;
`;

const BarColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
  position: relative;
  cursor: pointer;

  &:hover .tooltip-box {
    opacity: 1;
    visibility: visible;
    transform: translateY(-6px);
  }

  &:hover .bar-fill {
    background: linear-gradient(180deg, #2ECC71 0%, rgba(46, 204, 113, 0.25) 100%);
  }
`;

const BarFill = styled.div`
  width: 100%;
  max-width: 24px;
  height: ${props => props.$height}%;
  background: ${props => props.$isPeak
    ? 'linear-gradient(180deg, #2ECC71 0%, rgba(46, 204, 113, 0.25) 100%)'
    : 'linear-gradient(180deg, #A8E6CF 0%, rgba(227, 245, 234, 0.15) 100%)'};
  border-radius: 6px 6px 2px 2px;
  transition: all 0.25s ease;
`;

const MonthLabel = styled.span`
  margin-top: 10px;
  font-size: 0.74rem;
  font-weight: 500;
  color: ${props => props.$active ? '#111827' : '#9CA3AF'};
`;

const TooltipBox = styled.div`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: #111827;
  color: #ffffff;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: all 0.15s ease;
  z-index: 10;
`;

const ChartCard = () => {
  const [timeframe, setTimeframe] = useState('2026');
  const maxVal = Math.max(...monthlyChartData.map(d => d.meals));

  return (
    <StyledCard>
      <CardHeader>
        <HeaderTitle>
          <h5>Meals Rescued Overview</h5>
          <p>Monthly rescued meals distribution</p>
        </HeaderTitle>

        <div className="d-flex align-items-center gap-3">
          <LegendItem>
            <span className="dot" />
            <span>Meals Rescued</span>
          </LegendItem>

          <Dropdown>
            <Dropdown.Toggle
              size="sm"
              variant="light"
              style={{
                borderRadius: '8px',
                border: '1px solid #E5E7EB',
                background: '#ffffff',
                color: '#374151',
                fontSize: '0.78rem',
                fontWeight: 500,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <FiCalendar size={13} className="text-secondary" />
              {timeframe}
              <FiChevronDown size={13} className="text-secondary ms-1" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" style={{ fontSize: '0.8rem' }}>
              <Dropdown.Item onClick={() => setTimeframe('2026')}>2026</Dropdown.Item>
              <Dropdown.Item onClick={() => setTimeframe('2025')}>2025</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </CardHeader>

      <BarsWrapper>
        {monthlyChartData.map((item, index) => {
          const heightPercent = Math.round((item.meals / maxVal) * 85);
          const isPeak = item.meals === maxVal;

          return (
            <BarColumn key={index}>
              <TooltipBox className="tooltip-box">
                {item.meals.toLocaleString()} meals
              </TooltipBox>
              <BarFill
                className="bar-fill"
                $height={heightPercent}
                $isPeak={isPeak}
              />
              <MonthLabel $active={isPeak}>{item.month}</MonthLabel>
            </BarColumn>
          );
        })}
      </BarsWrapper>
    </StyledCard>
  );
};

export default ChartCard;
