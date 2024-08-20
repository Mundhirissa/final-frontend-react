
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Listusers, deletebyiduser, searchUsers } from '../../Services/Userservicse';

export default function Listuser() {
    const [userList, setuserList] = useState([]);
    const { userid } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        Listusers().then(response => {
            setuserList(response.data);
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
        searchUsers(searchTerm).then(response => {
            setuserList(response.data);
        }).catch(error => {
            console.error('Error searching users:', error);
        });
    };

    function handleDeleteuser(userid) {
        if (window.confirm('Are you sure you want to delete this user?')) {
        // Handle user deletion logic
        deletebyiduser(userid).then(response => {
            alert("User deleted successfully");
            // Update state after deletion
            setuserList(prevUserList => prevUserList.filter(user => user.userid !== userid));
        }).catch(error => {
            console.error('Error deleting user:', error);
        });
    }
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>List User</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSearch} className="mb-3">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search users"
                            />
                            <button type="submit" className="btn btn-outline-primary">Search</button>
                        </div>
                    </form>
                    <table className='table table-striped table-bordered'>
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map(User => (
                                <tr key={User.userid}>
                                    <td>{User.userid}</td>
                                    <td>{User.firstname}</td>
                                    <td>{User.lastname}</td>
                                    <td>{User.username}</td>
                                    <td>{User.email}</td>
                                    <td>
                                        <button className='btn btn-outline-danger me-2' onClick={() => handleDeleteuser(User.userid)}>
                                            <FaTrash />
                                        </button>
                                        <Link to={`/edit-User/${User.userid}`} className='btn btn-outline-info me-2'>
                                            <FaEdit />
                                        </Link>
                                        <Link to={`/user-details/${User.username}`} className='btn btn-outline-secondary'>
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
