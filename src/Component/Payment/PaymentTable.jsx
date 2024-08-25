import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function PaymentTable() {
    const [payments, setPayments] = useState([]);
    const stadiumId = localStorage.getItem('stadiumId');

    useEffect(() => {
        // Fetch payments by stadium ID
        const fetchPayments = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/payments/stadium/${stadiumId}`);
                setPayments(response.data);
            } catch (error) {
                console.error('Error fetching payment data:', error);
            }
        };

        if (stadiumId) {
            fetchPayments();
        }
    }, [stadiumId]);

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>Payment Details</h2>
                </div>
                <div className="card-body">
                    <table className='table table-striped table-bordered'>
                        <thead className="table-dark">
                            <tr>
                                <th>Payment ID</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Control Number</th>
                                <th>Booking ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.length > 0 ? (
                                payments.map(payment => (
                                    <tr key={payment.paymentid}>
                                        <td>{payment.paymentid}</td>
                                        <td>{payment.amount}</td>
                                        <td>{payment.paymentstatus}</td>
                                        <td>{payment.paymentdate}</td>
                                        <td>{payment.controlNumber}</td>
                                        <td>{payment.booking ? payment.booking.bookingId : 'N/A'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No payments found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
