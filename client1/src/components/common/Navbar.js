import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // This is a placeholder for authentication state
  const isLoggedIn = false;

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">AI Finance Manager</Link>
      </div>
      <div className="navbar-menu">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;