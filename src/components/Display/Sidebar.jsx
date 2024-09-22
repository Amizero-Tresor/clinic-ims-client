import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import logo from "../../assets/logo.png";
import toast from 'react-hot-toast';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const router = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Successfully logged out");
    router("/");
  };

  return (
    <div
      className={`fixed  bg-blue text-white w-[250px] rounded-lg h-screen p-4 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:h-[100%] md:ml-3 md:m-1 md:flex md:flex-col md:items-center md:shadow-xl`}
    >
      <div className="flex justify-between items-start mt-5 mb-8">
        <img src={logo} alt="Logo" className="w-36" />
        <button className="text-2xl md:hidden" onClick={toggleSidebar}>
          <AiOutlineClose />
        </button>
      </div>
      <div className="space-y-4 flex flex-col items-center justify-center">
        {['employees', 'products', 'stock', 'incomingTransactions', 'outgoingTransactions'].map((route) => (
          <NavLink
            key={route}
            to={`/${route}`}
            className={({ isActive }) =>
              `h-[2.5rem] md:h-[3rem] px-4 md:px-5 flex items-center justify-center text-sm md:text-base ${isActive ? 'bg-white text-blue' : 'hover:bg-white hover:text-blue'} rounded-full font-bold transition-all duration-150`
            }
          >
            {route.charAt(0).toUpperCase() + route.slice(1).replace(/([A-Z])/g, ' $1').trim()}
          </NavLink>
        ))}
        <button
          onClick={logout}
          className="h-[2.5rem] md:h-[3rem] px-4 md:px-5 flex items-center justify-center text-sm md:text-base text-white hover:bg-red-400 rounded-full font-bold transition-all duration-150"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
