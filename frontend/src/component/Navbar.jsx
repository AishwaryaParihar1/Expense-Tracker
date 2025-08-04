import React from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 bg-white dark:bg-gray-900 shadow-primary flex items-center justify-between transition duration-300">
      <div className="text-2xl font-bold text-primary">
        Expense Tracker
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
