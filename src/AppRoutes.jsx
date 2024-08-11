import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import StudentsView from './components/Display/EmployeeView';
import Signup from './components/Signup';
import ProductsView from './components/Display/ProductsView';
import StockView from './components/Display/StockView'
import OutgoingTransactionsView from './components/Display/OutgoingTransactionsView'
import IncomingTransactionsView from './components/Display/IncomingTransactionsView'

const AppRoutes = () => {
  return(
  <Router>
    <Routes>
      <Route exact path="/" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/employees" element={<StudentsView/>} />
      <Route path="/login" element={<Login/>} />
      <Route path='/products'  element={<ProductsView/>} />
      <Route path="/stock" element={<StockView/>}/>
      <Route path="/incomingTransactions" element={<IncomingTransactionsView />} />
      <Route path="/outgoingTransactions" element={<OutgoingTransactionsView />} />
    </Routes>
  </Router>
  );
};

export default AppRoutes;