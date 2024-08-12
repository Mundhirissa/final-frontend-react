import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

const PaymentPage = () => {
  const { bookingId } = useParams();
  const [controlNumber, setControlNumber] = useState(null);
  const [amount, setAmount] = useState(null);
  const [stadium, setStadium] = useState(null);
  const [paymentstatus, setPaymentstatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/payments/${bookingId}`);
        const data = response.data;
        console.log('Fetched data:', data);
        if (data.controlNumber) {
          setControlNumber(data.controlNumber);
          setAmount(data.amount);
          setStadium(data.booking.stadium);
          setPaymentstatus(data.paymentstatus);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPaymentDetails();
  }, [bookingId]);
  

  const generateControlNumber = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/payments/generate-control-number', { bookingId });
      const data = response.data;
      setControlNumber(data.controlNumber);
      setAmount(data.amount);
      setStadium(data.stadium);
      setPaymentstatus(data.paymentstatus);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <h1 className="mt-4">Payment for Booking ID: {bookingId}</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {controlNumber ? (
        <Card className="mt-4">
          <Card.Header as="h5">Payment Details</Card.Header>
          <Card.Body>
            <Card.Text>
              <strong>Control Number:</strong> {controlNumber}
            </Card.Text>
            <Card.Text>
              <strong>Amount:</strong> {amount}
            </Card.Text>
            <Card.Text>
              <strong>Stadium:</strong> {stadium?.name}
            </Card.Text>
            <Card.Text>
              <strong>Status:</strong> {paymentstatus}
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Button className="mt-4" onClick={generateControlNumber}>Generate Control Number</Button>
      )}
    </div>
  );
};

export default PaymentPage;
