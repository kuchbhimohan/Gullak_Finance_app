import React from 'react';

const NewsCard = () => {
  // This data would typically come from an API
  const news = [
    { id: 1, title: 'Market Reaches All-Time High', source: 'Financial Times' },
    { id: 2, title: 'New Economic Policy Announced', source: 'Bloomberg' },
    { id: 3, title: 'Tech Stocks Surge Amid Earnings Reports', source: 'CNBC' },
    // Add more news items as needed
  ];

  return (
    <div className="news-container">
      {news.map((item) => (
        <div key={item.id} className="news-card">
          <h3>{item.title}</h3>
          <p>Source: {item.source}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsCard;