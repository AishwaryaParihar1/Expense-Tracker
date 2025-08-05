import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ExpenseTable from '../component/ExpenseTable';

const AdminUserExpenses = () => {
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state;
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/user-expenses/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setExpenses(res.data);
  };

  const handleChange = () => {
    fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
  }, [userId]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Expenses of {user?.name || 'User'}</h2>
        <button
          onClick={() => navigate('/admin-dashboard')}
          className="bg-primary text-white py-2 px-4 rounded hover:opacity-90 transition duration-200"
        >
          Back to user list
        </button>
      </div>
      <ExpenseTable
        expenses={expenses}
        onChange={handleChange}
        adminView={true}
        userId={userId}
      />
    </div>
  );
};

export default AdminUserExpenses;
