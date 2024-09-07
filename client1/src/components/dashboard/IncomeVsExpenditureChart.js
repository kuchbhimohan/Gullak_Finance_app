
import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getIncomeVsExpenditure } from '../../services/api';
import '../../styles/DashboardCharts.css';

const IncomeVsExpenditureChart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState('month'); // 'month', 'quarter', 'year'

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const endDate = new Date();
      let startDate = new Date();
      if (dateRange === 'month') {
        startDate.setMonth(startDate.getMonth() - 1);
      } else if (dateRange === 'quarter') {
        startDate.setMonth(startDate.getMonth() - 3);
      } else if (dateRange === 'year') {
        startDate.setFullYear(startDate.getFullYear() - 1);
      }
      const response = await getIncomeVsExpenditure(startDate.toISOString(), endDate.toISOString());
      setData(response.data);
    } catch (error) {
      console.error('Error fetching income vs expenditure data:', error);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  if (isLoading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="chart-container income-vs-expenditure-chart">
      <h2>Income vs Expenditure</h2>
      <div className="chart-controls">
        <select value={dateRange} onChange={handleDateRangeChange}>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
          <option value="year">Last Year</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#82ca9d" name="Income" />
          <Line type="monotone" dataKey="expenditure" stroke="#8884d8" name="Expenditure" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeVsExpenditureChart;