import React from 'react';

const StockTicker = () => {
  // This data would typically come from an API
  const stocks = [
    { symbol: 'AAPL', price: 150.25, change: +1.2 },
    { symbol: 'GOOGL', price: 2750.80, change: -0.5 },
    { symbol: 'MSFT', price: 300.15, change: +0.8 },
    // Add more stocks as needed
  ];

  return (
    <div className="stock-ticker">
      {stocks.map((stock) => (
        <div key={stock.symbol} className="stock-item">
          <span className="stock-symbol">{stock.symbol}</span>
          <span className="stock-price">${stock.price}</span>
          <span className={`stock-change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
            {stock.change}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default StockTicker;