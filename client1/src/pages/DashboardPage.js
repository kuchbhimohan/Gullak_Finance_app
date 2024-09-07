import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DashboardNav from '../components/dashboard/DashboardNav';
import UserInfoCard from '../components/dashboard/UserInfoCard';
import TransactionCard from '../components/dashboard/TransactionCard';
import MonthlyExpenditureChart from '../components/dashboard/MonthlyExpenditureChart';
import FinancialDistributionChart from '../components/dashboard/FinancialDistributionChart';
import IncomeVsExpenditureChart from '../components/dashboard/IncomeVsExpenditureChart';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const location = useLocation();

  return (
    <div className="dashboard-container">
      <DashboardNav />
      <div className="dashboard-content">
        {location.pathname === '/dashboard' ? (
          <>
            <h1 className="dashboard-title">Dashboard</h1>
            <div className="dashboard-grid">
              <UserInfoCard />
              <TransactionCard />
            </div>
            <div className="dashboard-charts">
              <MonthlyExpenditureChart />
              <FinancialDistributionChart />
              <IncomeVsExpenditureChart />
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;