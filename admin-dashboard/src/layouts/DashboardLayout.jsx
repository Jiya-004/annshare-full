import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiArrowUp } from 'react-icons/fi';
import Sidebar from './Sidebar/index.jsx';
import Topbar from './Topbar';

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  background-color: #F7F8F6;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #12201B;
`;

const MainWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 64px;
  margin-left: ${props => (props.$sidebarCollapsed ? '80px' : '260px')};
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 0;
  width: ${props => (props.$sidebarCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 260px)')};
  max-width: 100%;
  overflow-x: hidden;

  @media (max-width: 992px) {
    margin-left: 0;
    width: 100%;
  }
`;

const ContentBody = styled.main`
  padding: 32px 32px 48px 32px;
  flex-grow: 1;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 18px 12px 36px 12px;
  }
`;

const ScrollTopButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: var(--evergreen, #173F35);
  color: #ffffff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(23, 63, 53, 0.3);
  cursor: pointer;
  z-index: 1030;
  opacity: ${props => (props.$show ? '1' : '0')};
  visibility: ${props => (props.$show ? 'visible' : 'hidden')};
  transform: translateY(${props => (props.$show ? '0' : '12px')});
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: var(--forest, #28624D);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(23, 63, 53, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 576px) {
    bottom: 16px;
    right: 16px;
    width: 38px;
    height: 38px;
  }
`;

const DashboardLayout = ({ children, activeNav = 'Dashboard', setActiveNav }) => {
  // Mobile check helper: on screens <= 992px, start sidebar CLOSED
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 992;
    }
    return false;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Close sidebar on mobile whenever user navigates to a new tab & scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof window !== 'undefined' && window.innerWidth <= 992) {
      setSidebarCollapsed(true);
    }
  }, [activeNav]);

  // Handle window resizing cleanly
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track window scroll position to toggle floating scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  return (
    <LayoutWrapper>
      <Topbar
        toggleSidebar={toggleSidebar}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setActiveNav={setActiveNav}
      />
      <Sidebar
        collapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />
      <MainWrapper $sidebarCollapsed={sidebarCollapsed}>
        <ContentBody>
          {typeof children === 'function' ? children({ searchTerm }) : children}
        </ContentBody>
      </MainWrapper>

      <ScrollTopButton
        $show={showScrollTop}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
      >
        <FiArrowUp size={20} />
      </ScrollTopButton>
    </LayoutWrapper>
  );
};

export default DashboardLayout;
