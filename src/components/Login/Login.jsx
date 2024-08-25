import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import logo from "../../assets/logo.png";
import instance from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
          console.error('Error checking authentication:', error.message);
        }
      }
    };
    checkAuth();
  }, [navigate]);

  const validateForm = () => {
    const errors = {};

    if (!email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is not valid.';
    }

    if (!password) {
      errors.password = 'Password is required.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true); // Start loading

    try {
      const data = await login(email, password);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success('Login successful!');
      navigate('/employees');
    } catch (err) {
      toast.error('Invalid credentials.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F9FAFF]">
      <div className="bg-white flex flex-col p-8 rounded-lg shadow-lg w-full max-w-md items-center justify-center">
        <img src={logo} alt="Company Logo" className="pb-3 w-36" />
        <h2 className="text-center text-2xl font-bold mb-6 text-blue">Login</h2>
        <form className="w-[90%]" onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block font-bold text-blue">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`mt-1 block w-full px-3 py-2 border-b-2 ${errors.email ? 'border-red-500' : 'border-blue'} shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block font-bold text-blue">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className={`mt-1 block w-full px-3 py-2 border-b-2 ${errors.password ? 'border-red-500' : 'border-blue'} shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                style={{ color: '#1B60AC', fontSize: '1.5em' }}
              />
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-[70%] mx-[15%] py-2 px-4 bg-blue border border-transparent rounded-xl shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 12a10 10 0 0110-10V0C4.477 0 0 4.477 0 10h2zm12 8a8 8 0 01-8-8H2a10 10 0 0010 10v-2zm6-6a8 8 0 01-8 8v2a10 10 0 0010-10h-2zm-2 0a8 8 0 01-8-8H6a10 10 0 0010 10V12z"
                  ></path>
                </svg>
                Logging in...
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
