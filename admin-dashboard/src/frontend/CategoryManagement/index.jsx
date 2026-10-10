import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Card, Table, Button, Form, Row, Col, Dropdown, Badge, InputGroup } from 'react-bootstrap';
import {
  FiPlus,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiArrowLeft,
  FiGrid,
  FiSave,
  FiPackage,
  FiCheckCircle,
  FiAlertCircle,
  FiTag,
  FiAlignLeft
} from 'react-icons/fi';

import CategoryIcon from '../../components/CategoryIcon';
import ConfirmModal from '../../components/modals/ConfirmModal';

import {
  getCategories,
  saveCategory,
  toggleCategoryStatus,
  deleteCategory,
  subscribeToAdminService
} from '../../services/adminService';

// Styled Components
const PageHeader = styled.div`
  margin-bottom: 24px;

  h2 {
    font-weight: 600;
    color: #12201B;
    margin: 0;
    font-size: 1.55rem;
    letter-spacing: -0.5px;
  }

  p {
    margin: 3px 0 0 0;
    color: #66736D;
    font-size: 0.86rem;
  }
`;

const MainCard = styled(Card)`
  border: 1px solid #E6ECE8;
  border-radius: 16px;
  background: #ffffff;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.015);
`;

const DetailCard = styled(Card)`
  border: 1px solid #E6ECE8;
  border-radius: 16px;
  background: #ffffff;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.015);
  margin-bottom: 20px;
`;

const BackButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.84rem;
  padding: 6px 16px;
  border: 1px solid #E6ECE8;
  background: #ffffff;
  color: #12201B;
  transition: all 0.15s ease;

  &:hover {
    background: #EEF8F4;
    border-color: #185C4A;
    color: #185C4A;
  }
`;

const ActionIconButton = styled.div`
  cursor: pointer;
  padding: 6px 10px;
  color: #66736D;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;

  &::after {
    display: none !important;
  }

  &:hover {
    background: #EEF8F4;
    color: #185C4A;
  }
`;

const StyledDropdownMenu = styled(Dropdown.Menu)`
  font-size: 0.84rem !important;
  border-radius: 14px !important;
  border: 1px solid rgba(23, 63, 53, 0.12) !important;
  box-shadow: 0 10px 30px rgba(23, 63, 53, 0.12) !important;
  padding: 8px !important;
  min-width: 200px !important;
  background: #ffffff !important;
  z-index: 1050 !important;

  .dropdown-divider {
    margin: 6px 0 !important;
    border-color: rgba(23, 63, 53, 0.08) !important;
  }
`;

const StyledDropdownItem = styled(Dropdown.Item)`
  display: flex !important;
  align-items: center !important;
  padding: 9px 12px !important;
  border-radius: 8px !important;
  font-weight: 500 !important;
  font-size: 0.84rem !important;
  color: ${props => (props.$variant === 'danger' ? '#991B1B' : '#12201B')} !important;
  transition: all 0.15s ease !important;
  margin-bottom: 2px !important;

  &:hover {
    background: ${props => (props.$variant === 'danger' ? '#FEF2F2' : '#EEF8F4')} !important;
    color: ${props => (props.$variant === 'danger' ? '#991B1B' : '#185C4A')} !important;
  }
`;

const StyledInputGroupText = styled(InputGroup.Text)`
  background: #F7F8F6;
  border: 1px solid #E6ECE8;
  border-right: none;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  color: #66736D;
`;

const StyledFormInput = styled(Form.Control)`
  border: 1px solid #E6ECE8;
  border-left: none;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  height: 42px;
  font-size: 0.86rem;
  background: #ffffff;
  color: #12201B;
  transition: all 0.15s ease;

  &:focus {
    background: #ffffff;
    border-color: #185C4A;
    box-shadow: 0 0 0 3px rgba(24, 92, 74, 0.08);
  }
`;

const SaveButton = styled(Button)`
  background: #185C4A;
  border-color: #185C4A;
  border-radius: 20px;
  padding: 8px 24px;
  font-weight: 600;
  font-size: 0.86rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.15s ease;

  &:hover, &:focus, &:active {
    background: #123F33 !important;
    border-color: #123F33 !important;
    box-shadow: 0 4px 12px rgba(24, 92, 74, 0.2);
  }
