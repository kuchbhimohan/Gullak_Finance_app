import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes';
import { AuthProvider } from './context/AuthContext';
import Loader from './components/Loader';
import WelcomePopup from './components/WelcomePopup';
import './styles/global.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
      setShowWelcome(true);
    }, 2000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  const closeWelcomePopup = () => {
    setShowWelcome(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <AuthProvider>
        {showWelcome && <WelcomePopup onClose={closeWelcomePopup} />}
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;