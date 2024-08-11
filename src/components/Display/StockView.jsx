import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Cards from './Card';
import StockTable from './StockTable'
import { getEmployees } from '../../services/employeeService';
import { getProducts } from '../../services/productService';
import DashCard from './DashCard';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [employees, setEmployees] = useState([]);
  const [stock, setStock] = useState([]);
  const getDataFunc = async()=>{
    const employees = await getEmployees();
    const stock = await getProducts();
    setStock(stock);
    // const users = await ();
    console.log(employees, stock);
    setEmployees(employees);
  }

  useEffect(()=>{
    getDataFunc();
  },[])
  return (
    <div className="flex h-screen font-display">
      <Sidebar />
      <div className="flex-1 p-8">
        <DashCard/>
        <StockTable />
      </div>
    </div>
  );
};

export default Dashboard;
