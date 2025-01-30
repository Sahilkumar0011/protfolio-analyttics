// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage'; // Assuming your DashboardPage is in pages folder
import Navbar from './components/Navbar';
import DetailedReportPage from './pages/DetailedReportPage';




const App = () => {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/detailed-report" element={<DetailedReportPage />} />

      </Routes>
    </Router>
  );
};

export default App;

