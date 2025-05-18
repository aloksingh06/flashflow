"use client";
// This component is a sidebar navigation menu that can be toggled open and closed.
import React, { useState } from 'react';
import { Menu, Home, Settings, User } from 'lucide-react';

const SideNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { icon: <Home size={20} />, label: 'Overview' },
    { icon: <Settings size={20} />, label: 'Settings' },
    { icon: <User size={20} />, label: 'Profile' },
  ];

  return (
    <div
      className={`h-screen bg-gray-800 text-white transition-all duration-300 
      ${isOpen ? 'w-64' : 'w-16'} flex flex-col`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-700">
        <span className="text-lg font-semibold">{isOpen && 'Dashboard'}</span>
        <button onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
      </div>

      <ul className="flex-1 p-2 space-y-2 mt-2">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className="flex items-center gap-4 p-2 hover:bg-blue-700 rounded cursor-pointer"
          >
            {item.icon}
            {isOpen && <span>{item.label}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNavbar;
 