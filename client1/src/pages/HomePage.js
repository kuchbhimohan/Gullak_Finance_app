import React from 'react';
import Navbar from '../components/common/Navbar';
import NewsCard from '../components/home/NewsCard';
import StockTicker from '../components/home/StockTicker';

const HomePage = () => {
  return (
    <div className="home-page bg-[#2c3e50] min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="financial-news bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Top Financial News</h2>
            <NewsCard />
          </section>
          <section className="stock-ticker bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Live Stock Prices</h2>
            <StockTicker />
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;