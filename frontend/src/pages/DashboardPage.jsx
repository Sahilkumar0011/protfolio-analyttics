// src/pages/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PortfolioMetrics from '../components/PortfolioMetrics';
import RecentTrades from '../components/RecentTrades';
import StrategyComparison from '../components/StrategyComparison';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, Label } from 'recharts';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [strategies, setStrategies] = useState([]);
  const [recentTrades, setRecentTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  // Fetch data from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then((response) => {
        const { portfolio, strategies, recentTrades } = response.data;
        setPortfolioData(portfolio);
        setStrategies(strategies);
        setRecentTrades(recentTrades);
        setLoading(false);
        setFilteredData(portfolio);  // Assuming we're showing all data initially
      })
      .catch((error) => {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center text-xl text-gray-600">
        <div className="spinner-border animate-spin" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-xl text-red-500">{error}</div>;
  }

  // Pie chart data (Profit vs Loss visualization)
  const profitData = recentTrades.filter((trade) => trade.isProfit);
  const lossData = recentTrades.filter((trade) => !trade.isProfit);
  const totalTrades = recentTrades.length;
  const pieData = [
    { name: 'Profitable Trades', value: profitData.length },
    { name: 'Unprofitable Trades', value: lossData.length },
  ];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="middle">
        {`${((value / totalTrades) * 100).toFixed(2)}%`}
      </text>
    );
  };

  // Navigate to DetailedReportPage
  const handleViewReport = () => {
    navigate('/detailed-report');
  };

  return (
    <div className="container mx-auto p-6 space-y-12">
      {/* Dashboard Header */}
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-indigo-600">Portfolio Analytics Dashboard</h1>
        <p className="text-lg text-gray-600">Your portfolio performance metrics and analysis in one place</p>
      </header>

      {/* Portfolio Growth Chart */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Portfolio Growth Over Time</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#4A90E2" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Portfolio Metrics (Enhanced) */}
      <section className="mb-12">
        <PortfolioMetrics portfolioData={filteredData} />
      </section>

      {/* Strategy Comparison */}
      <section className="mb-12">
        <StrategyComparison strategies={strategies} />
      </section>

      {/* Trade Performance Pie Chart */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Trade Performance</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              fill="#8884d8"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              <Cell key="cell-0" fill="#4CAF50" />
              <Cell key="cell-1" fill="#F44336" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* Recent Trades */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Trades</h2>
        <RecentTrades recentTrades={recentTrades} />
      </section>

      {/* View Detailed Report Button */}
      <section className="text-center mt-12">
        <button
          onClick={handleViewReport}
          className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all"
        >
          View Detailed Report
        </button>
      </section>
    </div>
  );
};

export default DashboardPage;
