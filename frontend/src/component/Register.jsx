import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import registerImg from '../assets/register-page.png';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, formData);
      toast.success('Registration successful!');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">

          <h2 className="text-3xl font-bold text-[#5d3f9c] mb-6">Expense Tracker</h2>
          <h2 className="text-2xl font-semibold text-[#60449D] mb-6">Create an Account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#60449D]"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#60449D]"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#60449D]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#60449D] hover:bg-[#4f3781] text-white py-2 rounded-lg font-semibold transition duration-300"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-[#60449D] cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:flex w-1/2 bg-[#60449D] items-center justify-center">
        <img src={registerImg} alt="register" className="max-w-full h-auto p-10" />
      </div>
    </div>
  );
};

export default Register;
