import React, { useState, useMemo } from 'react';

const PortfolioMetrics = ({ portfolioData }) => {
  const [filter, setFilter] = useState('All'); 

  // Function to filter data based on the selected filter
  const filterData = (data, filter) => {
    const currentDate = new Date();
    switch (filter) {
      case '7Days':
        return data.filter(item => {
          const itemDate = new Date(item.date);
          return (currentDate - itemDate) <= 7 * 24 * 60 * 60 * 1000;
        });
      case '30Days':
        return data.filter(item => {
          const itemDate = new Date(item.date);
          return (currentDate - itemDate) <= 30 * 24 * 60 * 60 * 1000;
        });
      case '1Year':
        return data.filter(item => {
          const itemDate = new Date(item.date);
          return (currentDate - itemDate) <= 365 * 24 * 60 * 60 * 1000;
        });
      default:
        return data;
    }
  };

  const filteredData = useMemo(() => filterData(portfolioData, filter), [filter, portfolioData]);

  const totalValue = filteredData[filteredData.length - 1]?.value;
  const initialValue = filteredData[0]?.value;
  const dailyPnl = totalValue - initialValue;
  const totalPnl = totalValue - initialValue;
  const roi = ((totalPnl / initialValue) * 100).toFixed(2);  // ROI calculation
  const cagr = ((totalValue / initialValue) ** (1 / filteredData.length) - 1) * 100; // CAGR calculation

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Portfolio Metrics</h3>
      
      {/* Filter Dropdown */}
      <div className="mb-6 flex justify-between items-center">
        <label className="text-gray-700">Filter by:</label>
        <select
          onChange={handleFilterChange}
          value={filter}
          className="px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500">
          <option value="All">All Time</option>
          <option value="7Days">Last 7 Days</option>
          <option value="30Days">Last 30 Days</option>
          <option value="1Year">Last Year</option>
        </select>
      </div>

      {/* Portfolio Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
          <h4 className="font-medium text-gray-600">Total Portfolio Value</h4>
          <p className="text-xl font-semibold text-gray-800">₹{totalValue?.toLocaleString() || '0'}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
          <h4 className="font-medium text-gray-600">Total P&L</h4>
          <p className={`text-xl font-semibold ${totalPnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ₹{totalPnl?.toLocaleString() || '0'}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
          <h4 className="font-medium text-gray-600">Daily P&L</h4>
          <p className={`text-xl font-semibold ${dailyPnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ₹{dailyPnl?.toLocaleString() || '0'}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
          <h4 className="font-medium text-gray-600">ROI</h4>
          <p className={`text-xl font-semibold ${roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {roi}% 
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
          <h4 className="font-medium text-gray-600">CAGR</h4>
          <p className={`text-xl font-semibold ${cagr >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {cagr?.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioMetrics;
