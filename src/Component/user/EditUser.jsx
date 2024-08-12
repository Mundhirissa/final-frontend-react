
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getbyiduser, updateuser } from '../../Services/Userservicse';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function EditUser() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { userid } = useParams();

    useEffect(() => {
        getbyiduser(userid).then(response => {
            setFirstname(response.data.firstname || '');
            setLastname(response.data.lastname || '');
            setUsername(response.data.username || '');
            setEmail(response.data.email || '');
            setPassword(response.data.password || '');
        })
        .catch(error => {
            console.error('Error fetching data by ID:', error);
        });
    }, [userid]);

    const handleEditUser = (e) => {
        e.preventDefault();
        const updatedUser = { firstname, lastname, username, email, password };
        updateuser(updatedUser, userid).then(response => {
            alert('Data updated successfully');
            navigate('/List-User');
        })
        .catch(err => console.error('Error updating user:', err));
    };

    const handleCancel = () => {
        navigate('/List-User');
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
                <div className="card-header">
                    <h2 className="text-center">Edit User</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleEditUser}>
                        <div className="form-group mb-3">
                            <label htmlFor="firstname">Firstname</label>
                            <input
                                type="text"
                                id="firstname"
                                className="form-control"
                                placeholder="Enter Firstname"
                                required
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="lastname">Lastname</label>
                            <input
                                type="text"
                                id="lastname"
                                className="form-control"
                                placeholder="Enter Lastname"
                                required
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                placeholder="Enter Username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
