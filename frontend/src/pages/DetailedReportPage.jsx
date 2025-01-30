// src/pages/DetailedReportPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PortfolioMetrics from '../components/PortfolioMetrics';
import RecentTrades from '../components/RecentTrades';
import { useNavigate } from 'react-router-dom';

const DetailedReportPage = () => {
  const [portfolioData, setPortfolioData] = useState([]);
  const [strategies, setStrategies] = useState([]);
  const [recentTrades, setRecentTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState('portfolio'); // Tab control (Portfolio, Trades)

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then((response) => {
        const { portfolio, strategies, recentTrades } = response.data;
        setPortfolioData(portfolio);
        setStrategies(strategies);
        setRecentTrades(recentTrades);
        setLoading(false);
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

  // Handle Back to Dashboard click
  const handleBackToDashboard = () => {
    navigate('/'); // Navigate to the dashboard
  };

  // Function to handle tab switching
  const handleTabChange = (tabName) => {
    setTab(tabName);
  };

  return (
    <div className="container mx-auto p-6 space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-indigo-600">Detailed Report</h1>
        <p className="text-lg text-gray-600">Detailed performance data and analysis</p>
      </header>

      {/* Tab Navigation */}
      <div className="flex justify-center space-x-6 mb-6">
        <button
          onClick={() => handleTabChange('portfolio')}
          className={`px-4 py-2 rounded ${tab === 'portfolio' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}
        >
          Portfolio
        </button>
        <button
          onClick={() => handleTabChange('trades')}
          className={`px-4 py-2 rounded ${tab === 'trades' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'}`}
        >
          Trades
        </button>
      </div>

      {/* Conditional rendering based on selected tab */}
      {tab === 'portfolio' && (
        <section className="mb-12">
          <PortfolioMetrics portfolioData={portfolioData} />
        </section>
      )}

      {tab === 'trades' && (
        <section className="mb-12">
          <RecentTrades recentTrades={recentTrades} />
        </section>
      )}

      {/* Back to Dashboard Button */}
      <section className="text-center mt-12">
        <button
          onClick={handleBackToDashboard}
          className="px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all"
        >
          Back to Dashboard
        </button>
      </section>
    </div>
  );
};

export default DetailedReportPage;
