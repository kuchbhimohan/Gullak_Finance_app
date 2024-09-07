import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaHome, FaChartBar, FaExchangeAlt, FaUser, FaCog, FaRobot, FaSignOutAlt } from 'react-icons/fa';
import { message } from 'antd';
import '../../styles/DashboardNav.css';

const DashboardNav = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      message.success('Logout successful');
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error('Logout error:', error);
      message.error('An error occurred during logout');
    }
  };

  return (
    <nav className="dashboard-nav">
      <div className="nav-items">
        <NavLink to="/" className="nav-item">
          <FaHome /> <span>Home</span>
        </NavLink>
        <NavLink to="/dashboard" end className="nav-item">
          <FaChartBar /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/dashboard/transactions" className="nav-item">
          <FaExchangeAlt /> <span>Transactions</span>
        </NavLink>
        <NavLink to="/dashboard/profile" className="nav-item">
          <FaUser /> <span>User Profile</span>
        </NavLink>
        <NavLink to="/dashboard/settings" className="nav-item">
          <FaCog /> <span>Settings</span>
        </NavLink>
        <NavLink to="/dashboard/chat" className="nav-item">
          <FaRobot /> <span>Chat with AI</span>
        </NavLink>
        <button onClick={handleLogout} className="nav-item logout-button">
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default DashboardNav;