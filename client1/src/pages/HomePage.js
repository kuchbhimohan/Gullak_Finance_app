import React from 'react';
import Navbar from '../components/common/Navbar';
import NewsCard from '../components/home/NewsCard';
import StockTicker from '../components/home/StockTicker';
import MarketSummary from '../components/home/MarketSummary';

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <main>
      <section className="financial-news">
          <h2>Top Financial News</h2>
          <NewsCard />
        </section>
        <section className="market-summary">
          <h2>Market Summary</h2>
          <MarketSummary />
        </section>
        <section className="stock-ticker">
          <h2>Live Stock Prices</h2>
          <StockTicker />
        </section>
        
      </main>
    </div>
  );
};

export default HomePage;