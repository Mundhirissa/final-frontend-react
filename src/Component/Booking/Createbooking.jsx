import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateBooking = () => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        userId: '',
        stadiumId: '',
        categoryId: ''
    });

    const [users, setUsers] = useState([]);
    const [stadiums, setStadiums] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get('http://localhost:8080/api/users');
                setUsers(usersResponse.data);

                const stadiumsResponse = await axios.get('http://localhost:8080/api/stadiums');
                setStadiums(stadiumsResponse.data);

                const categoriesResponse = await axios.get('http://localhost:8080/api/categories');
                setCategories(categoriesResponse.data);

                // Automatically set the userId for the logged-in user
                const storedUsername = localStorage.getItem('username');
                if (storedUsername) {
                    const loggedInUser = usersResponse.data.find(user => user.username === storedUsername);
                    if (loggedInUser) {
                        setFormData(prevFormData => ({
                            ...prevFormData,
                            userId: loggedInUser.userid
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
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://localhost:8080/api/bookings', {
                date: formData.date,
                time: parseInt(formData.time),  // Assuming time is in integer format
                user: { userid: parseInt(formData.userId) },
                stadium: { stadiumid: parseInt(formData.stadiumId) },
                category: { categoryid: parseInt(formData.categoryId) }
            });
            alert("Booking created");
            console.log('Booking created:', response.data);
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
            <h2>Create Booking</h2>
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
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="time" className="form-label">Time:</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="time" 
                        name="time" 
                        value={formData.time} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="userId" className="form-label">User:</label>
                    <select 
                        className="form-select" 
                        id="userId" 
                        name="userId" 
                        value={formData.userId} 
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
                    <label htmlFor="stadiumId" className="form-label">Stadium:</label>
                    <select 
                        className="form-select" 
                        id="stadiumId" 
                        name="stadiumId" 
                        value={formData.stadiumId} 
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
                    <label htmlFor="categoryId" className="form-label">Category:</label>
                    <select 
                        className="form-select" 
                        id="categoryId" 
                        name="categoryId" 
                        value={formData.categoryId} 
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
    );
};

export default CreateBooking;
