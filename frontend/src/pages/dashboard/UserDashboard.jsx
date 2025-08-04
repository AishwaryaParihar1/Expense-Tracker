import React from 'react';
import ExpenseForm from '../../component/ExpenseForm';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      {/* Header section with button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-primary">Add Your Expense</h2>

        <button
          onClick={() => navigate('/user-expenses')}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-purple-800 transition"
        >
          See your expenses
        </button>
      </div>

      {/* Form section */}
      <ExpenseForm onSuccess={() => {}} />
    </div>
  );
};

export default UserDashboard;
