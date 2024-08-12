
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Listbooking, deletebyidbooking, confirmBooking } from '../../Services/Bookingservices';

export default function BookingList() {
    const [bookingList, setBookingList] = useState([]);
    const { bookingId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch booking list from API
        Listbooking().then(response => {
            setBookingList(response.data);
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    function handleDeletebooking(bookingId) {
        if (window.confirm('Are you sure you want to delete this booking?')) {
        // Handle booking deletion logic
        deletebyidbooking(bookingId).then(response => {
            alert("Booking deleted successfully");
            // Update state after deletion
            setBookingList(prevBookingList => prevBookingList.filter(booking => booking.bookingId !== bookingId));
        }).catch(error => {
            console.error('Error deleting booking:', error);
        });
    }
    }

    function handleConfirmBooking(bookingId) {
        // Handle booking confirmation logic
        confirmBooking(bookingId).then(response => {
            alert("Booking confirmed successfully");
            // Update booking status in state
            setBookingList(prevBookingList => prevBookingList.map(booking =>
                booking.bookingId === bookingId ? { ...booking, status: "Confirmed" } : booking
            ));
        }).catch(error => {
            console.error('Error confirming booking:', error);
        });
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>List Booking</h2>
                </div>
                <div className="card-body">
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Start-Time</th>
                                <th>End-Time</th>
                                <th>Username</th>
                                <th>Category Name</th>
                                <th>Stadium Name</th>
                                <th>Status</th>
                                {/* <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {bookingList.map(booking => (
                                <tr key={booking.bookingId}>
                                    <td>{booking.date}</td>
                                    <td>{booking.startTime}</td>
                                    <td>{booking.endTime}</td>
                                    <td>{booking.user?.username}</td>
                                    <td>{booking.category?.categoryname}</td>
                                    <td>{booking.stadium?.name}</td>
                                    <td style={{ color: booking.status === 'Confirmed' ? 'green' : 'red' }}>
                                        {booking.status}
                                    </td>
                                    {/* <td>
                                        <button className='btn btn-outline-danger me-2' onClick={() => handleDeletebooking(booking.bookingId)}>
                                            <FaTrash />
                                        </button>
                                        <Link to={`/edit-booking/${booking.bookingId}`} className='btn btn-outline-info me-2'>
                                            <FaEdit />
                                        </Link>
                                        <button className='btn btn-success' onClick={() => handleConfirmBooking(booking.bookingId)}>Confim</button>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}