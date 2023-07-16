import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

import axios from 'axios';
import useProtectedRoute from './ProtectRoutes';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://djangoEB-env.eba-iprn24hb.us-west-2.elasticbeanstalk.com/login/', {
        username,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);

      navigate('/readPrescription');
    } catch (error) {
     setError('Invalid username or password');
   }
  };

  return (
    <div className='container'>
     
      <form className='login-form' onSubmit={handleLogin}>
         <h2>Login</h2>
          {error && <p className = "error"> {error}</p>}
          <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" >Login</button>
        
      </form>
    </div>
  );
};

export default LoginPage;