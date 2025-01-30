// data.js
const strategies = [
  { name: 'Growth Strategy', roi: 15, cagr: 12 },
  { name: 'Value Strategy', roi: 10, cagr: 8 },
  { name: 'Dividend Strategy', roi: 6, cagr: 5 },
  { name: 'Balanced Strategy', roi: 8, cagr: 7 },
];

const portfolio = [
  { date: '2023-01-01', value: 50000 }, 
  { date: '2023-02-01', value: 52000 }, 
  { date: '2023-03-01', value: 510000 }, 
  { date: '2023-04-01', value: 56000 }, 
  { date: '2023-05-01', value: 580000 }, 
  { date: '2023-06-01', value: 60000 },  
  { date: '2024-07-01', value: 630000 },  
  { date: '2024-08-01', value: 650000 },  
  { date: '2024-09-01', value: 675000 },  
  { date: '2024-10-01', value: 700000 },  
  { date: '2024-11-01', value: 730000 },  
  { date: '2024-12-01', value: 760000 },  
  { date: '2024-12-20', value: 790000 },
  { date: '2025-01-20', value: 800000 },
];

const recentTrades = [
  { date: '2023-05-01', trade: 'Bought 10 shares of XYZ', isProfit: true, amount: 150000 },
  { date: '2023-04-20', trade: 'Sold 5 shares of ABC', isProfit: false, amount: 50000 },
  { date: '2023-04-15', trade: 'Bought 20 shares of DEF', isProfit: true, amount: 200000 },
  { date: '2023-03-25', trade: 'Sold 15 shares of GHI', isProfit: true, amount: 1200000 },
  { date: '2023-02-10', trade: 'Bought 30 shares of JKL', isProfit: false, amount: 300000 },
  { date: '2023-02-01', trade: 'Sold 8 shares of MNO', isProfit: true, amount: 400000 },
  { date: '2023-01-20', trade: 'Bought 50 shares of PQR', isProfit: true, amount: 500000 },
  { date: '2023-01-10', trade: 'Sold 25 shares of STU', isProfit: false, amount: 250000 },
  { date: '2022-12-28', trade: 'Bought 12 shares of VWX', isProfit: true, amount: 180000 },
  { date: '2022-12-15', trade: 'Sold 10 shares of YZA', isProfit: true, amount: 300000 },
  { date: '2022-11-30', trade: 'Bought 15 shares of BCD', isProfit: false, amount: 100000 },
  { date: '2022-11-10', trade: 'Sold 30 shares of EFG', isProfit: true, amount: 750000 },
];


module.exports = { strategies, portfolio, recentTrades };
