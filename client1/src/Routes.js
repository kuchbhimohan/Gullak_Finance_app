import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import FinancialSummary from './components/dashboard/FinancialSummary';
import SettingsPage from './pages/SettingsPage';
import UserProfilePage from './pages/UserProfilePage';
import ChatPage from './pages/ChatPage';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }>
        <Route index element={<FinancialSummary />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="profile" element={<UserProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="chat" element={<ChatPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;