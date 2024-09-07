import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getFinancialDistribution } from '../../services/api';
import '../../styles/DashboardCharts.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#a4de6c', '#d0ed57'];

const FinancialDistributionChart = () => {
  const [distributionData, setDistributionData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFinancialDistribution();
  }, [selectedYear, selectedMonth]);

  const fetchFinancialDistribution = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getFinancialDistribution(selectedYear, selectedMonth);
      if (response.data.message) {
        setDistributionData([]);
        setError(response.data.message);
      } else if (Array.isArray(response.data)) {
        setDistributionData(response.data);
      } else {
        throw new Error('Unexpected data format received');
      }
    } catch (error) {
      console.error('Error fetching financial distribution:', error);
      setError('Failed to fetch financial distribution. Please try again later.');
      setDistributionData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const renderChart = () => {
    if (distributionData.length === 0) {
      return <div className="no-data-message">{error || 'No expenses or transfers for this period.'}</div>;
    }

    return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={distributionData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {distributionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="chart-container financial-distribution-chart">
      <h2>Expense and Transfer Distribution</h2>
      <div className="chart-controls">
        <select value={selectedYear} onChange={handleYearChange}>
          {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select value={selectedMonth} onChange={handleMonthChange}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
            <option key={month} value={month}>
              {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <div className="loading-message">Loading...</div>
      ) : (
        renderChart()
      )}
    </div>
  );
};

export default FinancialDistributionChart;