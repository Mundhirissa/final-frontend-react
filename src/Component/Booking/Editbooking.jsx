
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Liststadium } from '../../Services/Stadiumservices';
import { Listcategory } from '../../Services/Categoryservices';
import { getBookingById, updatebooking } from '../../Services/Bookingservices';
import 'bootstrap/dist/css/bootstrap.min.css';

function EditBooking() {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState({
        date: '',
        startTime: '',
        endTime: '',
        category: '',
        stadium: '',
        status: '',
        user: ''
    });
    const [categories, setCategories] = useState([]);
    const [stadiums, setStadiums] = useState([]);

    useEffect(() => {
        if (bookingId) {
            getBookingById(bookingId).then(response => {
                setBooking(response.data);
            }).catch(error => {
                console.error('Error fetching booking details:', error);
            });

            Listcategory().then(response => {
                setCategories(response.data);
            }).catch(error => {
                console.error('Error fetching categories:', error);
            });

            Liststadium().then(response => {
                setStadiums(response.data);
            }).catch(error => {
                console.error('Error fetching stadiums:', error);
            });
        }
    }, [bookingId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBooking(prevBooking => ({
            ...prevBooking, 
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            ...booking,
            category: categories.find(cat => cat.categoryname === booking.category),
            stadium: stadiums.find(stadium => stadium.name === booking.stadium),
        };

        updatebooking(bookingId, payload).then(() => {
            alert('Booking updated successfully');
            navigate('/List-booking');
        }).catch(error => {
            console.error('Error updating booking:', error);
        });
    };

    const cancel = () => {
        navigate('/List-booking'); // Adjust the path as needed
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>Edit Booking</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label>Date:</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                name="date" 
                                value={booking.date} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Start Time:</label>
                            <input 
                                type="time" 
                                className="form-control" 
                                name="startTime" 
                                value={booking.startTime} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>End Time:</label>
                            <input 
                                type="time" 
                                className="form-control" 
                                name="endTime" 
                                value={booking.endTime} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Category:</label>
                            <select 
                                className="form-control" 
                                name="category" 
                                value={booking.category} 
                                onChange={handleChange} 
                                required
                            >
                                {categories.map(cat => (
                                    <option key={cat.categoryid} value={cat.categoryname}>{cat.categoryname}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label>Stadium:</label>
                            <select 
                                className="form-control" 
                                name="stadium" 
                                value={booking.stadium} 
                                onChange={handleChange} 
                                required
                            >
                                {stadiums.map(stadium => (
                                    <option key={stadium.stadiumid} value={stadium.name}>{stadium.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label>Status:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="status" 
                                value={booking.status} 
                                onChange={handleChange} 
                                required 
                                disabled
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>User:</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="user" 
                                value={booking.user?.username || ''} 
                                disabled 
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-outline-primary me-2" type="submit">Update Booking</button>
                            <button className="btn btn-outline-danger" type="button" onClick={cancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditBooking;
