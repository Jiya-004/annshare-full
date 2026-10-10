import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Card, Table, Button, Form, Row, Col, Badge, InputGroup } from 'react-bootstrap';
import {
  FiBookOpen,
  FiHelpCircle,
  FiPlus,
  FiEdit2,
  FiEye,
  FiTrash2,
  FiArrowLeft,
  FiSearch,
  FiSave,
  FiUser,
  FiClock,
  FiImage,
  FiTag,
  FiCheckCircle,
  FiGlobe,
  FiStar,
  FiLayers,
  FiCalendar,
  FiExternalLink,
  FiUploadCloud
} from 'react-icons/fi';

import ConfirmModal from '../../components/modals/ConfirmModal';

import {
  getBlogs,
  saveBlog,
  deleteBlog,
  toggleBlogStatus,
  getFaqs,
  saveFaq,
  deleteFaq,
  toggleFaqStatus,
  getBlogCategories,
  saveBlogCategory,
  toggleBlogCategoryStatus,
  deleteBlogCategory,
  getFaqCategories,
  saveFaqCategory,
  toggleFaqCategoryStatus,
  deleteFaqCategory,
  uploadImage,
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

const NavPillContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const NavPillButton = styled(Button)`
  border-radius: 20px !important;
  font-size: 0.84rem !important;
  font-weight: 600 !important;
  padding: 8px 20px !important;
  color: ${props => (props.$active ? '#ffffff !important' : '#4B5563 !important')};
  background: ${props => (props.$active ? '#185C4A !important' : '#ffffff !important')};
  border: 1px solid ${props => (props.$active ? '#185C4A !important' : '#E5E7EB !important')};
  box-shadow: ${props => (props.$active ? '0 2px 6px rgba(24, 92, 74, 0.2)' : 'none')};
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  transition: all 0.15s ease !important;

  &:hover {
    color: ${props => (props.$active ? '#ffffff !important' : '#185C4A !important')};
    background: ${props => (props.$active ? '#185C4A !important' : '#EEF8F4 !important')};
    border-color: #185C4A !important;
  }
`;

const CardContainer = styled(Card)`
  border: 1px solid #E6ECE8;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  overflow: hidden;
`;

const BannerHeader = styled.div`
  background: #185C4A;
  color: #ffffff;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;

  h4 {
    font-weight: 700;
    font-size: 1.15rem;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

const BannerAddButton = styled(Button)`
  background: #ffffff !important;
  color: #185C4A !important;
  border: none !important;
  border-radius: 20px !important;
  font-weight: 700 !important;
  font-size: 0.82rem !important;
  padding: 7px 18px !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1) !important;
  transition: all 0.15s ease !important;

  &:hover {
    background: #EEF8F4 !important;
    color: #123F33 !important;
    transform: translateY(-1px);
  }
`;

const ControlsRow = styled.div`
  padding: 18px 24px 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  background: #ffffff;
  border-bottom: 1px solid #F0F4F2;
`;

const EntitiesSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.84rem;
  color: #4B5563;
  font-weight: 500;

  select {
    width: 75px;
    height: 36px;
    border-radius: 8px;
    border: 1px solid #D1D5DB;
    font-size: 0.84rem;
    padding: 0 8px;
    background-color: #ffffff;

    &:focus {
      border-color: #185C4A;
      box-shadow: 0 0 0 2px rgba(24, 92, 74, 0.1);
    }
  }
`;

const SearchInputWrapper = styled.div`
  position: relative;
  min-width: 240px;

  .search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #9CA3AF;
    font-size: 0.9rem;
  }

  input {
    padding-left: 36px;
    border-radius: 8px;
    height: 36px;
    font-size: 0.84rem;
    border: 1px solid #D1D5DB;

    &:focus {
      border-color: #185C4A;
      box-shadow: 0 0 0 2px rgba(24, 92, 74, 0.1);
    }
  }
`;

const SideBySideActionGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
`;

const IconActionButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid ${props => props.$borderColor || '#E5E7EB'};
  background: ${props => props.$bgColor || '#ffffff'};
  color: ${props => props.$color || '#4B5563'};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: ${props => props.$hoverBg || '#EEF8F4'};
    color: ${props => props.$hoverColor || '#185C4A'};
    border-color: ${props => props.$hoverBorder || '#185C4A'};
  }
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

const SwitchLabel = styled.span`
  font-size: 0.78rem;
  font-weight: 600;
  color: ${props => (props.$checked ? '#185C4A' : '#6B7280')};
  margin-left: 6px;
