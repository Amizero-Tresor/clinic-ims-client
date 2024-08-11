import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Cards from './Card';
import StockTable from './StockTable'
import { getEmployees } from '../../services/employeeService';
import { getProducts } from '../../services/productService';

const DashCard = () => {
  const user = JSON.parse(localStorage.getItem("user") ?? "{}")
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [loadingStock, setLoadingStock] = useState(true);
  const [employees, setEmployees] = useState([])
  const [stock, setStock] = useState([])
  const getDataFunc = async()=>{
    const employees = await getEmployees();
    setLoadingEmployees(false)
    const stock = await getProducts();
    setStock(stock);
    setLoadingStock(false)
    // const users = await ();
    console.log(employees, stock);
    setEmployees(employees);
  }

  useEffect(()=>{
    getDataFunc();
  },[])
  console.log(new Date().getHours())
  const suffix = new Date().getHours() < 12 ? "Morning" : new Date().getHours() > 12 && new Date().getHours() < 14 ? "After Noon" : "Evening"
  return (
      <>
        <header className="mb-4">
          <h1 className="text-3xl font-bold text-blue">Dashboard</h1>
          <p className="text-lg text-gray-500">Good {suffix}, {user?.firstName + " " + user?.lastName}</p>
        </header>
        <div className="w-[45%] grid grid-cols-3 gap-2 mb-8">
          <Cards title="Employees" count={employees.length} loading={loadingEmployees}/>
          <Cards title="Laptops in stock" count={stock.length} loading={loadingStock}/>
          <Cards title="Users" count={40} loading={false}/>
        </div>
      </>
  )
}

export default DashCard
