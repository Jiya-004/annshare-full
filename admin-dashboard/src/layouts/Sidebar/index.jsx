import React from 'react';
import {
  FiGrid,
  FiUsers,
  FiPackage,
  FiFileText,
  FiLayers,
  FiBarChart2,
  FiMessageSquare,
  FiSettings,
  FiBookOpen,
  FiHelpCircle,
  FiX
} from 'react-icons/fi';
import {
  SidebarOverlay,
  SidebarContainer,
  MobileSidebarHeader,
  NavBody,
  SectionHeader,
  NavItem
} from './styles';

const Sidebar = ({ collapsed, toggleSidebar, activeNav = 'Dashboard', setActiveNav }) => {
  const mainMenu = [
    { name: 'Dashboard', icon: FiGrid },
    { name: 'Users', icon: FiUsers },
    { name: 'Donations', icon: FiPackage },
    { name: 'Food Requests', icon: FiFileText },
    { name: 'Categories', icon: FiLayers }
  ];

  const analyticsMenu = [
    { name: 'Reports', icon: FiBarChart2 },
    { name: 'Feedback / Complaints', icon: FiMessageSquare }
  ];

  const contentMenu = [
    { name: 'Blog Manage', icon: FiBookOpen },
    { name: 'Faq Manage', icon: FiHelpCircle }
  ];

  const systemMenu = [
    { name: 'Settings', icon: FiSettings }
  ];

  const handleNavClick = (name) => {
    if (setActiveNav) {
      setActiveNav(name);
    }
    if (window.innerWidth <= 992 && toggleSidebar && !collapsed) {
      toggleSidebar();
    }
  };

  return (
    <>
      <SidebarOverlay $collapsed={collapsed} onClick={toggleSidebar} />
      <SidebarContainer $collapsed={collapsed}>
        <MobileSidebarHeader>
          <div className="mobile-brand">
            <img src="/logo/logo.png" alt="ANNShare" />
            <span>ANNShare Admin</span>
          </div>
          <button
            type="button"
            className="close-btn"
            onClick={toggleSidebar}
            title="Close Sidebar"
            aria-label="Close Sidebar"
          >
            <FiX size={18} />
          </button>
        </MobileSidebarHeader>
        <NavBody>
          <SectionHeader $collapsed={collapsed}>MAIN MENU</SectionHeader>
          {mainMenu.map(item => {
            const Icon = item.icon;
            return (
              <NavItem
                key={item.name}
                $active={activeNav === item.name}
                $collapsed={collapsed}
                onClick={() => handleNavClick(item.name)}
              >
                <Icon className="nav-icon" />
                <span className="nav-text">{item.name}</span>
              </NavItem>
            );
          })}

          <SectionHeader $collapsed={collapsed}>ANALYTICS & FEEDBACK</SectionHeader>
          {analyticsMenu.map(item => {
            const Icon = item.icon;
            return (
              <NavItem
                key={item.name}
                $active={activeNav === item.name}
                $collapsed={collapsed}
                onClick={() => handleNavClick(item.name)}
              >
                <Icon className="nav-icon" />
                <span className="nav-text">{item.name}</span>
              </NavItem>
            );
          })}

          <SectionHeader $collapsed={collapsed}>CONTENT MANAGE</SectionHeader>
          {contentMenu.map(item => {
            const Icon = item.icon;
            return (
              <NavItem
                key={item.name}
                $active={activeNav === item.name || (item.name === 'Blog Manage' && activeNav === 'Content Management')}
                $collapsed={collapsed}
                onClick={() => handleNavClick(item.name)}
              >
                <Icon className="nav-icon" />
                <span className="nav-text">{item.name}</span>
              </NavItem>
            );
          })}

          <SectionHeader $collapsed={collapsed}>SYSTEM</SectionHeader>
          {systemMenu.map(item => {
            const Icon = item.icon;
            return (
              <NavItem
                key={item.name}
                $active={activeNav === item.name}
                $collapsed={collapsed}
                onClick={() => handleNavClick(item.name)}
              >
                <Icon className="nav-icon" />
                <span className="nav-text">{item.name}</span>
              </NavItem>
            );
          })}
        </NavBody>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
