import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/DashboardNav.css';

const DashboardNav = () => {
  return (
    <nav className="dashboard-nav">
      <NavLink to="/dashboard" end className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        Dashboard
      </NavLink>
      <NavLink to="/dashboard/transactions" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        Transactions
      </NavLink>
      <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        User Profile
      </NavLink>
      <NavLink to="/dashboard/settings" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        Settings
      </NavLink>
      <NavLink to="/dashboard/chat" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        Chat with AI
      </NavLink>
    </nav>
  );
};

export default DashboardNav;