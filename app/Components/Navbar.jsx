import React from 'react';

const Navbar = () => {
  return (
    <div className="w-full h-16 bg-gray-900 flex items-center justify-between px-4 shadow">
      <h1 className="text-white text-2xl font-bold">FlashFlow</h1>
      <ul className="flex space-x-6">
        <li className="text-white hover:text-gray-400 cursor-pointer">Home</li>
        <li className="text-white hover:text-gray-400 cursor-pointer">About</li>
        <li className="text-white hover:text-gray-400 cursor-pointer">Contact</li>
      </ul>
    </div>
  );
};

export default Navbar;
