import React from 'react';

import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <>
      {/* Navbar can go here if global */}
      <Outlet />
          <ToastContainer position="top-right" />

    </>
  );
};

export default App;
