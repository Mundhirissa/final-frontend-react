import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const CreateBooking = () => {
    const today = new Date().toISOString().split('T')[0];
    const [formData, setFormData] = useState({
        date: '',
        startTime: '',
        endTime: '',
        userid: '',
        stadiumid: '',
        categoryid: '',
        status: 'pending' // Set default status
    });

    const [users, setUsers] = useState([]);
    const [stadiums, setStadiums] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get('http://localhost:8080/api/users');
                setUsers(usersResponse.data);

                const stadiumsResponse = await axios.get('http://localhost:8080/api/stadiums');
                setStadiums(stadiumsResponse.data);

                const categoriesResponse = await axios.get('http://localhost:8080/api/categories');
                setCategories(categoriesResponse.data);

                // Automatically set the userid for the logged-in user
                const storedUsername = localStorage.getItem('username');
                if (storedUsername) {
                    const loggedInUser = usersResponse.data.find(user => user.username === storedUsername);
                    if (loggedInUser) {
                        setFormData(prevFormData => ({
                            ...prevFormData,
                            userid: loggedInUser.userid
                        }));
                    }
                } else {
                    setError('No logged-in user found');
                }
            } catch (error) {
                setError('Failed to fetch data');
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prevFormData => {
            const newFormData = { ...prevFormData, [name]: value };

            if (name === 'startTime') {
                // Set the min value for endTime to startTime
                newFormData.endTime = prevFormData.endTime < value ? value : prevFormData.endTime;
            }

            return newFormData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://localhost:8080/api/bookings', {
                date: formData.date,
                startTime: formData.startTime,
                endTime: formData.endTime,
                status: formData.status,
                user: { userid: parseInt(formData.userid) },
                stadium: { stadiumid: parseInt(formData.stadiumid) },
                category: { categoryid: parseInt(formData.categoryid) }
            });
            alert("Booking created");
            console.log('Booking created:', response.data);
            navigate('/Listbooking-confired');
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setError('The stadium is already booked at the selected date and time.');
            } else {
                setError('Failed to create booking');
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>Create Booking</h2>
                </div>
                <div className="card-body">
                    {error && <p className="text-danger">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Date:</label>
                            <input 
                                type="date" 
                                className="form-control" 
                                id="date" 
                                name="date" 
                                value={formData.date} 
                                onChange={handleChange} 
                                min={today}
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="startTime" className="form-label">Start Time:</label>
                            <input 
                                type="time" 
                                className="form-control" 
                                id="startTime" 
                                name="startTime"
                                value={formData.startTime} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="endTime" className="form-label">End Time:</label>
                            <input 
                                type="time" 
                                className="form-control" 
                                id="endTime" 
                                name="endTime"
                                value={formData.endTime} 
                                onChange={handleChange} 
                                min={formData.startTime} // Set min value to startTime
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userid" className="form-label">User:</label>
                            <select 
                                className="form-select" 
                                id="userid" 
                                name="userid"
                                value={formData.userid} 
                                onChange={handleChange} 
                                required
                                disabled
                            >
                                <option value="">Select User</option>
                                {users.map(user => (
                                    <option key={user.userid} value={user.userid}>{user.username}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="stadiumid" className="form-label">Stadium:</label>
                            <select 
                                className="form-select" 
                                id="stadiumid" 
                                name="stadiumid"
                                value={formData.stadiumid} 
                                onChange={handleChange} 
                                required
                            >
                                <option value="">Select Stadium</option>
                                {stadiums.map(stadium => (
                                    <option key={stadium.stadiumid} value={stadium.stadiumid}>{stadium.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="categoryid" className="form-label">Category:</label>
                            <select 
                                className="form-select" 
                                id="categoryid" 
                                name="categoryid"
                                value={formData.categoryid} 
                                onChange={handleChange} 
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category.categoryid} value={category.categoryid}>{category.categoryname}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-outline-primary">Create Booking</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateBooking;
