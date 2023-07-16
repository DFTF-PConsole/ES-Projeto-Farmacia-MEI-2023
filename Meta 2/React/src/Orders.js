import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LogoutButton from './logout';

const ExecutionList = () => {
    const navigate = useNavigate();
    const [executions, setExecutions] = useState([]);
  //const location = useLocation();
  //const { executions } = location.state || {};

  useEffect(() => {
    fetchExecutions();
  }, []);

  const fetchExecutions = async () => {
    try {
      
      const response = await fetch('http://djangoEB-env.eba-iprn24hb.us-west-2.elasticbeanstalk.com/getExecutions/');  
      const data = await response.json();
      setExecutions(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      <LogoutButton />
      <button className='orders-button' onClick={() => navigate('/readPrescription')}>
        Prescriptions
      </button>
      <ul>
        {executions.map((execution, index) => (
          <li key={index}>
            <strong>Status:</strong> {execution.status}<br />
            <strong>Date:</strong> {execution.stopDate}<br />
            <strong>Drugs:</strong> {execution.input}<br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExecutionList;
