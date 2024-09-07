import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getMonthlyFinancialData } from '../../services/api';

const MonthlyExpenditureChart = () => {
  const [financialData, setFinancialData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMonthlyFinancialData(selectedYear);
  }, [selectedYear]);

  const fetchMonthlyFinancialData = async (year) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getMonthlyFinancialData(year);
      setFinancialData(response.data);
    } catch (error) {
      console.error('Error fetching monthly financial data:', error);
      setError('Failed to fetch financial data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - i);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="monthly-financial-chart">
      <div className="chart-header">
        <h2>Monthly Financial Overview</h2>
        <select value={selectedYear} onChange={handleYearChange}>
          {yearOptions.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="chart-content">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={financialData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month"
              tick={{ fill: '#666', fontSize: 12 }}
              tickLine={{ stroke: '#666' }}
              axisLine={{ stroke: '#666' }}
            />
            <YAxis
              tick={{ fill: '#666', fontSize: 12 }}
              tickLine={{ stroke: '#666' }}
              axisLine={{ stroke: '#666' }}
            />
            <Tooltip 
              formatter={(value, name) => [`${value.toFixed(2)}`, name.charAt(0).toUpperCase() + name.slice(1)]}
            />
            <Legend />
            <Bar dataKey="income" fill="#82ca9d" name="Income" />
            <Bar dataKey="expenditure" fill="#8884d8" name="Expenditure" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyExpenditureChart;