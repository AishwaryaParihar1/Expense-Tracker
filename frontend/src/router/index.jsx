import React from "react";

import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Register from "../component/Register";
import Login from "../component/Login";
import Dashboard from "../component/Dashboard";
import PrivateRoute from "../component/PrivateRoute";
import UserDashboard from "../pages/dashboard/UserDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import ExpensePage from "../component/ExpensePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "user-expenses", element: <ExpensePage /> },
     
      {
        path: "/user-dashboard",
        element: (
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin-dashboard",
        element: (
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        ),
      },

      // other routes here
    ],
  },
]);
