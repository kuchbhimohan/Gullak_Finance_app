import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StockChart = ({ symbol, data }) => {
  if (!data || data.length === 0) return null;

  const minPrice = Math.min(...data.map(item => item.close));
  const maxPrice = Math.max(...data.map(item => item.close));
  const padding = (maxPrice - minPrice) * 0.1;

  return (
    <div className="stock-chart bg-white rounded-lg shadow-md p-4">
      <h3 className="text-xl font-bold mb-2 text-center">{symbol}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="datetime" 
            tickFormatter={(tick) => new Date(tick).toLocaleTimeString()} 
            interval="preserveStartEnd"
          />
          <YAxis 
            domain={[minPrice - padding, maxPrice + padding]} 
            tickFormatter={(tick) => tick.toFixed(2)}
          />
          <Tooltip 
            labelFormatter={(label) => new Date(label).toLocaleString()}
            formatter={(value) => [value.toFixed(2), "Price"]}
          />
          <Legend />
          <Line type="monotone" dataKey="close" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const StockTicker = () => {
  const [stocksData, setStocksData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocksData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('https://api.twelvedata.com/time_series?symbol=AAPL,META,NKE,GOOGL&interval=1min&apikey=52ed3785dfa644978a0174af126651d9');
        const result = await response.json();

        if (result.code) {
          throw new Error(result.message);
        }

        const data = {};
        Object.entries(result).forEach(([symbol, stockData]) => {
          if (stockData.status === 'ok') {
            data[symbol] = stockData.values.map(item => ({
              ...item,
              close: parseFloat(item.close)
            })).reverse();
          }
        });
        setStocksData(data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setError('Failed to fetch stock data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStocksData();
  }, []);

  if (loading) return <div className="text-center py-4">Loading stock data...</div>;
  if (error) return <div className="text-center py-4 text-red-600">{error}</div>;

  return (
    <div className="stock-ticker bg-gray-100 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Live Stock Prices</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(stocksData).map(([symbol, data]) => (
          <StockChart key={symbol} symbol={symbol} data={data} />
        ))}
      </div>
    </div>
  );
};

export default StockTicker;