import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Cards from './Card';
import StockTable from './StockTable';
import { AiOutlineMenu } from 'react-icons/ai';
import { getEmployees } from '../../services/employeeService';
import { getProducts } from '../../services/productService';
import DashCard from './DashCard';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [stock, setStock] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const getDataFunc = async () => {
    const employees = await getEmployees();
    const stock = await getProducts();
    setStock(stock);
    setEmployees(employees);
  };

  useEffect(() => {
    getDataFunc();
  }, []);

  return (
    <div className="flex h-screen font-display">
      <div className=' flex h-full items-start mt-8'> <button
        className="md:hidden text-2xl p-4"
        onClick={toggleSidebar}
      >
        <AiOutlineMenu />
      </button></div>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        <DashCard />
        <StockTable />
      </div>
    </div>
  );
};

export default Dashboard;
