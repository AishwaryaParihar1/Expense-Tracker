import React, { useState } from 'react';
import AdminUserList from '../../component/AdminUserList';
import ExpenseTable from '../../component/ExpenseTable'; 
import axios from 'axios';

const AdminDashboard = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [expenses, setExpenses] = useState([]);

  const fetchUserExpenses = async (user) => {
    const token = localStorage.getItem('token');
const res = await axios.get(
  `${import.meta.env.VITE_BACKEND_URL}/api/admin/user-expenses/${user._id}`,
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);
setSelectedUser(user);
setExpenses(res.data);




    setSelectedUser(user);
    setExpenses(res.data);
  };

  const handleExpenseChange = () => {
    if (selectedUser) {
      fetchUserExpenses(selectedUser);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      
      {!selectedUser ? (
        <AdminUserList onUserClick={fetchUserExpenses} />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Expenses of {selectedUser.name}</h2>
            <button onClick={() => setSelectedUser(null)}   className="bg-primary text-white py-2 px-4 rounded hover:opacity-90 transition duration-200">Back to user list</button>
          </div>
          <ExpenseTable expenses={expenses} onChange={handleExpenseChange} />
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
