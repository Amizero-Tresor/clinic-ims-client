import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import logo from "../../assets/logo.png"
import axios from 'axios';
import instance from '../../api/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await instance.get('/api/auth/check', {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data.authenticated) {
            navigate('/employees');
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
        }
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(email , password);
      const data = await login(email, password);
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate('/employees');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F9FAFF]">
      <div className="bg-white flex flex-col p-8 rounded-lg shadow-lg w-full max-w-md items-center justify-center">
        <img src={logo} alt="" className='pb-3 w-36' />
        <h2 className="text-center text-2xl font-bold mb-6 text-blue"> Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className='w-[90%]' onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block font-bold text-blue">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border-b-2 border-blue shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold text-blue">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border-b-2 border-blue shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <div>
            <button
              type="submit"
              className="w-[70%] mx-[15%] py-2 px-4 bg-blue border border-transparent rounded-xl shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Login
            </button>
          </div> */}
        </form>
        <button
          className="w-[70%] mx-[15%] mt-4 py-2 px-4 bg-gray-500 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={handleLogin}
        >
           Login
        </button>
      </div>
    </div>
  );
};

export default Login;
