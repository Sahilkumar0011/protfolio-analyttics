import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl test-align-center">Sahil's Portfolio Analytics</div>
        <div>
          <button className="mx-2">Dashboard</button>
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
