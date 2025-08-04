import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary dark:bg-darkCard text-white dark:text-darkText py-4 shadow-inner mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm">
        <p className="mb-2 sm:mb-0">&copy; {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
        <div className="space-x-4">
          <a href="#" className="hover:underline hover:text-lightText transition duration-200">Privacy</a>
          <a href="#" className="hover:underline hover:text-lightText transition duration-200">Terms</a>
          <a href="#" className="hover:underline hover:text-lightText transition duration-200">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
