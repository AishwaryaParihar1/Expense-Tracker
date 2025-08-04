import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './component/Navbar';
import Footer from './component/Footer';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText transition-colors duration-300">
      <div>
        
       <Navbar/> 
        <Outlet />
        <ToastContainer position="top-right" />
      </div>

      <Footer />
    </div>
  );
};

export default App;
