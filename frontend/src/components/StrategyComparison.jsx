import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from './Card';

const StrategyComparison = ({ strategies }) => {
  const [sortedStrategies, setSortedStrategies] = useState(strategies);
  const [sortOrder, setSortOrder] = useState('asc');
  const [expandedStrategy, setExpandedStrategy] = useState(null);

  // Sorting function
  const sortStrategies = (metric) => {
    const sorted = [...strategies].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[metric] - b[metric];
      }
      return b[metric] - a[metric];
    });
    setSortedStrategies(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const toggleStrategyDetails = (index) => {
    setExpandedStrategy(expandedStrategy === index ? null : index);
  };

  const getColor = (metric) => {
    if (metric > 10) return 'bg-green-100';
    if (metric < 0) return 'bg-red-100';
    return 'bg-yellow-100';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Strategy Comparison</h3>

      {/* Sorting Buttons */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => sortStrategies('roi')}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Sort by ROI
        </button>
        <button
          onClick={() => sortStrategies('cagr')}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Sort by CAGR
        </button>
        <button
          onClick={() => sortStrategies('drawdown')}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Sort by Drawdown
        </button>
      </div>

      {/* Display Strategies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedStrategies.map((strategy, index) => (
          <div key={index} className="p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out">
            <div
              onClick={() => toggleStrategyDetails(index)}
              className="cursor-pointer hover:bg-gray-50 p-4 rounded-lg border border-gray-200"
            >
              <Card 
                title={strategy.name} 
                value={`ROI: ${strategy.roi}% | CAGR: ${strategy.cagr}% | Drawdown: ${strategy.drawdown}%`} 
                color={getColor(strategy.roi)} 
              />
            </div>

            {/* Expandable Details */}
            {expandedStrategy === index && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-200">
                <p>{strategy.description || 'No description available'}</p>
              </div>
            )}

            {/* Side-by-Side Bar Chart for Comparing Metrics */}
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={[{ name: strategy.name, roi: strategy.roi, cagr: strategy.cagr, drawdown: strategy.drawdown }]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="roi" fill="#8884d8" />
                  <Bar dataKey="cagr" fill="#82ca9d" />
                  <Bar dataKey="drawdown" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow-lg">
        <h4>{label}</h4>
        <p>{`${payload[0].name}: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

export default StrategyComparison;
