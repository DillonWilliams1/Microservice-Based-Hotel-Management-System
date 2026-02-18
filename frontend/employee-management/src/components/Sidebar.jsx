import { Link, useLocation } from 'react-router-dom';
import { Home, Users, BarChart3, UserPlus, Building2 } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/employees', icon: Users, label: 'All Employees' },
    { path: '/employees/add', icon: UserPlus, label: 'Add Employee' },
    { path: '/statistics', icon: BarChart3, label: 'Statistics' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Building2 className="hotel-icon" size={32} />
        <h2 className="hotel-name">ආලකමන්දා</h2>
        <p className="hotel-subtitle">Hotel Management</p>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-section-title">Employee Management</h3>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        <p className="footer-text">© 2026 ආලකමන්දා Hotel</p>
        <p className="footer-subtext">Employee Management System</p>
      </div>
    </div>
  );
};

export default Sidebar;
