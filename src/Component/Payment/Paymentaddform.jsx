import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Paymentaddform = () => {
  const [controlNumber, setControlNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/payments/make-payment', {
        controlNumber,
        amount,
      });
      setMessage(response.data);
      // Optionally navigate to another page after successful payment
      // navigate('/some-page');
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data); // Shows the server's error message
      } else {
        setMessage('An error occurred.'); // For network or other errors
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>Make a Payment</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handlePayment}>
            <div className="form-group mb-3">
              <label htmlFor="controlNumber">Control Number</label>
              <input
                type="text"
                id="controlNumber"
                className="form-control"
                placeholder="Enter control number"
                value={controlNumber}
                onChange={(e) => setControlNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="amount">Amount</label>
              <input
                type="text"
                id="amount"
                className="form-control"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button className="btn btn-outline-primary me-2" type="submit">Pay</button>
              <button className="btn btn-outline-danger" type="button" onClick={() => navigate('/some-page')}>Cancel</button>
            </div>
            {message && <p className="mt-3">{message}</p>} {/* Displays the message */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Paymentaddform;
