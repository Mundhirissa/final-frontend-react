import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { confirmBooking, deletebyidbooking } from '../../Services/Bookingservices';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Bookingliststaff = () => {
    const [bookings, setBookings] = useState([]);
    const [stadiumName, setStadiumName] = useState('');
    const stadiumId = localStorage.getItem('stadiumId'); // Assuming stadium ID is saved in local storage

    function handleConfirmBooking(bookingId) {
        if (window.confirm('Are you sure you want to confirm this booking?')) {
            confirmBooking(bookingId).then(response => {
                alert("Booking confirmed successfully");
                setBookings(prevBookingList => prevBookingList.map(booking =>
                    booking.bookingId === bookingId ? { ...booking, status: "Confirmed" } : booking
                ));
            }).catch(error => {
                console.error('Error confirming booking:', error);
            });
        }
    }

    function handleDeletebooking(bookingId) {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            deletebyidbooking(bookingId).then(response => {
                alert("Booking deleted successfully");
                setBookings(prevBookingList => prevBookingList.filter(booking => booking.bookingId !== bookingId));
            }).catch(error => {
                console.error('Error deleting booking:', error);
            });
        }
    }

    useEffect(() => {
        if (stadiumId) {
            axios.get(`http://localhost:8080/api/stadiums/${stadiumId}`)
                .then(response => {
                    setStadiumName(response.data.name); // Save the stadium name
                })
                .catch(error => {
                    console.error("There was an error fetching the stadium details!", error);
                });

            axios.get(`http://localhost:8080/api/bookings/stadium/${stadiumId}`)
                .then(response => {
                    setBookings(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the bookings!", error);
                });
        }
    }, [stadiumId]);

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>Bookings for {stadiumName}</h2> {/* Display the stadium name */}
                </div>
                <div className="card-body">
                    <table className='table table-striped table-bordered'>
                        <thead className="table-dark">
                            <tr>
                                <th>Booking ID</th>
                                <th>Date</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Status</th>
                                <th>User</th>
                                <th>Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.bookingId}>
                                    <td>{booking.bookingId}</td>
                                    <td>{booking.date}</td>
                                    <td>{booking.startTime}</td>
                                    <td>{booking.endTime}</td>
                                    <td style={{ color: booking.status === 'Confirmed' ? 'green' : 'red' }}>
                                        {booking.status}
                                    </td>
                                    <td>{booking.user ? booking.user.username : 'N/A'}</td>
                                    <td>{booking.category ? booking.category.categoryname : 'N/A'}</td>
                                    <td>
                                        <button className='btn btn-outline-danger me-2' onClick={() => handleDeletebooking(booking.bookingId)}>
                                            <FaTrash />
                                        </button>
                                        <Link to={`/edit-booking/${booking.bookingId}`} className='btn btn-outline-info me-2'>
                                            <FaEdit />
                                        </Link>
                                        <button
                                            className='btn btn-success me-2'
                                            onClick={() => handleConfirmBooking(booking.bookingId)}
                                            disabled={booking.status === 'canceled'}
                                        >
                                            Confirm
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Bookingliststaff;
