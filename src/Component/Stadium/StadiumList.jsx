import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Liststadium, deletebyidstadium } from '../../Services/Stadiumservices';

export default function StadiumList() {
    const [stadiumList, setStadiumList] = useState([]);
    const { stadiumid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        Liststadium()
            .then(response => {
                setStadiumList(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleDeletestadium = (stadiumid) => {
        deletebyidstadium(stadiumid)
            .then(response => {
                alert("Stadium deleted successfully");
                setStadiumList(prevStadiumList => prevStadiumList.filter(stadium => stadium.stadiumid !== stadiumid));
            })
            .catch(error => {
                console.error('Error deleting stadium:', error);
            });
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>List Stadiums</h2>
                </div>
                <div className="card-body">
                    <table className='table table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Stadium Name</th>
                                <th>Stadium Capacity</th>
                                <th>Stadium Location</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stadiumList.map(stadium => (
                                <tr key={stadium.stadiumid}>
                                    <td>{stadium.stadiumid}</td>
                                    <td>{stadium.name}</td>
                                    <td>{stadium.capacity}</td>
                                    <td>{stadium.location}</td>
                                    <td>
                                        <button className='btn btn-outline-danger me-2' onClick={() => handleDeletestadium(stadium.stadiumid)}>
                                            <FaTrash />
                                        </button>
                                        <Link to={`/edit-stadium/${stadium.stadiumid}`} className='btn btn-outline-info me-2'>
                                            <FaEdit />
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
