
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { username } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/bookings/username/${username}`)
            .then(response => {
                setBookings(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [username]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message || error}</div>;
    }

    return (
        <div>
            <h1>Bookings for {username}</h1>
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

export default UserDetails;
