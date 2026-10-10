import React from 'react';
import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import { FiList, FiUserCheck, FiShield, FiDownload, FiArrowRight } from 'react-icons/fi';

const ActionButton = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 16px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(27, 77, 62, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(27, 77, 62, 0.12);
    border-color: #2ECC71;
    background: linear-gradient(135deg, #ffffff 0%, #f4fbf7 100%);
  }
`;

const IconWrapper = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: ${props => props.$bg || 'rgba(27, 77, 62, 0.1)'};
  color: ${props => props.$color || '#1B4D3E'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
`;

const ContentArea = styled.div`
  margin-left: 14px;
  flex-grow: 1;
`;

const Title = styled.h6`
  margin: 0;
  font-weight: 700;
  font-size: 0.95rem;
  color: #1B4D3E;
`;

const Subtitle = styled.p`
  margin: 2px 0 0 0;
  font-size: 0.76rem;
  color: #6c757d;
`;

const ActionBadge = styled.span`
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 12px;
  background-color: ${props => props.$bg || '#1B4D3E'};
  color: #ffffff;
  margin-right: 8px;
`;

const ArrowIcon = styled(FiArrowRight)`
  color: #a0aec0;
  transition: transform 0.2s ease, color 0.2s ease;

  ${ActionButton}:hover & {
    transform: translateX(4px);
    color: #2ECC71;
  }
`;

const iconMap = {
  'list': FiList,
  'user-check': FiUserCheck,
  'shield': FiShield,
  'download': FiDownload
};

const QuickActionCard = ({ title, subtitle, iconName, badge, badgeBg, onClick }) => {
  const IconComponent = iconMap[iconName] || FiList;

  return (
    <ActionButton onClick={onClick}>
      <div className="d-flex align-items-center">
        <IconWrapper $bg="rgba(27, 77, 62, 0.1)" $color="#1B4D3E">
          <IconComponent />
        </IconWrapper>
        <ContentArea>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </ContentArea>
      </div>
      <div className="d-flex align-items-center">
        {badge && <ActionBadge $bg={badgeBg}>{badge}</ActionBadge>}
        <ArrowIcon size={16} />
      </div>
    </ActionButton>
  );
};

export default QuickActionCard;
