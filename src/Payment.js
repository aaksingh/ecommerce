import React, { useState, useEffect } from "react";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import "./Payment.css";
import CurrencyFormat from 'react-currency-format'
import { getBasketTotal } from './reducer';
import { Link } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "./axios.js";
import { useHistory } from 'react-router-dom';
import { computeHeadingLevel } from "@testing-library/react";
import {db } from './firebase.js'

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();
   const history = useHistory();
  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState("")
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret,setClientSecret] = useState(true);
  useEffect (()=>{
    
     
     const getClientSecret = async ()=> {
        const response = await axios({
            method:'post',
            url: `/payments/create?total=${getBasketTotal(basket)*100}`
        });
        
        setClientSecret(response.data.clientSecret);
     }
     getClientSecret();


  },[basket])
  
  const handleSubmit = async (event) => {
      event.preventDefault();
      setProcessing(true);

      const payload = await stripe.confirmCardPayment(clientSecret, {
          payment_method:{
              card: elements.getElement(CardElement)
          }
      }).then(({ paymentIntent}) =>{
          // console.log(user)
          // db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
          //     basket:basket,
          //     amount :paymentIntent.amount,
          //     created:paymentIntent.created
      //})
          setSucceeded(true)
          setError(null)
          setProcessing(false)
          // dispatch({
          //     type: 'EMPTY_BASKET',
          // })
          // history.replace('./orders')
      })

  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <h2>
          Checkout(
          <Link to="/checkout">{basket?.length} items</Link>)
        </h2>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>Bhajanpura</p>
            <p>Delhi</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Reviews and Delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total:{value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button disabled = {processing || disabled || succeeded}>
                    <span>{processing ?<p>Processing</p>: "Buy Now"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
