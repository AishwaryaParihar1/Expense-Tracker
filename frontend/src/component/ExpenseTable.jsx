import React, { useState, useEffect } from "react";
import axios from "axios";

const ExpenseTable = ({ expenses, onChange, adminView = false, userId = null }) => {

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const [categoryFilter, setCategoryFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryFilter, startDate, endDate]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this expense?");
  if (!confirmDelete) return;

  const token = localStorage.getItem("token");

  const url = adminView
    ? `${import.meta.env.VITE_BACKEND_URL}/api/admin/user-expenses/${userId}/${id}` // ✅ Admin endpoint
    : `${import.meta.env.VITE_BACKEND_URL}/api/expenses/${id}`; // ✅ User endpoint

  await axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  onChange(); // Refresh list
};


  const handleEdit = (exp) => {
    setEditId(exp._id);
    setEditData({
      title: exp.title,
      amount: exp.amount,
      category: exp.category,
      date: exp.date.slice(0, 10),
    });
  };

  const handleChange = (e) => {
    setEditData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCancel = () => {
    setEditId(null);
    setEditData({
      title: "",
      amount: "",
      category: "",
      date: "",
    });
  };

const handleSave = async (id) => {
  const token = localStorage.getItem("token");

  const url = adminView
    ? `${import.meta.env.VITE_BACKEND_URL}/api/admin/user-expenses/${userId}/${id}` // ✅ Admin update
    : `${import.meta.env.VITE_BACKEND_URL}/api/expenses/${id}`; // ✅ User update

  await axios.put(url, editData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  setEditId(null);
  onChange();
};


  const resetFilters = () => {
    setCategoryFilter("");
    setStartDate("");
    setEndDate("");
  };

  const filteredExpenses = expenses.filter((exp) => {
    const matchesCategory =
      categoryFilter === "" ||
      exp.category.toLowerCase().includes(categoryFilter.toLowerCase());
    const expenseDate = new Date(exp.date);
    const matchesStart = !startDate || expenseDate >= new Date(startDate);
    const matchesEnd = !endDate || expenseDate <= new Date(endDate);
    return matchesCategory && matchesStart && matchesEnd;
  });

  const total = filteredExpenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExpenses = filteredExpenses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  const handleExportCSV = () => {
    const headers = ["Title,Amount,Category,Date"];
    const rows = filteredExpenses.map(
      (exp) =>
        `${exp.title},${exp.amount},${exp.category},${formatDate(exp.date)}`
    );
    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-4 items-start md:items-center justify-between">
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Filter by category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="input p-2 border rounded dark:bg-darkCard dark:border-gray-600 dark:text-white"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input p-2 border rounded dark:bg-darkCard dark:border-gray-600 dark:text-white"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input p-2 border rounded dark:bg-darkCard dark:border-gray-600 dark:text-white"
          />
          <button
            onClick={resetFilters}
            className="bg-gray-300 text-black px-3 py-2 rounded hover:bg-gray-400 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
          >
            Reset
          </button>
        </div>
        <div className="text-right text-primary font-semibold text-lg">
          Total Spent: ₹{total}
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="min-w-[600px] w-full text-sm bg-white dark:bg-darkCard rounded shadow-md">
          <thead>
            <tr className="bg-primary text-white">
              <th className="p-2">Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentExpenses.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No data available
                </td>
              </tr>
            ) : (
              currentExpenses.map((exp) => (
                <tr key={exp._id} className="text-center border-b">
                  {editId === exp._id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          name="title"
                          value={editData.title}
                          onChange={handleChange}
                          className="input w-full p-1 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-primary shadow-sm"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="amount"
                          value={editData.amount}
                          onChange={handleChange}
                          className="input w-full p-1 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-primary shadow-sm"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="category"
                          value={editData.category}
                          onChange={handleChange}
                          className="input w-full p-1 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-primary shadow-sm"
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          name="date"
                          value={editData.date}
                          onChange={handleChange}
                          className="input w-full p-1 bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:border-primary shadow-sm"
                        />
                      </td>
                      <td className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleSave(exp._id)}
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-2">{exp.title}</td>
                      <td>₹{exp.amount}</td>
                      <td>{exp.category}</td>
                      <td>{formatDate(exp.date)}</td>
                      <td className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(exp)}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(exp._id)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4 gap-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === index + 1
                  ? "bg-primary text-white"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Export Button */}
        <button
          onClick={handleExportCSV}
          className="bg-primary text-white px-3 py-2 mt-4 rounded hover:bg-opacity-90"
        >
          Export to CSV
        </button>
      </div>
    </>
  );
};

export default ExpenseTable;
