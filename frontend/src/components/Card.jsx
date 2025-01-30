import React from 'react';

const Card = ({ title, value, color }) => {
  return (
    <div className={`bg-white shadow-lg rounded-lg p-6 mb-4 w-60 hover:shadow-xl transition-shadow duration-300 ${color}`}>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-2xl">{value}</p>
    </div>
  );
};

export default Card;
