import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/userService';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await signup({ username, email, password });
      setMessage(response.message);
      setUsername('');
      setEmail('');
      setPassword('');
      navigate('/login'); // Navigate to login after successful signup
    } catch (err) {
      setError(err.message);
    }
  };

  const handleBypassSignup = () => {
    localStorage.setItem('token', 'mock-token');
    // Navigate to the /students page
    navigate('/students');
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F9FAFF]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-6 text-blue">Employee Signup</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-6">
            <label htmlFor="username" className="block font-bold text-blue">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full px-3 py-2 border-b-2 border-blue shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block font-bold text-blue">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border-b-2 border-blue shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* <div>
            <button
              type="submit"
              className="w-[70%] mx-[15%] py-2 px-4 bg-blue border border-transparent rounded-xl shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Signup
            </button>
          </div> */}
          {error && <div className="text-center text-red-500 mt-4">{error}</div>}
          {message && <div className="text-center text-green-500 mt-4">{message}</div>}
        </form>
        <button
          className="w-[70%] mx-[15%] mt-4 py-2 px-4 bg-gray-500 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={handleBypassSignup}
        >
           Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
