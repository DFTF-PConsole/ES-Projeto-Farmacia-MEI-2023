import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Login';
import DrugList from './App';
import QRCode from './QRCode';
import PaymentPage from './payment';
import ExecutionList from './Orders';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/listDrugs" element={<DrugList />} />
      <Route path="/readPrescription" element={<QRCode/>} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/ordersList" element={<ExecutionList />} />
      

    </Routes>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default AppRouter;