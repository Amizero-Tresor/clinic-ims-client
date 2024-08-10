import React from 'react';
import Sidebar from './Sidebar';
import Cards from './Card';
import StockTable from './StockTable'

const Dashboard = () => {

  return (
    <div className="flex h-screen font-display">
      <Sidebar />
      <div className="flex-1 p-8">
        <header className="mb-4">
          <h1 className="text-3xl font-bold text-blue">Dashboard</h1>
          <p className="text-lg text-gray-500">Good Morning, Tresor</p>
        </header>
        <div className="w-[40%] grid grid-cols-3 gap-2 mb-8">
          <Cards title="Employees" count={40} />
          <Cards title="Laptops in stock" count={40} />
          <Cards title="Users" count={40} />
        </div>
        <StockTable />
      </div>
    </div>
  );
};

export default Dashboard;
