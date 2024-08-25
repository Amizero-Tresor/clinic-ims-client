import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import StudentsView from './components/Display/EmployeeView';
import Signup from './components/Signup';
import ProductsView from './components/Display/ProductsView';
import StockView from './components/Display/StockView'
import OutgoingTransactionsView from './components/Display/OutgoingTransactionsView'
import IncomingTransactionsView from './components/Display/IncomingTransactionsView'
import AuthGuard from './components/AuthGuard';

const AppRoutes = () => {
  return(
  <Router>
    <Routes>
      <Route exact path="/" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/employees" element={<AuthGuard><StudentsView/></AuthGuard>} />
      <Route path="/login" element={<Login/>} />
      <Route path='/products'  element={<AuthGuard><ProductsView/></AuthGuard>} />
      <Route path="/stock" element={<AuthGuard><StockView/></AuthGuard>}/>
      <Route path="/incomingTransactions" element={<AuthGuard><IncomingTransactionsView /></AuthGuard>} />
      <Route path="/outgoingTransactions" element={<AuthGuard><OutgoingTransactionsView /></AuthGuard>} />
    </Routes>
  </Router>
  );
};

export default AppRoutes;