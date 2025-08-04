import React, { useEffect, useState } from 'react';
import ExpenseTable from '../component/ExpenseTable';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/expenses`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-primary">Your Expenses</h1>


        <button
          onClick={() => navigate('/user-dashboard')}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-purple-800 transition"
        >
          Add your expense
        </button>
      </div>

      <ExpenseTable expenses={expenses} onChange={fetchExpenses} />
    </div>
  );
};

export default ExpensePage;
