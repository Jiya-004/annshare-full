import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FiGrid } from 'react-icons/fi';

const CategoryFormModal = ({ show, onHide, category, onSave }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('cooked');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name || '');
      setIcon(category.icon || 'cooked');
      setDescription(category.description || '');
    } else {
      setName('');
      setIcon('cooked');
      setDescription('');
    }
  }, [category, show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      ...(category ? { id: category.id } : {}),
      name,
      icon,
      description
    });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered style={{ borderRadius: '16px' }}>
      <Modal.Header closeButton style={{ borderBottom: '1px solid #E5E7EB', padding: '20px 24px' }}>
        <Modal.Title style={{ color: '#111827', fontWeight: 700, fontSize: '1.15rem' }} className="d-flex align-items-center gap-2">
          <FiGrid style={{ color: '#1B4D3E' }} />
          {category ? 'Edit Food Category' : 'Add New Category'}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body style={{ padding: '24px' }}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: '0.84rem', fontWeight: 600 }}>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Cooked Food, Bakery..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ fontSize: '0.88rem' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: '0.84rem', fontWeight: 600 }}>Category Icon</Form.Label>
            <Form.Select
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              style={{ fontSize: '0.88rem' }}
            >
              <option value="cooked">Cooked Food (Hot Meal Icon)</option>
              <option value="bakery">Bakery (Gift/Box Icon)</option>
              <option value="fruits">Fruits (Fruit/Sun Icon)</option>
              <option value="vegetables">Vegetables (Fresh Leaf Icon)</option>
              <option value="packaged">Packaged Food (Sealed Box Icon)</option>
              <option value="dairy">Dairy (Milk Droplet Icon)</option>
              <option value="other">Other (Grid Icon)</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: '0.84rem', fontWeight: 600 }}>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Brief description of food types in this category..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ fontSize: '0.88rem' }}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer style={{ borderTop: '1px solid #E5E7EB', padding: '16px 24px' }}>
          <Button type="submit" variant="success" size="sm" style={{ background: '#1B4D3E', borderColor: '#1B4D3E' }}>
            {category ? 'Save Changes' : 'Create Category'}
          </Button>
          <Button variant="secondary" size="sm" onClick={onHide}>
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CategoryFormModal;
