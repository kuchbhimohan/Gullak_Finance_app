import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';
import '../styles/auth.css';

const SignupPage = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <SignupForm />
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;