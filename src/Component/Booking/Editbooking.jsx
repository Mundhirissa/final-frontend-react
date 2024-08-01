import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Liststadium } from '../../Services/Stadiumservices';
import { Listcategory } from '../../Services/Categoryservices';
import { getBookingById, updatebooking } from '../../Services/Bookingservices';

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
        console.log("Booking ID:", bookingId); // Debugging log

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

        console.log("Payload to be sent:", payload); // Debugging log

        updatebooking(bookingId, payload).then(() => {
            alert('Booking updated successfully');
            navigate('/List-booking');
        }).catch(error => {
            console.error('Error updating booking:', error);
        });
    };

    return (
        <div>
            <h2>Edit Booking</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Date:</label>
                    <input type="date" name="date" value={booking.date} onChange={handleChange} required />
                </div>
                <div>
                    <label>Start Time:</label>
                    <input type="time" name="startTime" value={booking.startTime} onChange={handleChange} required />
                </div>
                <div>
                    <label>End Time:</label>
                    <input type="time" name="endTime" value={booking.endTime} onChange={handleChange} required />
                </div>
                <div>
                    <label>Category:</label>
                    <select name="category" value={booking.category} onChange={handleChange} required>
                        {categories.map(cat => (
                            <option key={cat.categoryid} value={cat.categoryname}>{cat.categoryname}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Stadium:</label>
                    <select name="stadium" value={booking.stadium} onChange={handleChange} required>
                        {stadiums.map(stadium => (
                            <option key={stadium.stadiumid} value={stadium.name}>{stadium.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Status:</label>
                    <input type="text" name="status" value={booking.status} onChange={handleChange} required />
                </div>
                <div>
                    <label>User:</label>
                    <input type="text" name="user" value={booking.user?.username || ''} disabled />
                </div>
                <button type="submit">Update Booking</button>
            </form>
        </div>
    );
}

export default EditBooking;
