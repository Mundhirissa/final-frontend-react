import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Retrieve username from local storage
        const username = localStorage.getItem('username');
        if (username) {
            // Fetch bookings from the backend
            axios.get(`http://localhost:8080/api/bookings/username/${username}`)
                .then(response => {
                    setBookings(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
        } else {
            setError('Username not found in local storage');
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message || error}</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h1>Bookings</h1>
                </div>
                <div className="card-body">
                    {bookings.length > 0 ? (
                        <table className='table table-striped table-bordered'>
                            <thead>
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Date</th>
                                    <th>Start-Time</th>
                                    <th>End-Time</th>
                                    <th>User</th>
                                    <th>Stadium Name</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map(booking => (
                                    <tr key={booking.bookingId}>
                                        <td>{booking.bookingId}</td>
                                        <td>{booking.date}</td>
                                        <td>{booking.startTime}</td>
                                        <td>{booking.endTime}</td>
                                        <td>{booking.user?.username}</td>
                                        <td>{booking.stadium?.name}</td>
                                        <td>{booking.category?.categoryname}</td>
                                        <td style={{ color: booking.status === 'Confirmed' ? 'green' : 'red' }}>
                                            {booking.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No bookings found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Bookings;
