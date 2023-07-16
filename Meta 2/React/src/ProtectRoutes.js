import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useProtectedRoute = () => {
    const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      
      try {
        const response = await axios.get("http://djangoEB-env.eba-iprn24hb.us-west-2.elasticbeanstalk.com/validateSession/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        } catch (error) {
          navigate('/');

      }
    };

    fetchData();
  });
};

export default useProtectedRoute;
