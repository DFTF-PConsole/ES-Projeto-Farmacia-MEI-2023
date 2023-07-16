import React from 'react';
import { useNavigate } from 'react-router-dom';
import './logout.css'

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    
    navigate('/');
  };

  return (  
    <button className='logout-button' onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
