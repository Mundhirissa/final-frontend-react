import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateStadiumstaff = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        stadiumId: '',
    });

    const [stadiums, setStadiums] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStadiums = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/stadiums');
                setStadiums(response.data);
            } catch (error) {
                console.error('Error fetching stadiums', error);
            }
        };

        fetchStadiums();
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
        try {
            const response = await axios.post('http://localhost:8080/api/stadiumstaff', {
                ...formData,
                stadiumId: Number(formData.stadiumId)
            });
            console.log('Stadium staff created:', response.data);
            alert('Stadium staff created successfully');
            navigate('/Stafflist'); // Adjust the path as needed
        } catch (error) {
            console.error('There was an error creating the stadium staff!', error);
        }
    };

    const cancel = () => {
        navigate('/Stafflist'); // Adjust the path as needed
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>ADD STADIUM STAFF FORM</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label>First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter first name"
                                required
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter last name"
                                required
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter username"
                                required
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                required
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                required
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Stadium</label>
                            <select
                                className="form-control"
                                required
                                name="stadiumId"
                                value={formData.stadiumId}
                                onChange={handleChange}
                            >
                                <option value="">Select a stadium</option>
                                {stadiums.map(stadium => (
                                    <option key={stadium.stadiumid} value={stadium.stadiumid}>
                                        {stadium.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-outline-primary me-2" type="submit">Save</button>
                            <button className="btn btn-outline-danger" type="button" onClick={cancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateStadiumstaff;
