import React from 'react';
import { useNavigate } from 'react-router-dom';
import './logout.css'

const OrdersButton = () => {
  const navigate = useNavigate();
  

  const handleRedirection = () => {
    // Clear token from local storage
    //localStorage.removeItem('token');
    
    // Redirect to login page
    navigate('/ordersList');
  };

  return (  
    <button className='orders-button' onClick={handleRedirection}>Check Orders</button>
  );
};

export default OrdersButton;
