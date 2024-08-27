import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardNav from '../components/dashboard/DashboardNav';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <DashboardNav />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardPage;