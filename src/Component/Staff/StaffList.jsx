import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import 'bootstrap/dist/css/bootstrap.min.css';

const StaffList = () => {
    const [stadiumStaff, setStadiumStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        axios.get('http://localhost:8080/api/stadiumstaff')
            .then(response => {
                setStadiumStaff(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (userid) => {
        if (window.confirm('Are you sure you want to delete this staff member?')) {
            axios.delete(`http://localhost:8080/api/stadiumstaff/${userid}`)
                .then(() => {
                    setStadiumStaff(stadiumStaff.filter(staff => staff.userid !== userid));
                })
                .catch(error => {
                    setError(error);
                    alert('Error deleting staff member');
                });
        }
    };

    const handleEdit = (userid) => {
        navigate(`/edit/${userid}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message || error}</div>;
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h1>Stadium Staff</h1>
                </div>
                <div className="card-body">
                    {stadiumStaff.length > 0 ? (
                        <table className="table table-striped table-bordered">
                            <thead className="table-dark">
                                <tr>
                                    <th>User ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Stadium</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stadiumStaff.map(staff => (
                                    <tr key={staff.userid}>
                                        <td>{staff.userid}</td>
                                        <td>{staff.firstname}</td>
                                        <td>{staff.lastname}</td>
                                        <td>{staff.username}</td>
                                        <td>{staff.email}</td>
                                        <td>{staff.role}</td>
                                        <td>{staff.stadium?.name}</td>
                                        <td>
                                            <button 
                                                className="btn btn-primary me-2" 
                                                onClick={() => handleEdit(staff.userid)}>
                                                Edit
                                            </button>
                                            <button 
                                                className="btn btn-danger" 
                                                onClick={() => handleDelete(staff.userid)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No stadium staff found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StaffList;
