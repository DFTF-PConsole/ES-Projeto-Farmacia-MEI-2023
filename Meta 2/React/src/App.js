/*import { useState, useEffect } from 'react'

const MyClock2 = () => {
	const [seconds, updatefunction] = useState(0) 

	useEffect(() => {
		const timerId = setInterval(() => updatefunction(seconds => seconds + 1), 1000)
	
		return () => {
			clearInterval(timerId);
		}
	}, []);

	return (
		(<h2>Seconds elapsed: {seconds}</h2>)
	);
}
export default MyClock2;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from './logout';

import ShoppingCart from './ShoppingCart';

const DrugList = () => {
  const [drugs, setDrugs] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchDrugs();
  }, []);

  useEffect(() => {
    sendToAWSWorkflow();
  }, [cartItems]);

  const fetchDrugs = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/createDrugs/');
      const data = await response.json();
      setDrugs(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addToCart = (drug) => {
    setCartItems((prevCartItems) => [...prevCartItems, drug]);
  };

  const sendToAWSWorkflow = () => {
    // Perform the AWS workflow integration here
    // ...
    console.log('Sending drugs to AWS workflow:', cartItems);
  };

  return (
    <div>
      <h1>Drug List</h1>
      <LogoutButton /> 
      <ul>
      {drugs.map((drug) => (
          <li key={drug.id}>
            <strong> Name:</strong> {drug.name}, 
            <strong> Manufacturer:</strong> {drug.manufacturer}, 
            <strong> Price:</strong> {drug.price}, 
            <strong> Quantity:</strong> {drug.quantity}
          
            <strong> Alternatives:</strong> {drug.alternatives.map((drug1, index) => (
             <span key={drug1.id}>
                <br />
                <strong> Name:</strong> {drug1.name}, 
                <strong> Manufacturer:</strong> {drug1.manufacturer}, 
                <strong> Price:</strong> {drug1.price}, 
                <strong> Quantity:</strong> {drug1.quantity}
                
             </span>
            ))}
             <br />
          
          </li>
        ))}
      </ul>
      <ShoppingCart cartItems={cartItems} />
    </div>

  );
};

export default DrugList;


*/
import React, { useEffect, useState } from 'react';
import useProtectedRoute from "./ProtectRoutes";
import LogoutButton from './logout';
import { useNavigate } from 'react-router-dom';
import OrdersButton from './checkOrders';
//import './App.css';

const DrugList = () => {
  const navigate = useNavigate();
  const [drugs, setDrugs] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useProtectedRoute();

  
  useEffect(() => {
    fetchDrugs();
  }, []);

  useEffect(() => {
    console.log(cartItems);


  }, [cartItems]);

  const addToCart = (drug) => {
    const isAlreadyInCart = cartItems.some(
      (item) => item.name === drug.name || drug.alternatives.some((alt) => alt.name === item.name)
    );
  
    if (!isAlreadyInCart) {
      setCartItems((prevCartItems) => [...prevCartItems, drug]);
    }
  
  };

  const addToCartAlternative = (drug, alternative) => {
    const isAlreadyInCart = cartItems.some(
      (item) => item.name === alternative.name || item.name === drug.name || drug.alternatives.some((alt) => alt.name === item.name)
    );
  
    if (!isAlreadyInCart) {
      setCartItems((prevCartItems) => [...prevCartItems, alternative]);
    }
  
  };

  const toPayment = () => {
    navigate('/payment', {state:{cartItems}});
  }

  
  
  const fetchDrugs = async () => {
    try {
      
      const response = await fetch('http://djangoEB-env.eba-iprn24hb.us-west-2.elasticbeanstalk.com/createDrugs/');  // Replace with your API endpoint
      const data = await response.json();
      setDrugs(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Drug List</h1>
      <LogoutButton />
      <OrdersButton />

      <ul>
      {drugs.map((drug) => (
          <li key={drug.id}>
            <strong> Name:</strong> {drug.name}, 
            <strong> Manufacturer:</strong> {drug.manufacturer}, 
            <strong> Price:</strong> {drug.price}, 
            <strong> Quantity:</strong> {drug.quantity}
            <button onClick={() => addToCart(drug)}
              disabled={
                cartItems.some(
                  (item) => item.name === drug.name || drug.alternatives.some((alt) => alt.name === item.name)
                )
              }>Add to Cart</button>

            <strong> Alternatives:</strong> {drug.alternatives.map((drug1, index) => (
             <span key={drug1.id}>
                <br />
                <strong> Name:</strong> {drug1.name}, 
                <strong> Manufacturer:</strong> {drug1.manufacturer}, 
                <strong> Price:</strong> {drug1.price}, 
                <strong> Quantity:</strong> {drug1.quantity}
                <button onClick={() => addToCartAlternative(drug, drug1)}
                disabled={
                  cartItems.some(
                    (item) => item.name === drug.name || drug.alternatives.some((alt) => alt.name === item.name)
                  )
                }>Add to Cart</button>
             </span>
            ))}
             <br />
          
          </li>
        ))}
      </ul>

      {(cartItems.length === drugs.length) && (
        <button onClick={toPayment}>Finish Buy</button>
      )}
      
    </div>

  );
};

export default DrugList;