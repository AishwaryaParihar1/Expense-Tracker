import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import loginImg from '../assets/login-page.png'; // make sure this path is correct

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        formData,
        { withCredentials: true }
      );

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      toast.success('Login successful!');

      if (res.data.user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-10 py-8 bg-white">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back</h2>
          <p className="text-sm text-gray-500 mb-6">Please enter your details</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-gray-700">Email address</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#60449D]"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#60449D]"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 text-[#60449D] border-gray-300 rounded" />
                <span className="text-gray-600">Remember for 30 days</span>
              </label>
              <button className="text-[#60449D] hover:underline">Forgot password</button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#60449D] text-white py-2 rounded-md font-semibold hover:bg-[#50398d] transition"
            >
              Sign in
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-600">
            Don’t have an account?{' '}
            <span
              onClick={() => navigate('/')}
              className="text-[#60449D] cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-[#e4d9f9]">
        <img src={loginImg} alt="Login Illustration" className="w-[80%] object-contain" />
      </div>
    </div>
  );
};

export default Login;