`;

const ContentManagement = ({ mode, initialTab = 'Blog Posts' }) => {
  const [blogs, setBlogs] = useState(getBlogs());
  const [faqs, setFaqs] = useState(getFaqs());
  const [blogCats, setBlogCats] = useState(getBlogCategories());
  const [faqCats, setFaqCats] = useState(getFaqCategories());

  const isBlogsMode = mode ? mode === 'blogs' : (!initialTab.startsWith('Faq'));

  // Navigation tab: 'Blog Posts' | 'Blog Category' | 'Faq List' | 'Faq Category'
  const [activeTab, setActiveTab] = useState(() => {
    if (isBlogsMode && (initialTab === 'Faq List' || initialTab === 'Faq Category')) {
      return 'Blog Posts';
    }
    if (!isBlogsMode && (initialTab === 'Blog Posts' || initialTab === 'Blog Category')) {
      return 'Faq List';
    }
    return initialTab;
  });

  useEffect(() => {
    resetAllViews();
    if (isBlogsMode && (initialTab === 'Faq List' || initialTab === 'Faq Category')) {
      setActiveTab('Blog Posts');
    } else if (!isBlogsMode && (initialTab === 'Blog Posts' || initialTab === 'Blog Category')) {
      setActiveTab('Faq List');
    } else {
      setActiveTab(initialTab);
    }
  }, [initialTab, isBlogsMode, mode]);

  // Entities limit & Search
  const [entitiesPerPage, setEntitiesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Standalone Readers View State
  const [viewingBlog, setViewingBlog] = useState(null);
  const [viewingFaq, setViewingFaq] = useState(null);

  // Blog Editor State
  const [editingBlog, setEditingBlog] = useState(null);
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSlug, setBlogSlug] = useState('');
  const [blogCategory, setBlogCategory] = useState('Community Impact');
  const [blogAuthorName, setBlogAuthorName] = useState('Sarah Jenkins');
  const [blogAuthorRole, setBlogAuthorRole] = useState('ANNShare Operations Lead');
  const [blogReadTime, setBlogReadTime] = useState('5 min read');
  const [blogImage, setBlogImage] = useState('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogIsFeatured, setBlogIsFeatured] = useState(false);
  const [blogStatus, setBlogStatus] = useState('Published');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // FAQ Editor State
  const [editingFaq, setEditingFaq] = useState(null);
  const [isAddingFaq, setIsAddingFaq] = useState(false);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');
  const [faqCategory, setFaqCategory] = useState('General');
  const [faqOrder, setFaqOrder] = useState(1);
  const [faqStatus, setFaqStatus] = useState('Active');

  // Category Editor State (Standalone Page)
  const [editingCat, setEditingCat] = useState(null);
  const [isAddingCat, setIsAddingCat] = useState(false);
  const [categoryType, setCategoryType] = useState('blog'); // 'blog' | 'faq'
  const [catName, setCatName] = useState('');
  const [catDescription, setCatDescription] = useState('');
  const [catStatus, setCatStatus] = useState('Active');

  // Confirm Delete Modal State
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { type: 'blog'|'faq'|'blogCat'|'faqCat', item }

  useEffect(() => {
    const unsub = subscribeToAdminService(() => {
      setBlogs(getBlogs());
      setFaqs(getFaqs());
      setBlogCats(getBlogCategories());
      setFaqCats(getFaqCategories());
    });
    return unsub;
  }, []);

  // -------------------------------------------------------------
  // HANDLERS
  // -------------------------------------------------------------
  const resetAllViews = () => {
    setViewingBlog(null);
    setViewingFaq(null);
    setEditingBlog(null);
    setIsAddingBlog(false);
    setEditingFaq(null);
    setIsAddingFaq(false);
    setEditingCat(null);
    setIsAddingCat(false);
  };

  const handleOpenAddBlog = () => {
    resetAllViews();
    setIsAddingBlog(true);
    setBlogTitle('');
    setBlogSlug('');
    setBlogCategory(blogCats[0]?.name || 'Community Impact');
    setBlogAuthorName('Sarah Jenkins');
    setBlogAuthorRole('ANNShare Operations Lead');
    setBlogReadTime('5 min read');
    setBlogImage('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80');
    setBlogExcerpt('');
    setBlogContent('');
    setBlogIsFeatured(false);
    setBlogStatus('Published');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEditBlog = (post) => {
    resetAllViews();
    setEditingBlog(post);
    setBlogTitle(post.title || '');
    setBlogSlug(post.slug || '');
    setBlogCategory(post.category || 'Community Impact');
    setBlogAuthorName(post.authorName || 'Sarah Jenkins');
    setBlogAuthorRole(post.authorRole || 'ANNShare Operations Lead');
    setBlogReadTime(post.readTime || '5 min read');
    setBlogImage(post.image || '');
    setBlogExcerpt(post.excerpt || '');
    setBlogContent(post.content || '');
    setBlogIsFeatured(post.isFeatured || false);
    setBlogStatus(post.status || 'Published');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      const uploadedUrl = await uploadImage(file, file.name);
      if (uploadedUrl) {
        setBlogImage(uploadedUrl);
      }
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveBlogForm = (e) => {
    e.preventDefault();
    if (!blogTitle.trim()) return;

    saveBlog({
      ...(editingBlog ? { id: editingBlog.id } : {}),
      title: blogTitle,
      slug: blogSlug || blogTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      category: blogCategory,
      authorName: blogAuthorName,
      authorRole: blogAuthorRole,
      authorAvatar: blogAuthorName.split(' ').map(n => n[0]).join('').toUpperCase(),
      readTime: blogReadTime,
      image: blogImage,
      excerpt: blogExcerpt,
      content: blogContent,
      isFeatured: blogIsFeatured,
      status: blogStatus
    });

    setEditingBlog(null);
    setIsAddingBlog(false);
  };

  const handleOpenAddFaq = () => {
    resetAllViews();
    setIsAddingFaq(true);
    setFaqQuestion('');
    setFaqAnswer('');
    setFaqCategory(faqCats[0]?.name || 'General');
    setFaqOrder(faqs.length + 1);
    setFaqStatus('Active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEditFaq = (faq) => {
    resetAllViews();
    setEditingFaq(faq);
    setFaqQuestion(faq.question || '');
    setFaqAnswer(faq.answer || '');
    setFaqCategory(faq.category || 'General');
    setFaqOrder(faq.displayOrder || 1);
    setFaqStatus(faq.status || 'Active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveFaqForm = (e) => {
    e.preventDefault();
    if (!faqQuestion.trim()) return;

    saveFaq({
      ...(editingFaq ? { id: editingFaq.id } : {}),
      question: faqQuestion,
      answer: faqAnswer,
      category: faqCategory,
      displayOrder: Number(faqOrder),
      status: faqStatus
    });

    setEditingFaq(null);
    setIsAddingFaq(false);
  };

  // Category Editor Standalone Page Handlers
  const handleOpenAddCategory = (type) => {
    resetAllViews();
    setCategoryType(type);
    setIsAddingCat(true);
    setCatName('');
    setCatDescription('');
    setCatStatus('Active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEditCategory = (type, cat) => {
    resetAllViews();
    setCategoryType(type);
    setEditingCat(cat);
    setCatName(cat.name || '');
    setCatDescription(cat.description || '');
    setCatStatus(cat.status || 'Active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!catName.trim()) return;

    if (categoryType === 'blog') {
      saveBlogCategory({
        ...(editingCat ? { id: editingCat.id } : {}),
        name: catName,
        description: catDescription,
        status: catStatus
      });
    } else {
      saveFaqCategory({
        ...(editingCat ? { id: editingCat.id } : {}),
        name: catName,
        description: catDescription,
        status: catStatus
      });
    }

    setEditingCat(null);
    setIsAddingCat(false);
  };

  const promptDelete = (type, item) => {
    setDeleteTarget({ type, item });
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      if (deleteTarget.type === 'blog') {
        deleteBlog(deleteTarget.item.id);
        if (editingBlog?.id === deleteTarget.item.id) {
          setEditingBlog(null);
          setIsAddingBlog(false);
        }
      } else if (deleteTarget.type === 'faq') {
        deleteFaq(deleteTarget.item.id);
        if (editingFaq?.id === deleteTarget.item.id) {
          setEditingFaq(null);
          setIsAddingFaq(false);
        }
      } else if (deleteTarget.type === 'blogCat') {
        deleteBlogCategory(deleteTarget.item.id);
        if (editingCat?.id === deleteTarget.item.id) {
          setEditingCat(null);
          setIsAddingCat(false);
        }
      } else if (deleteTarget.type === 'faqCat') {
        deleteFaqCategory(deleteTarget.item.id);
        if (editingCat?.id === deleteTarget.item.id) {
          setEditingCat(null);
          setIsAddingCat(false);
        }
      }
      setDeleteTarget(null);
    }
  };

  // Filtered Data Lists
  const filteredBlogs = blogs.filter(b =>
    !searchTerm || b.title.toLowerCase().includes(searchTerm.toLowerCase()) || b.authorName.toLowerCase().includes(searchTerm.toLowerCase()) || b.category.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, entitiesPerPage);

  const filteredBlogCats = blogCats.filter(c =>
    !searchTerm || c.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, entitiesPerPage);

  const filteredFaqs = faqs.filter(f =>
    !searchTerm || f.question.toLowerCase().includes(searchTerm.toLowerCase()) || f.answer.toLowerCase().includes(searchTerm.toLowerCase()) || f.category.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, entitiesPerPage);

  const filteredFaqCats = faqCats.filter(c =>
    !searchTerm || c.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, entitiesPerPage);

  // -------------------------------------------------------------
  // VIEW 1: STANDALONE BLOG READER VIEW (Read-Only Page)
  // -------------------------------------------------------------
  if (viewingBlog) {
    return (
      <Container fluid className="p-0">
        <div className="d-flex align-items-center justify-content-between gap-3 mb-4">
          <BackButton onClick={() => setViewingBlog(null)}>
            <FiArrowLeft size={16} /> Back to Blog List
          </BackButton>
          <div className="d-flex align-items-center gap-2">
            <Badge bg={viewingBlog.status === 'Published' ? 'success' : 'secondary'} style={{ padding: '6px 14px', borderRadius: '12px', fontSize: '0.82rem' }}>
              {viewingBlog.status}
            </Badge>
            <Button
              variant="outline-primary"
              size="sm"
              style={{ borderRadius: '20px', height: '36px', padding: '0 16px', fontWeight: 600, fontSize: '0.82rem' }}
              onClick={() => handleOpenEditBlog(viewingBlog)}
            >
              <FiEdit2 size={14} className="me-1" /> Edit Article
            </Button>
          </div>
        </div>

        <DetailCard>
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <Badge style={{ background: '#EEF8F4', color: '#185C4A', padding: '6px 14px', borderRadius: '14px', fontWeight: 700, fontSize: '0.8rem' }}>
                {viewingBlog.category}
              </Badge>
              {viewingBlog.isFeatured && (
                <Badge style={{ background: '#FEF3C7', color: '#92400E', padding: '6px 12px', borderRadius: '14px', fontSize: '0.78rem' }}>
                  <FiStar className="me-1" /> Featured Post
                </Badge>
              )}
            </div>

            <h1 style={{ fontWeight: 800, color: '#12201B', fontSize: '2rem', lineHeight: '1.3', marginBottom: '16px' }}>
              {viewingBlog.title}
            </h1>

            <div className="d-flex align-items-center gap-3 pb-4 mb-4 border-bottom" style={{ borderColor: '#E6ECE8', fontSize: '0.86rem', color: '#66736D' }}>
              <div className="d-flex align-items-center gap-2">
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#185C4A', color: '#ffffff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
                  {viewingBlog.authorAvatar || 'SJ'}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#12201B' }}>{viewingBlog.authorName}</div>
                  <div style={{ fontSize: '0.76rem', color: '#66736D' }}>{viewingBlog.authorRole}</div>
                </div>
              </div>
              <div className="ms-auto d-flex align-items-center gap-3">
                <span><FiCalendar size={14} className="me-1" /> {viewingBlog.publishedDate}</span>
                <span><FiClock size={14} className="me-1" /> {viewingBlog.readTime}</span>
              </div>
            </div>

            {viewingBlog.image && (
              <img
                src={viewingBlog.image}
                alt={viewingBlog.title}
                style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', borderRadius: '16px', marginBottom: '24px', border: '1px solid #E6ECE8' }}
              />
            )}

            {viewingBlog.excerpt && (
              <div className="p-3 rounded mb-4" style={{ background: '#EEF8F4', borderLeft: '4px solid #185C4A', fontSize: '0.96rem', color: '#12201B', fontStyle: 'italic', lineHeight: '1.6' }}>
                "{viewingBlog.excerpt}"
              </div>
            )}

            <div style={{ fontSize: '0.96rem', lineHeight: '1.8', color: '#374151', whiteSpace: 'pre-line' }}>
              {viewingBlog.content}
            </div>
          </div>
        </DetailCard>
      </Container>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: STANDALONE FAQ READER VIEW (Read-Only Page)
  // -------------------------------------------------------------
  if (viewingFaq) {
    return (
      <Container fluid className="p-0">
        <div className="d-flex align-items-center justify-content-between gap-3 mb-4">
          <BackButton onClick={() => setViewingFaq(null)}>
            <FiArrowLeft size={16} /> Back to FAQ List
          </BackButton>
          <div className="d-flex align-items-center gap-2">
            <Badge bg={viewingFaq.status === 'Active' ? 'success' : 'secondary'} style={{ padding: '6px 14px', borderRadius: '12px', fontSize: '0.82rem' }}>
              {viewingFaq.status}
            </Badge>
            <Button
              variant="outline-primary"
              size="sm"
              style={{ borderRadius: '20px', height: '36px', padding: '0 16px', fontWeight: 600, fontSize: '0.82rem' }}
              onClick={() => handleOpenEditFaq(viewingFaq)}
            >
              <FiEdit2 size={14} className="me-1" /> Edit FAQ
            </Button>
          </div>
        </div>

        <DetailCard style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <Badge style={{ background: '#EEF8F4', color: '#185C4A', padding: '6px 14px', borderRadius: '14px', fontWeight: 700, fontSize: '0.82rem' }}>
              Audience: {viewingFaq.category}
            </Badge>
            <span style={{ fontSize: '0.82rem', color: '#66736D', fontWeight: 600 }}>Display Order Rank #{viewingFaq.displayOrder || 1}</span>
          </div>

          <h3 style={{ fontWeight: 700, color: '#12201B', fontSize: '1.4rem', lineHeight: '1.4', marginBottom: '20px' }}>
            Q: {viewingFaq.question}
          </h3>

          <div style={{ background: '#F7F8F6', padding: '20px', borderRadius: '14px', border: '1px solid #E6ECE8' }}>
            <h6 style={{ fontWeight: 700, color: '#185C4A', fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
              Official Response
            </h6>
            <div style={{ fontSize: '0.95rem', color: '#374151', lineHeight: '1.7', whiteSpace: 'pre-line' }}>
              {viewingFaq.answer}
            </div>
          </div>
        </DetailCard>
      </Container>
    );
  }

  // -------------------------------------------------------------
  // VIEW 3: STANDALONE BLOG EDITOR PAGE VIEW
  // -------------------------------------------------------------
  if (editingBlog || isAddingBlog) {
    return (
      <Container fluid className="p-0">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div className="d-flex align-items-center gap-3">
            <BackButton variant="light" onClick={() => { setEditingBlog(null); setIsAddingBlog(false); }}>
              <FiArrowLeft size={16} /> Back to Blog List
            </BackButton>
            <div>
              <h2 style={{ fontWeight: 700, color: '#12201B', margin: 0, fontSize: '1.4rem' }}>
                {isAddingBlog ? 'Create New Blog Post' : `Edit Article — ${editingBlog?.title}`}
              </h2>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 flex-shrink-0">
            {editingBlog && (
              <Button
                variant="outline-danger"
                size="sm"
                style={{ borderRadius: '20px', height: '38px', padding: '0 16px', fontWeight: 600, fontSize: '0.82rem' }}
                onClick={() => promptDelete('blog', editingBlog)}
              >
                <FiTrash2 size={15} className="me-1" /> Delete Article
              </Button>
            )}
          </div>
        </div>

        <Form onSubmit={handleSaveBlogForm}>
          <Row className="g-4">
            <Col lg={7}>
              <DetailCard>
                <h5 style={{ fontWeight: 700, color: '#12201B', fontSize: '1.15rem', marginBottom: '20px' }} className="d-flex align-items-center gap-2">
                  <FiBookOpen style={{ color: '#185C4A' }} /> Blog Content & Metadata
                </h5>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Article Title</Form.Label>
                  <InputGroup>
                    <StyledInputGroupText><FiBookOpen size={16} /></StyledInputGroupText>
                    <StyledFormInput
                      type="text"
                      placeholder="e.g. How Surplus Food Drives Fight Hunger in Kathmandu..."
                      value={blogTitle}
                      onChange={(e) => {
                        setBlogTitle(e.target.value);
                        if (!editingBlog && !blogSlug) {
                          setBlogSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
                        }
                      }}
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>URL Slug / Permalink</Form.Label>
                  <InputGroup>
                    <StyledInputGroupText><FiGlobe size={16} /></StyledInputGroupText>
                    <StyledFormInput
                      type="text"
                      placeholder="e.g. surplus-food-redistribution-kathmandu"
                      value={blogSlug}
                      onChange={(e) => setBlogSlug(e.target.value)}
                    />
                  </InputGroup>
                </Form.Group>

                <Row className="g-3 mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Category</Form.Label>
                      <Form.Select
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(e.target.value)}
                        style={{ borderRadius: '12px', height: '42px', fontSize: '0.86rem', borderColor: '#E6ECE8' }}
                      >
                        {blogCats.map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Estimated Read Time</Form.Label>
                      <InputGroup>
                        <StyledInputGroupText><FiClock size={16} /></StyledInputGroupText>
                        <StyledFormInput
                          type="text"
                          placeholder="e.g. 5 min read"
                          value={blogReadTime}
                          onChange={(e) => setBlogReadTime(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="g-3 mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Author Name</Form.Label>
                      <InputGroup>
                        <StyledInputGroupText><FiUser size={16} /></StyledInputGroupText>
                        <StyledFormInput
                          type="text"
                          placeholder="e.g. Sarah Jenkins"
                          value={blogAuthorName}
                          onChange={(e) => setBlogAuthorName(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Author Role</Form.Label>
                      <InputGroup>
                        <StyledInputGroupText><FiTag size={16} /></StyledInputGroupText>
                        <StyledFormInput
                          type="text"
                          placeholder="e.g. Operations Lead"
                          value={blogAuthorRole}
                          onChange={(e) => setBlogAuthorRole(e.target.value)}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <div className="d-flex align-items-center justify-content-between mb-1">
                    <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B', margin: 0 }}>
                      Cover Image (Upload File or Enter URL)
                    </Form.Label>
                    <label
                      htmlFor="blog-image-upload-input"
                      style={{
                        fontSize: '0.78rem',
                        color: '#185C4A',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 10px',
                        borderRadius: '8px',
                        background: '#EEF8F4',
                        margin: 0
                      }}
                    >
                      <FiUploadCloud size={14} />
                      {isUploadingImage ? 'Uploading...' : 'Upload Image File'}
                    </label>
                    <input
                      id="blog-image-upload-input"
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageFileUpload}
                      disabled={isUploadingImage}
                    />
                  </div>

                  <InputGroup className="mb-2">
                    <StyledInputGroupText><FiImage size={16} /></StyledInputGroupText>
                    <StyledFormInput
                      type="text"
                      placeholder="https://... or uploaded image path"
                      value={blogImage}
                      onChange={(e) => setBlogImage(e.target.value)}
                    />
                  </InputGroup>

                  {blogImage && (
                    <div style={{ position: 'relative', marginTop: '10px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E6ECE8', maxHeight: '180px', background: '#F9FAF9' }}>
                      <img
                        src={blogImage}
                        alt="Cover Preview"
                        style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <button
                        type="button"
                        onClick={() => setBlogImage('')}
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          background: 'rgba(0,0,0,0.65)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '0.72rem',
                          cursor: 'pointer'
                        }}
                      >
                        Remove Image
                      </button>
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Excerpt / Summary</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Short preview excerpt for blog card grid..."
                    value={blogExcerpt}
                    onChange={(e) => setBlogExcerpt(e.target.value)}
                    style={{ borderRadius: '12px', border: '1px solid #E6ECE8', fontSize: '0.86rem' }}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Full Body Article</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="Write full article body content..."
                    value={blogContent}
                    onChange={(e) => setBlogContent(e.target.value)}
                    style={{ borderRadius: '12px', border: '1px solid #E6ECE8', fontSize: '0.86rem' }}
                  />
                </Form.Group>

                <div className="p-3 rounded mb-4" style={{ background: '#F7F8F6', border: '1px solid #E6ECE8' }}>
                  <Row className="g-3">
                    <Col md={6}>
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <div style={{ fontWeight: 700, color: '#12201B', fontSize: '0.86rem' }}>Featured Article</div>
                          <div style={{ fontSize: '0.76rem', color: '#66736D' }}>Highlight on homepage header</div>
                        </div>
                        <Form.Check
                          type="switch"
                          id="blog-featured-switch"
                          checked={blogIsFeatured}
                          onChange={(e) => setBlogIsFeatured(e.target.checked)}
                          style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                        />
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <div style={{ fontWeight: 700, color: '#12201B', fontSize: '0.86rem' }}>Publish Status</div>
                          <div style={{ fontSize: '0.76rem', color: '#66736D' }}>{blogStatus}</div>
                        </div>
                        <Form.Check
                          type="switch"
                          id="blog-status-switch"
                          checked={blogStatus === 'Published'}
                          onChange={(e) => setBlogStatus(e.target.checked ? 'Published' : 'Draft')}
                          style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>

                <SaveButton type="submit">
                  <FiSave size={16} /> {isAddingBlog ? 'Publish Article' : 'Save Article Changes'}
                </SaveButton>
              </DetailCard>
            </Col>

            {/* Live Preview Column */}
            <Col lg={5}>
              <DetailCard>
                <h5 style={{ fontWeight: 700, color: '#12201B', fontSize: '1.05rem', marginBottom: '16px' }} className="d-flex align-items-center gap-2">
                  <FiExternalLink style={{ color: '#185C4A' }} /> Live Blog Card Preview
                </h5>

                <div className="rounded overflow-hidden mb-3" style={{ border: '1px solid #E6ECE8', background: '#ffffff', boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }}>
                  <img
                    src={blogImage || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80'}
                    alt={blogTitle}
                    style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                  />
                  <div className="p-3">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <Badge bg="success" style={{ background: '#EEF8F4', color: '#185C4A', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                        {blogCategory}
                      </Badge>
                      <span style={{ fontSize: '0.75rem', color: '#66736D' }}>{blogReadTime}</span>
                    </div>

                    <h6 style={{ fontWeight: 700, color: '#12201B', fontSize: '0.98rem', lineHeight: '1.4', marginBottom: '8px' }}>
                      {blogTitle || 'Blog Article Title Preview'}
                    </h6>

                    <p style={{ fontSize: '0.8rem', color: '#66736D', lineHeight: '1.5', marginBottom: '12px' }}>
                      {blogExcerpt || 'Article summary excerpt text preview...'}
                    </p>

                    <div className="d-flex align-items-center justify-content-between pt-2 border-top" style={{ borderColor: '#E6ECE8', fontSize: '0.78rem' }}>
                      <div className="d-flex align-items-center gap-2">
                        <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#EEF8F4', color: '#185C4A', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem' }}>
                          {blogAuthorName ? blogAuthorName.split(' ').map(n=>n[0]).join('') : 'SJ'}
                        </div>
                        <span style={{ fontWeight: 600, color: '#12201B' }}>{blogAuthorName}</span>
                      </div>
                      <span style={{ color: '#66736D' }}>Oct 04, 2026</span>
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.78rem', color: '#66736D' }} className="d-flex align-items-center gap-1">
                  <FiCheckCircle className="text-success" /> Synchronized with ANNShare Public Blog Feed
                </div>
              </DetailCard>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }

  // -------------------------------------------------------------
  // VIEW 4: STANDALONE FAQ EDITOR PAGE VIEW
  // -------------------------------------------------------------
  if (editingFaq || isAddingFaq) {
    return (
      <Container fluid className="p-0">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div className="d-flex align-items-center gap-3">
            <BackButton variant="light" onClick={() => { setEditingFaq(null); setIsAddingFaq(false); }}>
              <FiArrowLeft size={16} /> Back to FAQ List
            </BackButton>
            <div>
              <h2 style={{ fontWeight: 700, color: '#12201B', margin: 0, fontSize: '1.4rem' }}>
                {isAddingFaq ? 'Create New FAQ' : `Edit FAQ — #${editingFaq?.id}`}
              </h2>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 flex-shrink-0">
            {editingFaq && (
              <Button
                variant="outline-danger"
                size="sm"
                style={{ borderRadius: '20px', height: '38px', padding: '0 16px', fontWeight: 600, fontSize: '0.82rem' }}
                onClick={() => promptDelete('faq', editingFaq)}
              >
                <FiTrash2 size={15} className="me-1" /> Delete FAQ
              </Button>
            )}
          </div>
        </div>

        <Form onSubmit={handleSaveFaqForm}>
          <Row className="g-4">
            <Col lg={7}>
              <DetailCard>
                <h5 style={{ fontWeight: 700, color: '#12201B', fontSize: '1.15rem', marginBottom: '20px' }} className="d-flex align-items-center gap-2">
                  <FiHelpCircle style={{ color: '#185C4A' }} /> FAQ Information & Answer
                </h5>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Question</Form.Label>
                  <InputGroup>
                    <StyledInputGroupText><FiHelpCircle size={16} /></StyledInputGroupText>
                    <StyledFormInput
                      type="text"
                      placeholder="e.g. How does ANNShare verify food safety for surplus meals?"
                      value={faqQuestion}
                      onChange={(e) => setFaqQuestion(e.target.value)}
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <Row className="g-3 mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Category / Target Audience</Form.Label>
                      <Form.Select
                        value={faqCategory}
                        onChange={(e) => setFaqCategory(e.target.value)}
                        style={{ borderRadius: '12px', height: '42px', fontSize: '0.86rem', borderColor: '#E6ECE8' }}
                      >
                        {faqCats.map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Display Order Rank</Form.Label>
                      <StyledFormInput
                        type="number"
                        value={faqOrder}
                        onChange={(e) => setFaqOrder(e.target.value)}
                        min={1}
                        style={{ borderLeft: '1px solid #E6ECE8', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px' }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Detailed Answer</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Enter comprehensive response text..."
                    value={faqAnswer}
                    onChange={(e) => setFaqAnswer(e.target.value)}
                    required
                    style={{ borderRadius: '12px', border: '1px solid #E6ECE8', fontSize: '0.86rem' }}
                  />
                </Form.Group>

                <div className="p-3 rounded mb-4" style={{ background: '#F7F8F6', border: '1px solid #E6ECE8' }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <div style={{ fontWeight: 700, color: '#12201B', fontSize: '0.86rem' }}>FAQ Active Status</div>
                      <div style={{ fontSize: '0.76rem', color: '#66736D' }}>{faqStatus}</div>
                    </div>
                    <Form.Check
                      type="switch"
                      id="faq-status-switch"
                      checked={faqStatus === 'Active'}
                      onChange={(e) => setFaqStatus(e.target.checked ? 'Active' : 'Inactive')}
                      style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                    />
                  </div>
                </div>

                <SaveButton type="submit">
                  <FiSave size={16} /> {isAddingFaq ? 'Save FAQ' : 'Update FAQ Changes'}
                </SaveButton>
              </DetailCard>
            </Col>

            <Col lg={5}>
              <DetailCard>
                <h5 style={{ fontWeight: 700, color: '#12201B', fontSize: '1.05rem', marginBottom: '16px' }} className="d-flex align-items-center gap-2">
                  <FiExternalLink style={{ color: '#185C4A' }} /> Live Accordion Preview
                </h5>

                <div className="p-3 rounded mb-3" style={{ background: '#F7F8F6', border: '1px solid #E6ECE8' }}>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <Badge bg="success" style={{ background: '#EEF8F4', color: '#185C4A', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {faqCategory}
                    </Badge>
                    <span style={{ fontSize: '0.75rem', color: '#66736D' }}>Order #{faqOrder}</span>
                  </div>

                  <h6 style={{ fontWeight: 700, color: '#12201B', fontSize: '0.95rem', marginBottom: '8px' }}>
                    Q: {faqQuestion || 'Question Title Preview?'}
                  </h6>

                  <div style={{ fontSize: '0.84rem', color: '#374151', lineHeight: '1.6', background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #E6ECE8' }}>
                    {faqAnswer || 'Answer explanation preview text...'}
                  </div>
                </div>

                <div style={{ fontSize: '0.78rem', color: '#66736D' }} className="d-flex align-items-center gap-1">
                  <FiCheckCircle className="text-success" /> Synchronized with ANNShare Help Center
                </div>
              </DetailCard>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }

  // -------------------------------------------------------------
  // VIEW 5: STANDALONE CATEGORY EDITOR PAGE VIEW
  // -------------------------------------------------------------
  if (editingCat || isAddingCat) {
    const isBlogCat = categoryType === 'blog';
    return (
      <Container fluid className="p-0">
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div className="d-flex align-items-center gap-3">
            <BackButton variant="light" onClick={() => { setEditingCat(null); setIsAddingCat(false); }}>
              <FiArrowLeft size={16} /> Back to {isBlogCat ? 'Blog Categories' : 'FAQ Categories'}
            </BackButton>
            <div>
              <h2 style={{ fontWeight: 700, color: '#12201B', margin: 0, fontSize: '1.4rem' }}>
                {isAddingCat ? `Create New ${isBlogCat ? 'Blog' : 'FAQ'} Category` : `Edit Category — ${editingCat?.name}`}
              </h2>
            </div>
          </div>

          <div className="d-flex align-items-center gap-2 flex-shrink-0">
            {editingCat && (
              <Button
                variant="outline-danger"
                size="sm"
                style={{ borderRadius: '20px', height: '38px', padding: '0 16px', fontWeight: 600, fontSize: '0.82rem' }}
                onClick={() => promptDelete(isBlogCat ? 'blogCat' : 'faqCat', editingCat)}
              >
                <FiTrash2 size={15} className="me-1" /> Delete Category
              </Button>
            )}
          </div>
        </div>

        <Form onSubmit={handleSaveCategory}>
          <Row className="g-4">
            <Col lg={7}>
              <DetailCard>
                <h5 style={{ fontWeight: 700, color: '#12201B', fontSize: '1.15rem', marginBottom: '20px' }} className="d-flex align-items-center gap-2">
                  <FiLayers style={{ color: '#185C4A' }} /> {isBlogCat ? 'Blog Category Configuration' : 'FAQ Category Configuration'}
                </h5>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Category Name</Form.Label>
                  <InputGroup>
                    <StyledInputGroupText><FiLayers size={16} /></StyledInputGroupText>
                    <StyledFormInput
                      type="text"
                      placeholder={isBlogCat ? "e.g. Community Impact, Food Safety..." : "e.g. Food Donors, NGO Receivers..."}
                      value={catName}
                      onChange={(e) => setCatName(e.target.value)}
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#12201B' }}>Category Description (Optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Provide brief context for public portal indexing..."
                    value={catDescription}
                    onChange={(e) => setCatDescription(e.target.value)}
                    style={{ borderRadius: '12px', border: '1px solid #E6ECE8', fontSize: '0.86rem' }}
                  />
                </Form.Group>

                <div className="p-3 rounded mb-4" style={{ background: '#F7F8F6', border: '1px solid #E6ECE8' }}>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <div style={{ fontWeight: 700, color: '#12201B', fontSize: '0.86rem' }}>Category Active Status</div>
                      <div style={{ fontSize: '0.76rem', color: '#66736D' }}>{catStatus}</div>
                    </div>
                    <Form.Check
                      type="switch"
                      id="cat-status-switch"
                      checked={catStatus === 'Active'}
                      onChange={(e) => setCatStatus(e.target.checked ? 'Active' : 'Inactive')}
                      style={{ fontSize: '1.2rem', cursor: 'pointer' }}
                    />
                  </div>
                </div>

                <SaveButton type="submit">
                  <FiSave size={16} /> {isAddingCat ? 'Create Category' : 'Save Category Changes'}
                </SaveButton>
              </DetailCard>
            </Col>

            <Col lg={5}>
              <DetailCard>
                <h5 style={{ fontWeight: 700, color: '#12201B', fontSize: '1.05rem', marginBottom: '16px' }} className="d-flex align-items-center gap-2">
                  <FiExternalLink style={{ color: '#185C4A' }} /> Category Live Badge Preview
                </h5>

                <div className="p-4 rounded mb-3 text-center" style={{ background: '#EEF8F4', border: '1px solid #C2E2D6' }}>
                  <Badge bg="success" style={{ background: '#185C4A', color: '#ffffff', padding: '8px 18px', borderRadius: '16px', fontSize: '0.92rem', fontWeight: 700 }}>
                    {catName || 'Category Name Preview'}
                  </Badge>
                  <div style={{ fontSize: '0.84rem', color: '#185C4A', marginTop: '14px', fontWeight: 600 }}>
                    Status: {catStatus} • {isBlogCat ? 'Public Blog Filter Tag' : 'Help Center Topic Group'}
                  </div>
                  {catDescription && (
                    <p style={{ fontSize: '0.8rem', color: '#4B5563', marginTop: '10px', marginBottom: 0, lineHeight: '1.5' }}>
                      {catDescription}
                    </p>
                  )}
                </div>

                <div style={{ fontSize: '0.78rem', color: '#66736D' }} className="d-flex align-items-center gap-1">
                  <FiCheckCircle className="text-success" /> Live category sync active for ANNShare portal
                </div>
              </DetailCard>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }

  // -------------------------------------------------------------
  // VIEW 6: MAIN DASHBOARD TABLE VIEW (Matches Mockup Structure)
  // -------------------------------------------------------------
  return (
    <Container fluid className="p-0">
      <PageHeader>
        <h2>{isBlogsMode ? 'Blog Manage' : 'Faq Manage'}</h2>
        <p>
          {isBlogsMode
            ? 'Manage public blog articles, stories, and blog categories for ANNShare portal.'
            : 'Manage public FAQs, help center items, and FAQ categories for ANNShare portal.'}
        </p>
      </PageHeader>

      {/* Sub-pills Navigation Bar */}
      <NavPillContainer>
        {isBlogsMode ? (
          <>
            <NavPillButton
              $active={activeTab === 'Blog Posts'}
              onClick={() => { resetAllViews(); setActiveTab('Blog Posts'); setSearchTerm(''); }}
            >
              <FiBookOpen size={16} /> Blog Posts ({blogs.length})
            </NavPillButton>

            <NavPillButton
              $active={activeTab === 'Blog Category'}
              onClick={() => { resetAllViews(); setActiveTab('Blog Category'); setSearchTerm(''); }}
            >
              <FiLayers size={16} /> Blog Category ({blogCats.length})
            </NavPillButton>
          </>
        ) : (
          <>
            <NavPillButton
              $active={activeTab === 'Faq List'}
              onClick={() => { resetAllViews(); setActiveTab('Faq List'); setSearchTerm(''); }}
            >
              <FiHelpCircle size={16} /> Faq List ({faqs.length})
            </NavPillButton>

            <NavPillButton
              $active={activeTab === 'Faq Category'}
              onClick={() => { resetAllViews(); setActiveTab('Faq Category'); setSearchTerm(''); }}
            >
              <FiLayers size={16} /> Faq Category ({faqCats.length})
            </NavPillButton>
          </>
        )}
      </NavPillContainer>

      {/* TAB 1: BLOG POSTS */}
      {activeTab === 'Blog Posts' && (
        <CardContainer>
          <BannerHeader>
            <h4><FiBookOpen size={20} /> Blog List</h4>
            <BannerAddButton onClick={handleOpenAddBlog}>
              <FiPlus size={16} /> Add New
            </BannerAddButton>
          </BannerHeader>

          <ControlsRow>
            <EntitiesSelectWrapper>
              <span>Show</span>
              <select
                value={entitiesPerPage}
                onChange={(e) => setEntitiesPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span>Entities</span>
            </EntitiesSelectWrapper>

            <SearchInputWrapper>
              <FiSearch className="search-icon" />
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchInputWrapper>
          </ControlsRow>

          <div className="table-responsive">
            <Table hover align="middle" className="mb-0" style={{ fontSize: '0.86rem' }}>
              <thead>
                <tr style={{ fontSize: '0.78rem', color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.5px', background: '#FAFAFA' }}>
                  <th style={{ width: '60px', paddingLeft: '24px' }}>#</th>
                  <th>Title</th>
                  <th style={{ width: '150px' }}>Date</th>
                  <th style={{ width: '130px' }}>Status</th>
                  <th style={{ width: '140px', paddingRight: '24px' }} className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map((b, idx) => (
                    <tr key={b.id}>
                      <td style={{ paddingLeft: '24px', fontWeight: 600, color: '#6B7280' }}>
                        {idx + 1}
                      </td>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={b.image}
                            alt={b.title}
                            style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #E5E7EB', flexShrink: 0 }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.88rem', lineHeight: '1.3' }}>
                              {b.title}
                            </div>
                            <div style={{ fontSize: '0.76rem', color: '#6B7280', marginTop: '2px' }}>
                              Category: <span style={{ color: '#185C4A', fontWeight: 600 }}>{b.category}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: '#4B5563', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                        {b.publishedDate || '14 Mar, 2026'}
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Form.Check
                            type="switch"
                            id={`blog-status-switch-${b.id}`}
                            checked={b.status === 'Published'}
                            onChange={() => toggleBlogStatus(b.id)}
                            style={{ cursor: 'pointer', fontSize: '1.05rem' }}
                          />
                          <SwitchLabel $checked={b.status === 'Published'}>
                            {b.status === 'Published' ? 'ON' : 'OFF'}
                          </SwitchLabel>
                        </div>
                      </td>
                      <td style={{ paddingRight: '24px' }} className="text-end">
                        <SideBySideActionGroup>
                          <IconActionButton
                            title="Edit Article"
                            $borderColor="#D1D5DB"
                            $color="#185C4A"
                            $hoverBg="#EEF8F4"
                            $hoverColor="#123F33"
                            onClick={() => handleOpenEditBlog(b)}
                          >
                            <FiEdit2 size={15} />
                          </IconActionButton>

                          <IconActionButton
                            title="View Article"
                            $borderColor="#D1D5DB"
                            $color="#2563EB"
                            $hoverBg="#EFF6FF"
                            $hoverColor="#1D4ED8"
                            onClick={() => setViewingBlog(b)}
                          >
                            <FiEye size={15} />
                          </IconActionButton>

                          <IconActionButton
                            title="Delete Article"
                            $borderColor="#FCA5A5"
                            $bgColor="#FEF2F2"
                            $color="#DC2626"
                            $hoverBg="#FEE2E2"
                            $hoverColor="#991B1B"
                            $hoverBorder="#F87171"
                            onClick={() => promptDelete('blog', b)}
                          >
                            <FiTrash2 size={15} />
                          </IconActionButton>
                        </SideBySideActionGroup>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-muted">
                      No blog articles found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </CardContainer>
      )}

      {/* TAB 2: BLOG CATEGORY */}
      {activeTab === 'Blog Category' && (
        <CardContainer>
          <BannerHeader>
            <h4><FiLayers size={20} /> Blog Category</h4>
            <BannerAddButton onClick={() => handleOpenAddCategory('blog')}>
              <FiPlus size={16} /> Add Category
            </BannerAddButton>
          </BannerHeader>

          <ControlsRow>
            <EntitiesSelectWrapper>
              <span>Show</span>
              <select
                value={entitiesPerPage}
                onChange={(e) => setEntitiesPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>Entities</span>
            </EntitiesSelectWrapper>

            <SearchInputWrapper>
              <FiSearch className="search-icon" />
              <Form.Control
                type="text"
                placeholder="Search Category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchInputWrapper>
          </ControlsRow>

          <div className="table-responsive">
            <Table hover align="middle" className="mb-0" style={{ fontSize: '0.86rem' }}>
              <thead>
                <tr style={{ fontSize: '0.78rem', color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.5px', background: '#FAFAFA' }}>
                  <th style={{ width: '60px', paddingLeft: '24px' }}>#</th>
                  <th>Category Name</th>
                  <th style={{ width: '180px' }}>Created Date</th>
                  <th style={{ width: '130px' }}>Status</th>
                  <th style={{ width: '140px', paddingRight: '24px' }} className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBlogCats.length > 0 ? (
                  filteredBlogCats.map((cat, idx) => (
                    <tr key={cat.id}>
                      <td style={{ paddingLeft: '24px', fontWeight: 600, color: '#6B7280' }}>
                        {idx + 1}
                      </td>
                      <td>
                        <strong style={{ color: '#111827', fontSize: '0.88rem' }}>{cat.name}</strong>
                        <div style={{ fontSize: '0.76rem', color: '#6B7280' }}>
                          {blogs.filter(b => b.category === cat.name).length} Published Articles
                        </div>
                      </td>
                      <td style={{ color: '#4B5563', fontSize: '0.82rem' }}>
                        {cat.createdDate || '14 Mar, 2026'}
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Form.Check
                            type="switch"
                            id={`blog-cat-switch-${cat.id}`}
                            checked={cat.status === 'Active'}
                            onChange={() => toggleBlogCategoryStatus(cat.id)}
                            style={{ cursor: 'pointer', fontSize: '1.05rem' }}
                          />
                          <SwitchLabel $checked={cat.status === 'Active'}>
                            {cat.status === 'Active' ? 'ON' : 'OFF'}
                          </SwitchLabel>
                        </div>
                      </td>
                      <td style={{ paddingRight: '24px' }} className="text-end">
                        <SideBySideActionGroup>
                          <IconActionButton
                            title="Edit Category"
                            $borderColor="#D1D5DB"
                            $color="#185C4A"
                            $hoverBg="#EEF8F4"
                            $hoverColor="#123F33"
                            onClick={() => handleOpenEditCategory('blog', cat)}
                          >
                            <FiEdit2 size={15} />
                          </IconActionButton>

                          <IconActionButton
                            title="Delete Category"
                            $borderColor="#FCA5A5"
                            $bgColor="#FEF2F2"
                            $color="#DC2626"
                            $hoverBg="#FEE2E2"
                            $hoverColor="#991B1B"
                            $hoverBorder="#F87171"
                            onClick={() => promptDelete('blogCat', cat)}
                          >
                            <FiTrash2 size={15} />
                          </IconActionButton>
                        </SideBySideActionGroup>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-muted">
                      No blog categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </CardContainer>
      )}

      {/* TAB 3: FAQ LIST */}
      {activeTab === 'Faq List' && (
        <CardContainer>
          <BannerHeader>
            <h4><FiHelpCircle size={20} /> FAQ List</h4>
            <BannerAddButton onClick={handleOpenAddFaq}>
              <FiPlus size={16} /> Add New
            </BannerAddButton>
          </BannerHeader>

          <ControlsRow>
            <EntitiesSelectWrapper>
              <span>Show</span>
              <select
                value={entitiesPerPage}
                onChange={(e) => setEntitiesPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>Entities</span>
            </EntitiesSelectWrapper>

            <SearchInputWrapper>
              <FiSearch className="search-icon" />
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchInputWrapper>
          </ControlsRow>

          <div className="table-responsive">
            <Table hover align="middle" className="mb-0" style={{ fontSize: '0.86rem' }}>
              <thead>
                <tr style={{ fontSize: '0.78rem', color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.5px', background: '#FAFAFA' }}>
                  <th style={{ width: '60px', paddingLeft: '24px' }}>#</th>
                  <th>Question</th>
                  <th style={{ width: '150px' }}>Category</th>
                  <th style={{ width: '130px' }}>Status</th>
                  <th style={{ width: '140px', paddingRight: '24px' }} className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((f, idx) => (
                    <tr key={f.id}>
                      <td style={{ paddingLeft: '24px', fontWeight: 600, color: '#6B7280' }}>
                        {idx + 1}
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.88rem' }}>
                          {f.question}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: '#6B7280', maxWidth: '420px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginTop: '2px' }}>
                          {f.answer}
                        </div>
                      </td>
                      <td>
                        <Badge bg="success" style={{ background: '#EEF8F4', color: '#185C4A', padding: '4px 10px', borderRadius: '12px', fontSize: '0.76rem', fontWeight: 600 }}>
                          {f.category}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Form.Check
                            type="switch"
                            id={`faq-status-switch-${f.id}`}
                            checked={f.status === 'Active'}
                            onChange={() => toggleFaqStatus(f.id)}
                            style={{ cursor: 'pointer', fontSize: '1.05rem' }}
                          />
                          <SwitchLabel $checked={f.status === 'Active'}>
                            {f.status === 'Active' ? 'ON' : 'OFF'}
                          </SwitchLabel>
                        </div>
                      </td>
                      <td style={{ paddingRight: '24px' }} className="text-end">
                        <SideBySideActionGroup>
                          <IconActionButton
                            title="Edit FAQ"
                            $borderColor="#D1D5DB"
                            $color="#185C4A"
                            $hoverBg="#EEF8F4"
                            $hoverColor="#123F33"
                            onClick={() => handleOpenEditFaq(f)}
                          >
                            <FiEdit2 size={15} />
                          </IconActionButton>

                          <IconActionButton
                            title="View FAQ"
                            $borderColor="#D1D5DB"
                            $color="#2563EB"
                            $hoverBg="#EFF6FF"
                            $hoverColor="#1D4ED8"
                            onClick={() => setViewingFaq(f)}
                          >
                            <FiEye size={15} />
                          </IconActionButton>

                          <IconActionButton
                            title="Delete FAQ"
                            $borderColor="#FCA5A5"
                            $bgColor="#FEF2F2"
                            $color="#DC2626"
                            $hoverBg="#FEE2E2"
                            $hoverColor="#991B1B"
                            $hoverBorder="#F87171"
                            onClick={() => promptDelete('faq', f)}
                          >
                            <FiTrash2 size={15} />
                          </IconActionButton>
                        </SideBySideActionGroup>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-muted">
                      No FAQs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </CardContainer>
      )}

      {/* TAB 4: FAQ CATEGORY */}
      {activeTab === 'Faq Category' && (
        <CardContainer>
          <BannerHeader>
            <h4><FiLayers size={20} /> FAQ Category</h4>
            <BannerAddButton onClick={() => handleOpenAddCategory('faq')}>
              <FiPlus size={16} /> Add Category
            </BannerAddButton>
          </BannerHeader>

          <ControlsRow>
            <EntitiesSelectWrapper>
              <span>Show</span>
              <select
                value={entitiesPerPage}
                onChange={(e) => setEntitiesPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>Entities</span>
            </EntitiesSelectWrapper>

            <SearchInputWrapper>
              <FiSearch className="search-icon" />
              <Form.Control
                type="text"
                placeholder="Search Category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchInputWrapper>
          </ControlsRow>

          <div className="table-responsive">
            <Table hover align="middle" className="mb-0" style={{ fontSize: '0.86rem' }}>
              <thead>
                <tr style={{ fontSize: '0.78rem', color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.5px', background: '#FAFAFA' }}>
                  <th style={{ width: '60px', paddingLeft: '24px' }}>#</th>
                  <th>Category Name</th>
                  <th style={{ width: '180px' }}>Created Date</th>
                  <th style={{ width: '130px' }}>Status</th>
                  <th style={{ width: '140px', paddingRight: '24px' }} className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredFaqCats.length > 0 ? (
                  filteredFaqCats.map((cat, idx) => (
                    <tr key={cat.id}>
                      <td style={{ paddingLeft: '24px', fontWeight: 600, color: '#6B7280' }}>
                        {idx + 1}
                      </td>
                      <td>
                        <strong style={{ color: '#111827', fontSize: '0.88rem' }}>{cat.name}</strong>
                        <div style={{ fontSize: '0.76rem', color: '#6B7280' }}>
                          {faqs.filter(f => f.category === cat.name).length} FAQs Enrolled
                        </div>
                      </td>
                      <td style={{ color: '#4B5563', fontSize: '0.82rem' }}>
                        {cat.createdDate || '10 Jan, 2026'}
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <Form.Check
                            type="switch"
                            id={`faq-cat-switch-${cat.id}`}
                            checked={cat.status === 'Active'}
                            onChange={() => toggleFaqCategoryStatus(cat.id)}
                            style={{ cursor: 'pointer', fontSize: '1.05rem' }}
                          />
                          <SwitchLabel $checked={cat.status === 'Active'}>
                            {cat.status === 'Active' ? 'ON' : 'OFF'}
                          </SwitchLabel>
                        </div>
                      </td>
                      <td style={{ paddingRight: '24px' }} className="text-end">
                        <SideBySideActionGroup>
                          <IconActionButton
                            title="Edit Category"
                            $borderColor="#D1D5DB"
                            $color="#185C4A"
                            $hoverBg="#EEF8F4"
                            $hoverColor="#123F33"
                            onClick={() => handleOpenEditCategory('faq', cat)}
                          >
                            <FiEdit2 size={15} />
                          </IconActionButton>

                          <IconActionButton
                            title="Delete Category"
                            $borderColor="#FCA5A5"
                            $bgColor="#FEF2F2"
                            $color="#DC2626"
                            $hoverBg="#FEE2E2"
                            $hoverColor="#991B1B"
                            $hoverBorder="#F87171"
                            onClick={() => promptDelete('faqCat', cat)}
                          >
                            <FiTrash2 size={15} />
                          </IconActionButton>
                        </SideBySideActionGroup>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-muted">
                      No FAQ categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </CardContainer>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        title={
          deleteTarget?.type === 'blog' ? 'Delete Blog Article' :
          deleteTarget?.type === 'faq' ? 'Delete FAQ Item' : 'Delete Category'
        }
        message={`Are you sure you want to delete ${
          deleteTarget?.type === 'blog' ? `article "${deleteTarget?.item?.title}"` :
          deleteTarget?.type === 'faq' ? `FAQ "${deleteTarget?.item?.question}"` :
          `category "${deleteTarget?.item?.name}"`
        }?`}
        confirmText="Delete Content"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
};

export default ContentManagement;
