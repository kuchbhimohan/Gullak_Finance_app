import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/common/Navbar';
import NewsCard from '../components/home/NewsCard';
import StockTicker from '../components/home/StockTicker';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="hero-title">Welcome to Gullak</h1>
        <p className="hero-subtitle">Your Personal Finance Buddy </p>
      </motion.section>

      <motion.div 
        className="stats-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {[
          { value: '100+', label: 'Markets Tracked' },
          { value: '1 Min', label: 'Real-time Updates' },
          { value: '50+', label: 'News Sources' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index + 0.4 }}
          >
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="content-section">
        <motion.section
          className="section-card"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="section-title">
            <i className="fas fa-newspaper"></i>
            Financial News
          </h2>
          <NewsCard />
        </motion.section>

        <motion.section
          className="section-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="section-title">
            <i className="fas fa-chart-line"></i>
            Live Stock Prices
          </h2>
          <StockTicker />
        </motion.section>
      </div>
    </div>
  );
};

export default HomePage;