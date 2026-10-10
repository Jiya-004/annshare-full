import React from 'react';
import styled from 'styled-components';
import { Dropdown } from 'react-bootstrap';
import { FiMoreVertical, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import StatusBadge from './StatusBadge';

const StyledTr = styled.tr`
  &:hover {
    background-color: #F9FAFB;
  }

  td {
    padding: 14px 16px;
    vertical-align: middle;
    font-size: 0.86rem;
    color: #374151;
    border-bottom: 1px solid #F3F4F6;
  }
`;

const ActivityCell = styled.div`
  display: flex;
  flex-direction: column;

  span.title {
    font-weight: 600;
    color: #111827;
    font-size: 0.86rem;
  }

  span.partner {
    font-size: 0.76rem;
    color: #6B7280;
    margin-top: 2px;
  }
`;

const ActionToggle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #9CA3AF;
  transition: all 0.15s ease;

  &:hover {
    background: #F3F4F6;
    color: #111827;
  }
`;

const TableRow = ({ item, onAction }) => {
  return (
    <StyledTr>
      <td>
        <ActivityCell>
          <span className="title">{item.activity}</span>
          <span className="partner">{item.partner}</span>
        </ActivityCell>
      </td>
      <td style={{ color: '#6B7280', fontSize: '0.82rem' }}>
        {item.date}
      </td>
      <td>
        <StatusBadge status={item.status} />
      </td>
      <td className="text-end">
        <Dropdown align="end">
          <Dropdown.Toggle as={ActionToggle}>
            <FiMoreVertical size={15} />
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ fontSize: '0.82rem', borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }}>
            <Dropdown.Item onClick={() => onAction && onAction('view', item)}>
              <FiEye className="me-2 text-secondary" /> View Details
            </Dropdown.Item>
            <Dropdown.Item onClick={() => onAction && onAction('edit', item)}>
              <FiEdit2 className="me-2 text-secondary" /> Edit Record
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => onAction && onAction('delete', item)} className="text-danger">
              <FiTrash2 className="me-2" /> Archive
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </StyledTr>
  );
};

export default TableRow;
