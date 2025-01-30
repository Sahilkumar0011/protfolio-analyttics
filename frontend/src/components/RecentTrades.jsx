import React, { useState } from 'react';
import { FaArrowUp, FaArrowDown, FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { format } from 'date-fns'; 
import Modal from './Modal'; 

const RecentTrades = ({ recentTrades }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTrades, setFilteredTrades] = useState(recentTrades);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null); // Track which dropdown is open

  const formatAmount = (amount) => {
    return `₹${amount.toLocaleString()}`;
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredTrades(
      recentTrades.filter((trade) => {
        return (
          trade.trade.toLowerCase().includes(query.toLowerCase()) ||
          trade.amount.toString().includes(query)
        );
      })
    );
  };

  const openModal = (trade) => {
    setSelectedTrade(trade);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTrade(null);
  };

  const toggleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index); // Toggle dropdown visibility
  };

  const handleBuySell = (action) => {
    // Handle buy/sell logic here
    console.log(`${action} clicked`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Recent Trades</h3>
      <input
        type="text"
        placeholder="Search by trade or amount"
        value={searchQuery}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded-lg w-full"
      />

      {/* Grid Layout for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTrades.map((trade, index) => (
          <div
            key={index}
            className={`bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-all 
              ${trade.isProfit ? 'hover:bg-green-100' : 'hover:bg-red-100'}`}
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <strong className="text-lg">{format(new Date(trade.date), 'MMM dd, yyyy')}</strong>
                <p className="text-gray-500">{trade.trade}</p>
              </div>

              <div className="flex items-center space-x-2">
                <span
                  className={`text-lg font-semibold ${trade.isProfit ? 'text-green-500' : 'text-red-500'}`}
                >
                  {trade.isProfit ? '+' : '-'} {formatAmount(trade.amount)}
                </span>

                {trade.isProfit ? (
                  <FaArrowUp className="text-green-500" />
                ) : (
                  <FaArrowDown className="text-red-500" />
                )}

                {/* Dropdown Toggle */}
                <button
                  onClick={() => toggleDropdown(index)}
                  className="text-gray-500"
                >
                  {openDropdownIndex === index ? <FaCaretUp /> : <FaCaretDown />}
                </button>
              </div>
            </div>

            {/* Dropdown Content */}
            {openDropdownIndex === index && (
              <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                <p><strong>Buy Price:</strong> ₹{trade.buyPrice}</p>
                <p><strong>Sell Price:</strong> ₹{trade.sellPrice}</p>
                <p><strong>Shares Traded:</strong> {trade.shares}</p>

                <div className="mt-2 flex justify-between">
                  <button
                    onClick={() => handleBuySell('Buy')}
                    className="bg-green-500 text-white py-1 px-4 rounded-lg"
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => handleBuySell('Sell')}
                    className="bg-red-500 text-white py-1 px-4 rounded-lg"
                  >
                    Sell
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2>Trade Details</h2>
          <p><strong>Date:</strong> {format(new Date(selectedTrade.date), 'MMM dd, yyyy')}</p>
          <p><strong>Trade:</strong> {selectedTrade.trade}</p>
          <p><strong>Amount:</strong> {formatAmount(selectedTrade.amount)}</p>
          <p><strong>Status:</strong> {selectedTrade.isProfit ? 'Profit' : 'Loss'}</p>
        </Modal>
      )}
    </div>
  );
};

export default RecentTrades;
