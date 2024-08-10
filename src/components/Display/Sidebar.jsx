import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/LOGO2.svg";

const Sidebar = () => {
  return (
    <div className="ml-3 bg-blue mt-5 h-[80%] flex flex-col items-center text-white pt-4 px-6 shadow-xl ">
      <div className="font-display text-lg mb-8">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="h-[60%] space-y-4 flex flex-col items-center justify-center">
        <div className="flex items-center">
          <Link to="/employees">
            <span className="h-[3rem] px-5 flex items-center justify-center text-sm text-white hover:bg-white hover:text-blue rounded-[2rem] font-display font-bold p-2 transition-all duration-700">
              Employees
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/products">
            <span className="h-[3rem] px-5 flex items-center justify-center text-sm text-white hover:bg-white hover:text-blue rounded-[2rem] font-display font-bold p-2 transition-all duration-700">
              Products
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/stock">
            <span className="h-[3rem] px-5 flex items-center justify-center text-sm text-white hover:bg-white hover:text-blue rounded-[2rem] font-display font-bold p-2 transition-all duration-700">
              Stock
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/incomingTransactions">
            <span className="h-[3rem] px-5 flex items-center justify-center text-sm text-white hover:bg-white hover:text-blue rounded-[2rem] font-display font-bold p-2 transition-all duration-700">
              Incoming Transactions
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/outgoingTransactions">
            <span className="h-[3rem] px-5 flex items-center justify-center text-sm text-white hover:bg-white hover:text-blue rounded-[2rem] font-display font-bold p-2 transition-all duration-700">
              Outgoing Transactions
            </span>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <span className="h-[3rem] px-5 flex items-center justify-center text-sm text-white hover:bg-white hover:text-blue rounded-[2rem] font-display font-bold p-2 transition-all duration-700">
            Profile
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

