import React, { useEffect, useState } from 'react';
import Cards from './Card';
import { getEmployees } from '../../services/employeeService';
import { getProducts } from '../../services/productService';

const DashCard = () => {
  const user = JSON.parse(localStorage.getItem("user") ?? "{}");
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [loadingStock, setLoadingStock] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [stock, setStock] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const employeesData = await getEmployees();
      setEmployees(employeesData);
      setLoadingEmployees(false);

      const stockData = await getProducts();
      setStock(stockData);
      setLoadingStock(false);
    };
    

    fetchData();
  }, []);

  return (
    <>
      <header className="mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-blue">Dashboard</h1>
        <p className="text-base md:text-lg text-gray-500">Hello there, {`${user?.firstName} ${user?.lastName}`}</p>
      </header>
      <div className="grid grid-cols- 4 md:grid-cols-6 gap-2 mb-8 w-full">
        <Cards title="Employees" count={employees.length} loading={loadingEmployees} />
        <Cards title="Types of products" count={stock.length} loading={loadingStock} />
      </div>
    </>
  );
};

export default DashCard;
