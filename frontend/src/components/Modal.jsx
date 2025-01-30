import React from 'react';

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-gray-500"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
