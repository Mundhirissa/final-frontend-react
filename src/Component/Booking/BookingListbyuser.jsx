import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        <div>
            <h1>Bookings</h1>
            {bookings.length > 0 ? (
                <table className='table table-striped table table-bordered'>
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>User</th>
                            <th>Stadium name</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(booking => (
                            <tr key={booking.Bookingid}>
                                <td>{booking.Bookingid}</td>
                                <td>{booking.date}</td>
                                <td>{booking.time}</td>
                                <td>{booking.user?.username}</td>
                                <td>{booking.stadium?.name}</td>
                                <td>{booking.category?.categoryname}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No bookings found</p>
            )}
        </div>
    );
};

export default Bookings;
