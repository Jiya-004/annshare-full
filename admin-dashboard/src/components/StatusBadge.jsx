import React from 'react';
import styled from 'styled-components';

const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 20px;
  letter-spacing: 0.2px;
  text-transform: capitalize;

  background-color: ${props => props.$bg};
  color: ${props => props.$color};
`;

const getBadgeConfig = (status = '') => {
  const lower = status.toLowerCase();

  // Green / Completed / Available / Verified / Claimed / Requested
  if (
    lower.includes('verified') ||
    lower.includes('completed') ||
    lower.includes('picked up') ||
    lower.includes('approved') ||
    lower.includes('ready') ||
    lower.includes('claimed') ||
    lower.includes('transit') ||
    lower.includes('assigned') ||
    lower.includes('in progress') ||
    lower.includes('requested')
  ) {
    return {
      bg: '#EEF8F4',
      color: '#185C4A'
    };
  }

  // Pending / Needs Attention / Under Review
  if (
    lower.includes('available') ||
    lower.includes('pending') ||
    lower.includes('under review') ||
    lower.includes('pickup pending')
  ) {
    return {
      bg: '#FFF9ED',
      color: '#92400E'
    };
  }

  // Urgent / Expired / Suspended / Rejected
  if (
    lower.includes('expired') ||
    lower.includes('urgent') ||
    lower.includes('suspended') ||
    lower.includes('rejected')
  ) {
    return {
      bg: '#FFF4F3',
      color: '#991B1B'
    };
  }

  return {
    bg: '#EEF8F4',
    color: '#185C4A'
  };
};

const StatusBadge = ({ status, customLabel, className }) => {
  const config = getBadgeConfig(status);

  return (
    <StyledBadge
      $bg={config.bg}
      $color={config.color}
      className={className}
    >
      {customLabel || status}
    </StyledBadge>
  );
};

export default StatusBadge;
