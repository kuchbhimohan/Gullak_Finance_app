import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { message } from 'antd';
import { FaPiggyBank } from 'react-icons/fa';
import '../../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      message.success('Logout successful');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      message.error('An error occurred during logout');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <FaPiggyBank className="navbar-logo" />
          <div>
            <span className="navbar-title">GULLAK</span>
            <span className="navbar-subtitle">Your Finance Buddy</span>
          </div>
        </Link>
      </div>
      <div className="navbar-menu">
        {user ? (
          <>
            <Link to="/dashboard" className="navbar-button">Dashboard</Link>
            <button onClick={handleLogout} className="navbar-button logout-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/signup" className="navbar-button">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;