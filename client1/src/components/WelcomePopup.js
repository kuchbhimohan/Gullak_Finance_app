import React from 'react';
import '../styles/WelcomePopup.css';

const WelcomePopup = ({ onClose }) => {
  return (
    <div className="welcome-popup-overlay">
      <div className="welcome-popup">
        <h2>Hi! Welcome to Gullak, your finance buddy.</h2>
        <p>If you're here just to explore the website, you can login to the dummy account without signing up.</p>
        <p>Just go to the login page and use </p>
          <p> email -dummy@gullak.com</p>
           <p>password-123456</p>
        <button onClick={onClose}>Got it!</button>
      </div>
    </div>
  );
};

export default WelcomePopup;