import React from 'react';

import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

import Register from '../component/Register';
import Login from '../component/Login';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Register /> },
      { path: 'login', element: <Login /> },
      // other routes here
    ],
  },
]);
