
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { deletebyidbooking } from '../../Services/Bookingservices';
import { FaTimes, FaEdit } from 'react-icons/fa';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function handleCancelBooking(bookingId) {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            axios.put(`http://localhost:8080/api/bookings/${bookingId}/cancel`)
                .then(response => {
                    alert("Booking canceled successfully");
                    setBookings(prevBookingList => prevBookingList.map(booking =>
                        booking.bookingId === bookingId ? { ...booking, status: "Canceled" } : booking
                    ));
                })
                .catch(error => {
                    console.error('Error canceling booking:', error);
                });
        }
    }

    function handleDeletebooking(bookingId) {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
        // Handle booking deletion logic
        deletebyidbooking(bookingId).then(response => {
            alert("Booking deleted successfully");
            // Update state after deletion
            setBookings(prevBookingList => prevBookingList.filter(booking => booking.bookingId !== bookingId));
        }).catch(error => {
            console.error('Error deleting booking:', error);
        });
    }
    }

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
                            <thead className="table-dark">
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Date</th>
                                    <th>Start-Time</th>
                                    <th>End-Time</th>
                                    <th>User</th>
                                    <th>Stadium Name</th>
                                    <th>Category</th>
                                    <th>Status</th>
                                    <th>Action</th>
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
                                        <td>
                                        {/* <button className='btn btn-outline-danger me-2' onClick={() => handleDeletebooking(booking.bookingId)}>
                                            Cancel
                                        </button> */}
                                        <button className='btn btn-warning' onClick={() => handleCancelBooking(booking.bookingId)}
                                            
                                            disabled={booking.status==="Confirmed"}>Cancel</button> {/* Cancel Button */}
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
