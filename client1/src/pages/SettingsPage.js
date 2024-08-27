import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/SettingsPage.css';

const SettingsPage = () => {
  const [theme, setTheme] = useState('light');
  const [notificationPreference, setNotificationPreference] = useState('none');

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    console.log('Theme changed to:', newTheme);
  };

  const handleNotificationChange = (preference) => {
    setNotificationPreference(preference);
    console.log('Notification preference changed to:', preference);
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm('Are you sure you want to permanently delete your account? This action cannot be undone.');
    if (confirmDelete) {
      console.log('Account deleted');
    }
  };

  return (
    <div className="settings-container">
      <motion.div 
        className="settings-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Settings</h1>
        
        <div className="settings-section">
          <h2>Theme</h2>
          <div className="button-group">
            <button 
              onClick={() => handleThemeChange('light')} 
              className={`setting-button ${theme === 'light' ? 'active' : ''}`}
            >
              Light
            </button>
            <button 
              onClick={() => handleThemeChange('dark')} 
              className={`setting-button ${theme === 'dark' ? 'active' : ''}`}
            >
              Dark
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h2>Notifications</h2>
          <div className="button-group">
            <button 
              onClick={() => handleNotificationChange('email')} 
              className={`setting-button ${notificationPreference === 'email' ? 'active' : ''}`}
            >
              Email
            </button>
            <button 
              onClick={() => handleNotificationChange('push')} 
              className={`setting-button ${notificationPreference === 'push' ? 'active' : ''}`}
            >
              Push
            </button>
            <button 
              onClick={() => handleNotificationChange('none')} 
              className={`setting-button ${notificationPreference === 'none' ? 'active' : ''}`}
            >
              None
            </button>
          </div>
        </div>

        <div className="settings-section">
          <h2>Account</h2>
          <button onClick={handleLogout} className="action-button logout-button">
            Logout
          </button>
          <button onClick={handleDeleteAccount} className="action-button delete-account-button">
            Delete Account
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
