import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink instead of Link for active state handling
import Logo from "../../assets/LOGO2.svg";

const Sidebar = () => {
  return (
    <div className="ml-3 bg-blue mt-5 h-[80%] flex flex-col items-center text-white pt-4 px-6 shadow-xl">
      <div className="font-display text-lg mb-8">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="h-[60%] space-y-4 flex flex-col items-center justify-center">
        <NavLink
          to="/employees"
          className={({ isActive }) =>
            `h-[3rem] px-5 flex items-center justify-center text-sm ${
              isActive ? 'bg-white text-blue' : 'text-white hover:bg-white hover:text-blue'
            } rounded-[2rem] font-display font-bold p-2 transition-all duration-700`
          }
        >
          Employees
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `h-[3rem] px-5 flex items-center justify-center text-sm ${
              isActive ? 'bg-white text-blue' : 'text-white hover:bg-white hover:text-blue'
            } rounded-[2rem] font-display font-bold p-2 transition-all duration-700`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/stock"
          className={({ isActive }) =>
            `h-[3rem] px-5 flex items-center justify-center text-sm ${
              isActive ? 'bg-white text-blue' : 'text-white hover:bg-white hover:text-blue'
            } rounded-[2rem] font-display font-bold p-2 transition-all duration-700`
          }
        >
          Stock
        </NavLink>
        <NavLink
          to="/incomingTransactions"
          className={({ isActive }) =>
            `h-[3rem] px-5 flex items-center justify-center text-sm ${
              isActive ? 'bg-white text-blue' : 'text-white hover:bg-white hover:text-blue'
            } rounded-[2rem] font-display font-bold p-2 transition-all duration-700`
          }
        >
          Incoming Transactions
        </NavLink>
        <NavLink
          to="/outgoingTransactions"
          className={({ isActive }) =>
            `h-[3rem] px-5 flex items-center justify-center text-sm ${
              isActive ? 'bg-white text-blue' : 'text-white hover:bg-white hover:text-blue'
            } rounded-[2rem] font-display font-bold p-2 transition-all duration-700`
          }
        >
          Outgoing Transactions
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
