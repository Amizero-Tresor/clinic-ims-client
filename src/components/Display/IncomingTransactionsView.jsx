import React from 'react';
import Sidebar from './Sidebar';
import Cards from './Card';
import IncomingTransactionTable from './IncomingTransactionsTable';
import DashCard from './DashCard';

const Dashboard = () => {

  return (
    <div className="flex h-screen font-display">
      <Sidebar />
      <div className="flex-1 p-8">
        <DashCard/>
        <IncomingTransactionTable />
      </div>
    </div>
  );
};

export default Dashboard;
