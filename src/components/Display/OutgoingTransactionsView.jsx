import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashCard from './DashCard';
import OutgoingTransactionTable from './OutgoingTransactionsTable';
import { AiOutlineMenu } from 'react-icons/ai';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen font-display">
      <div className=' flex h-full items-start mt-8'> <button
        className="md:hidden text-2xl p-4"
        onClick={toggleSidebar}
      >
        <AiOutlineMenu />
      </button></div>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 p-4 md:p-8">
        <DashCard />
        <OutgoingTransactionTable />
      </div>
    </div>
  );
};

export default Dashboard;