`;

const CategoryManagement = () => {
  const [categories, setCategories] = useState(getCategories());
  const [editingCategory, setEditingCategory] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form states for standalone page
  const [formName, setFormName] = useState('');
  const [formIcon, setFormIcon] = useState('cooked');
  const [formDescription, setFormDescription] = useState('');
  const [formStatus, setFormStatus] = useState('Active');

  const [selectedForDelete, setSelectedForDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const unsub = subscribeToAdminService(() => {
      const updated = getCategories();
      setCategories(updated);
      if (editingCategory) {
        const current = updated.find(c => c.id === editingCategory.id);
        if (current) {
          setEditingCategory(current);
        }
      }
    });
    return unsub;
  }, [editingCategory]);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setIsAdding(true);
    setFormName('');
    setFormIcon('cooked');
    setFormDescription('');
    setFormStatus('Active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEdit = (cat) => {
    setIsAdding(false);
    setEditingCategory(cat);
    setFormName(cat.name || '');
    setFormIcon(cat.icon || 'cooked');
    setFormDescription(cat.description || '');
    setFormStatus(cat.status || 'Active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveForm = (e) => {
    e.preventDefault();
    if (!formName.trim()) return;

    saveCategory({
      ...(editingCategory ? { id: editingCategory.id } : {}),
      name: formName,
      icon: formIcon,
      description: formDescription,
      status: formStatus
    });

    setEditingCategory(null);
    setIsAdding(false);
  };

  const promptDelete = (cat) => {
    setSelectedForDelete(cat);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedForDelete) {
      deleteCategory(selectedForDelete.id);
      if (editingCategory && editingCategory.id === selectedForDelete.id) {
        setEditingCategory(null);
        setIsAdding(false);
      }
      setSelectedForDelete(null);
    }
  };

  // -------------------------------------------------------------
  // VIEW 1: STANDALONE CATEGORY EDIT / CREATE PAGE VIEW
  // -------------------------------------------------------------
  if (editingCategory || isAdding) {
    return (
      <Container fluid className="p-0">
        {/* Page Header Bar */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div className="d-flex align-items-center gap-3">
            <BackButton variant="light" onClick={() => { setEditingCategory(null); setIsAdding(false); }}>
              <FiArrowLeft size={16} /> Back to Categories List
            </BackButton>
            <div>
              <h2 style={{ fontWeight: 700, color: '#12201B', margin: 0, fontSize: '1.4rem' }} className="d-flex align-items-center gap-2">
                {isAdding ? 'Create New Food Category' : `Edit Category — ${editingCategory?.name}`}
                {editingCategory && (
                  <span style={{ fontSize: '0.86rem', color: '#66736D', fontWeight: 500 }}>#{editingCategory.id}</span>
                )}
              </h2>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 flex-shrink-0">
            {editingCategory && (
              <Button
                variant="outline-danger"
                size="sm"
                style={{
                  borderRadius: '20px',
                  height: '38px',
                  padding: '0 16px',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                onClick={() => promptDelete(editingCategory)}
              >
                <FiTrash2 size={15} /> Delete Category
              </Button>
            )}
          </div>
        </div>

        <Form onSubmit={handleSaveForm}>
          <Row className="g-4">
            {/* Left Column: Category Form Details */}
            <Col lg={7}>
              <DetailCard>
                <h5 style={{ fontWeight: 700, color: '#12201B', fontSize: '1.15rem', marginBottom: '20px' }} className="d-flex align-items-center gap-2">
                  <FiGrid style={{ color: '#185C4A' }} /> Category Configuration
                </h5>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Category Name</Form.Label>
                  <InputGroup>
                    <StyledInputGroupText><FiTag size={16} /></StyledInputGroupText>
                    <StyledFormInput
                      type="text"
                      placeholder="e.g. Prepared Meals, Bakery & Bread..."
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Category Icon Type</Form.Label>
                  <Form.Select
                    value={formIcon}
                    onChange={(e) => setFormIcon(e.target.value)}
                    style={{ borderRadius: '12px', height: '42px', fontSize: '0.86rem', borderColor: '#E6ECE8', background: '#ffffff' }}
                  >
                    <option value="cooked">Cooked / Hot Meals Icon</option>
                    <option value="bakery">Bakery & Bread Icon</option>
                    <option value="fruits">Fresh Fruits Icon</option>
                    <option value="vegetables">Fresh Vegetables Leaf Icon</option>
                    <option value="packaged">Packaged Sealed Goods Icon</option>
                    <option value="dairy">Dairy & Pantry Staples Icon</option>
                    <option value="other">Other Surplus Items Icon</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Description & Surplus Guidance</Form.Label>
                  <InputGroup>
                    <StyledInputGroupText><FiAlignLeft size={16} /></StyledInputGroupText>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Describe the types of surplus food items accepted under this category..."
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      style={{
                        border: '1px solid #E6ECE8',
                        borderLeft: 'none',
                        borderTopRightRadius: '12px',
                        borderBottomRightRadius: '12px',
                        fontSize: '0.86rem'
                      }}
                    />
                  </InputGroup>
                </Form.Group>

                {/* Status Radio / Switch Toggle */}
                <div className="p-3 rounded mb-4" style={{ background: '#F7F8F6', border: '1px solid #E6ECE8' }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <div style={{ fontWeight: 700, color: '#12201B', fontSize: '0.9rem' }}>
                        Category Status ({formStatus})
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#66736D', marginTop: '2px' }}>
                        Active categories are available for donor surplus listings.
                      </div>
                    </div>
                    <Form.Check
                      type="switch"
                      id="category-form-status-switch"
                      checked={formStatus === 'Active'}
                      onChange={(e) => setFormStatus(e.target.checked ? 'Active' : 'Inactive')}
                      style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                    />
                  </div>
                </div>

                <SaveButton type="submit">
                  <FiSave size={16} /> {isAdding ? 'Create Category' : 'Save Changes'}
                </SaveButton>
              </DetailCard>
            </Col>

            {/* Right Column: Visual Preview Card */}
            <Col lg={5}>
              <DetailCard style={{ background: '#ffffff' }}>
                <h5 style={{ fontWeight: 700, color: '#12201B', fontSize: '1.05rem', marginBottom: '16px' }}>
                  Live Category Badge Preview
                </h5>

                <div className="p-4 rounded text-center mb-3" style={{ background: '#F7F8F6', border: '1px dashed #C8D6CE' }}>
                  <div className="d-flex justify-content-center mb-2">
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#EEF8F4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#185C4A' }}>
                      <CategoryIcon icon={formIcon} size={24} />
                    </div>
                  </div>
                  <h6 style={{ fontWeight: 700, color: '#12201B', marginBottom: '4px' }}>
                    {formName || 'Category Title'}
                  </h6>
                  <p style={{ fontSize: '0.8rem', color: '#66736D', margin: '0 0 12px 0' }}>
                    {formDescription || 'Surplus item description preview...'}
                  </p>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, padding: '4px 12px', borderRadius: '20px', background: formStatus === 'Active' ? '#EEF8F4' : '#F3F4F6', color: formStatus === 'Active' ? '#185C4A' : '#6B7280' }}>
                    {formStatus === 'Active' ? 'Active Category' : 'Inactive Category'}
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#66736D', lineHeight: '1.6' }}>
                  <FiCheckCircle className="me-1 text-success" /> Changes will take effect immediately across all donor food upload forms.
                </div>
              </DetailCard>
            </Col>
          </Row>
        </Form>

        <ConfirmModal
          show={showConfirmModal}
          onHide={() => setShowConfirmModal(false)}
          title="Delete Food Category"
          message={`Are you sure you want to delete category "${selectedForDelete?.name}"?`}
          confirmText="Delete Category"
          confirmVariant="danger"
          onConfirm={handleConfirmDelete}
        />
      </Container>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: MAIN FOOD CATEGORIES TABLE VIEW
  // -------------------------------------------------------------
  return (
    <Container fluid className="p-0">
      <PageHeader className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h2>Food Category Management</h2>
          <p>Configure allowed surplus food categories and metadata across donor networks.</p>
        </div>

        <SaveButton onClick={handleOpenAdd}>
          <FiPlus size={16} /> Add New Category
        </SaveButton>
      </PageHeader>

      <MainCard>
        <div className="table-responsive">
          <Table hover align="middle" className="mb-0" style={{ fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ fontSize: '0.74rem', color: '#66736D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Category</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Description</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Items Donated</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }}>Status</th>
                <th style={{ background: 'transparent', borderBottom: '1px solid #E6ECE8' }} className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(cat => (
                <tr key={cat.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#EEF8F4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#185C4A', flexShrink: 0 }}>
                        <CategoryIcon icon={cat.icon} size={18} />
                      </div>
                      <strong style={{ color: '#12201B' }}>{cat.name}</strong>
                    </div>
                  </td>
                  <td style={{ color: '#66736D' }}>{cat.description}</td>
                  <td>
                    <strong style={{ color: '#12201B' }}>{cat.itemCount} listings</strong>
                  </td>
                  <td>
                    {/* Status Radio / Switch Toggle Button */}
                    <div className="d-flex align-items-center gap-2">
                      <Form.Check
                        type="switch"
                        id={`cat-status-switch-${cat.id}`}
                        checked={cat.status === 'Active'}
                        onChange={() => toggleCategoryStatus(cat.id)}
                        style={{ cursor: 'pointer', fontSize: '1.1rem' }}
                      />
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: cat.status === 'Active' ? '#065F46' : '#9CA3AF' }}>
                        {cat.status === 'Active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </td>
                  <td className="text-end">
                    <Dropdown align="end">
                      <Dropdown.Toggle as={ActionIconButton}>
                        <FiMoreVertical size={16} />
                      </Dropdown.Toggle>
                      <StyledDropdownMenu>
                        <StyledDropdownItem onClick={() => handleOpenEdit(cat)}>
                          <FiEdit2 className="me-2 text-primary" size={15} /> Edit Category
                        </StyledDropdownItem>
                        <Dropdown.Divider />
                        <StyledDropdownItem onClick={() => promptDelete(cat)} $variant="danger">
                          <FiTrash2 className="me-2" size={15} /> Delete Category
                        </StyledDropdownItem>
                      </StyledDropdownMenu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </MainCard>

      <ConfirmModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        title="Delete Food Category"
        message={`Are you sure you want to delete category "${selectedForDelete?.name}"?`}
        confirmText="Delete Category"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
};

export default CategoryManagement;
