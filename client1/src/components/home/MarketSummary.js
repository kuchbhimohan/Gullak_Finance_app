import React from 'react';

const MarketSummary = () => {
  // This data would typically come from an API
  const marketData = {
    nifty: { value: 15000, change: +1.5 },
    sensex: { value: 50000, change: +1.2 },
  };

  return (
    <div className="market-summary">
      <div className="index">
        <h3>Nifty 50</h3>
        <p>{marketData.nifty.value}</p>
        <p className={marketData.nifty.change >= 0 ? 'positive' : 'negative'}>
          {marketData.nifty.change}%
        </p>
      </div>
      <div className="index">
        <h3>Sensex</h3>
        <p>{marketData.sensex.value}</p>
        <p className={marketData.sensex.change >= 0 ? 'positive' : 'negative'}>
          {marketData.sensex.change}%
        </p>
      </div>
    </div>
  );
};

export default MarketSummary;