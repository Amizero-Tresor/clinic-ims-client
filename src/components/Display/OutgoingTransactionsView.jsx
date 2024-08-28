import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashCard from './DashCard';
import OutgoingTransactionsTable from './OutgoingTransactionsTable';
import { AiOutlineMenu } from 'react-icons/ai';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen font-display">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-4 md:p-8 ${sidebarOpen ? 'ml-[200px] md:ml-[250px]' : 'ml-0'}`}>
        <button
          className="md:hidden text-2xl p-4"
          onClick={toggleSidebar}
        >
          <AiOutlineMenu />
        </button>
        <DashCard />
        <OutgoingTransactionsTable />
      </div>
    </div>
  );
};

export default Dashboard;
