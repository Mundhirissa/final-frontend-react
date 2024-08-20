// PaymentComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentComponent = () => {
  const [payment, setPayment] = useState(null);
  const [controlNumber, setControlNumber] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayment = async () => {
      if (controlNumber) {
        try {
          const response = await axios.get(`http://localhost:8080/api/payments/payment/${controlNumber}`);
          setPayment(response.data);
        } catch (error) {
          setError(error.message);
        }
      }
    };
    fetchPayment();
  }, [controlNumber]);

  const handleControlNumberChange = (event) => {
    setControlNumber(event.target.value);
  };

  return (
    <div>
      <h2>Payment Details</h2>
      <input
        type="text"
        value={controlNumber}
        onChange={handleControlNumberChange}
        placeholder="Enter control number"
      />
      {payment && (
        <div>
          <p>Payment ID: {payment.paymentid}</p>
          <p>Amount: {payment.amount}</p>
          <p>Payment Status: {payment.paymentstatus}</p>
          <p>Payment Date: {payment.paymentdate}</p>
          <p>Control Number: {payment.controlNumber}</p>
          <p>Firstname: {payment.booking.user?.firstname}</p>
          <p>Lastname: {payment.booking.user?.lastname}</p>
          <p>Username: {payment.booking.user?.username}</p>
          <p>Booking date: {payment.booking.date}</p>
         
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default PaymentComponent;