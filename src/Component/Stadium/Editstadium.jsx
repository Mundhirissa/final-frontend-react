import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getbyidstadium, updatestadium } from '../../Services/Stadiumservices';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Editstadium() {
    const { stadiumid } = useParams();
    const [name, setName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getbyidstadium(stadiumid)
            .then(response => {
                setName(response.data.name || '');
                setCapacity(response.data.capacity || '');
                setLocation(response.data.location || '');
            })
            .catch(error => {
                console.error('Error fetching data by ID:', error);
            });
    }, [stadiumid]);

    const handleEditStadium = (e) => {
        e.preventDefault();
        const updatedStadium = { name, capacity, location };
        updatestadium(updatedStadium, stadiumid)
            .then(response => {
                alert('Data updated successfully');
                navigate('/List-stadium');
            })
            .catch(err => console.error('Error updating stadium:', err));
    };

    const handleCancel = () => {
        navigate('/List-stadium');
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>Edit Stadium</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleEditStadium}>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                placeholder="Enter name of stadium"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="capacity">Capacity</label>
                            <input
                                type="number"
                                id="capacity"
                                className="form-control"
                                placeholder="Enter capacity of stadium"
                                required
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="location">Location</label>
                            <input
                                type="text"
                                id="location"
                                className="form-control"
                                placeholder="Enter location of stadium"
                                required
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-outline-primary me-2" type="submit">Update</button>
                            <button className="btn btn-outline-danger" type="button" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
