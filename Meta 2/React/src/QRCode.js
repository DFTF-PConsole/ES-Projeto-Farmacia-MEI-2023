import React from 'react';
import { useNavigate } from 'react-router-dom';
import useProtectedRoute from './ProtectRoutes';
import './QRCode.css';
import LogoutButton from './logout';
import OrdersButton from './checkOrders';

const QRCode = () => {
  const navigate = useNavigate();

  useProtectedRoute();

  const handleButtonClick = () => {
    navigate('/listdrugs');
  };

  return (
    <div className='container'>
    <OrdersButton />
    <LogoutButton /> 
      <h1>Scan the QR Code</h1>
      <button className = "button" onClick={handleButtonClick}>
        Prescription
      </button>
    </div>
  );
};

export default QRCode;
