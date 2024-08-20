import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditStaff = () => {
    const { userid } = useParams();
    const navigate = useNavigate();
    const [staffDetails, setStaffDetails] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        role: '',
        stadium: '', // Store the stadium ID here
    });
    const [stadiums, setStadiums] = useState([]); // State for storing the list of stadiums
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch stadium staff details
        axios.get(`http://localhost:8080/api/stadiumstaff/${userid}`)
            .then(response => {
                // Ensure the stadium ID is set correctly in the state
                setStaffDetails({
                    ...response.data,
                    stadium: response.data.stadium?.stadiumid || ''
                });
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });

        // Fetch all stadiums
        axios.get('http://localhost:8080/api/stadiums')
            .then(response => {
                setStadiums(response.data);
            })
            .catch(error => {
                setError(error);
            });
    }, [userid]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStaffDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Prepare the data object to send, ensuring the stadium is properly set
        const updatedStaffDetails = {
            ...staffDetails,
            stadium: {
                stadiumid: staffDetails.stadium // Only send the stadium ID as part of an object
            }
        };

        axios.put(`http://localhost:8080/api/stadiumstaff/${userid}`, updatedStaffDetails)
            .then(() => {
                alert('Staff updated successfully');
                navigate('/Stafflist');
            })
            .catch(error => {
                setError(error);
                alert('Error updating staff');
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message || error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Edit Staff</h2>
            <form onSubmit={handleSubmit}>
                {/* Other input fields remain the same */}
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input 
                        type="text" 
                        name="firstname" 
                        className="form-control" 
                        value={staffDetails.firstname} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input 
                        type="text" 
                        name="lastname" 
                        className="form-control" 
                        value={staffDetails.lastname} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        className="form-control" 
                        value={staffDetails.username} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        className="form-control" 
                        value={staffDetails.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <input 
                        type="text" 
                        name="role" 
                        className="form-control" 
                        value={staffDetails.role} 
                        onChange={handleChange} 
                        required 
                        disabled
                    />
                </div>

                {/* Dropdown for Stadium Selection */}
                <div className="mb-3">
                    <label className="form-label">Stadium</label>
                    <select 
                        name="stadium" 
                        className="form-control" 
                        value={staffDetails.stadium} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Select a Stadium</option>
                        {stadiums.map(stadium => (
                            <option key={stadium.stadiumid} value={stadium.stadiumid}>
                                {stadium.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Update Staff</button>
            </form>
        </div>
    );
};

export default EditStaff;
