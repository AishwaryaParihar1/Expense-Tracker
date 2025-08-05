import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUserList = ({ onUserClick }) => {
  const [users, setUsers] = useState([]);

    const navigate = useNavigate();

  const handleViewExpenses = (user) => {
    navigate(`/admin-dashboard/user/${user._id}`, { state: user });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
 const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
  headers: { Authorization: `Bearer ${token}` }
});


      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border rounded shadow bg-white dark:bg-darkCard">
        <thead className="bg-primary text-white">
          <tr>
            <th className="p-2">#</th>
            <th>Name</th>
            <th>Email</th>
            <th>View Expenses</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user._id} className="text-center border-b">
              <td>{i + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
               <button onClick={() => handleViewExpenses(user)}
                  className="text-primary hover:font-semibold"
                >
                  View Expenses
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserList;
