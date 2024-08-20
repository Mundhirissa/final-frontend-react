import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Bookingdetailbystadium = () => {
    const { stadiumid } = useParams();
    const [bookings, setBookings] = useState([]);
    const [date, setDate] = useState('');
    const [stadiumName, setStadiumName] = useState(''); // State to hold the stadium name
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    useEffect(() => {
        if (stadiumid) {
            // Fetch the stadium details to get the stadium name
            axios.get(`http://localhost:8080/api/stadiums/${stadiumid}`)
                .then(response => {
                    setStadiumName(response.data.name); // Store the stadium name
                })
                .catch(error => {
                    console.error("There was an error fetching the stadium details!", error);
                });

            // Fetch the bookings for the specific stadium
            axios.get(`http://localhost:8080/api/bookings/stadium/${stadiumid}`)
                .then(response => {
                    setBookings(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the bookings!", error);
                });
        }
    }, [stadiumid]);

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleDateSearch = () => {
        axios.get(`http://localhost:8080/api/bookings/date/${date}`)
            .then(response => {
                setBookings(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the bookings by date!", error);
            });
    };

    const back = () => {
        if (role === 'admin') {
            navigate('/List-stadium');
        } else {
            navigate('/List-stadium-user');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Bookings for {stadiumName}</h2> {/* Display the stadium name */}
            <div className="mb-4">
                <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    className="form-control d-inline-block"
                    style={{ width: 'auto', marginRight: '10px' }}
                />
                <button onClick={handleDateSearch} className="btn btn-primary">Search</button>
            </div>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>Booking ID</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>User</th>
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
                            <td>{booking.user.username}</td>
                            <td>{booking.category.categoryname}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-danger" onClick={back}>Back</button>
        </div>
    );
};

export default Bookingdetailbystadium;
