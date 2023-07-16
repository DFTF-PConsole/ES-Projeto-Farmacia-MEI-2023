import { useNavigate, useLocation } from 'react-router-dom';
import LogoutButton from './logout';
import useProtectedRoute from './ProtectRoutes';
import axios from 'axios';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = location.state || {};

  useProtectedRoute();
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);


  const handlePayment = async () => {
    try {
      const response = await axios.post('http://djangoEB-env.eba-iprn24hb.us-west-2.elasticbeanstalk.com/payment/', {
        cartItems,
        totalPrice
      });

      navigate('/readPrescription');
    } catch (error) {
     console.log(error);
   }
  
    
  };


  return (
    <div>
      <h2>Payment Page</h2>
      <LogoutButton /> 
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <strong> Name:</strong> {item.name},
            <strong> Manufacturer:</strong> {item.manufacturer},
            <strong> Price:</strong> {item.price},
          </li>
        ))}
      </ul>
      <p>Total Price: {totalPrice}</p>
      
      <button onClick={handlePayment}>Make Payment With Money or Card</button>
      {/*<button onClick={handlePayment}>Make Payment With Face Recognition</button>*/}
    </div>
  );
};


export default PaymentPage;
