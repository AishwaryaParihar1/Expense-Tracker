import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ExpenseForm = ({ onSuccess }) => {
  const today = new Date().toLocaleDateString('en-CA'); // outputs YYYY-MM-DD in local time
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: today,
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const payload = {
  ...formData,
  date: formData.date || new Date().toISOString().slice(0, 10),
};

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/expenses`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setFormData({ title: '', amount: '', category: '', date: '' });
      toast.success("Expense added successfully ✅");
      onSuccess();
    } catch (err) {
      console.error("❌ Error:", err);
      toast.error("Failed to add expense ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-lightCard dark:bg-darkCard p-6 rounded-lg shadow-md mb-6 max-w-md mx-auto">
      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="p-3 rounded border border-gray-300 dark:border-gray-700 dark:bg-darkCard bg-white text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm"
        />
        <input
          type="tel"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="p-3 rounded border border-gray-300 dark:border-gray-700 dark:bg-darkCard bg-white text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
          className="p-3 rounded border border-gray-300 dark:border-gray-700 dark:bg-darkCard bg-white text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="p-3 rounded border border-gray-300 dark:border-gray-700 dark:bg-darkCard bg-white text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm"
        />
        <button
          type="submit"
          className="bg-primary text-white py-2 px-4 rounded hover:opacity-90 transition duration-200"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
