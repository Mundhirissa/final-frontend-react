import React, { useEffect, useState } from 'react';
import { Liststadium } from '../../Services/Stadiumservices';
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function StadiumListUser() {
    const [stadiumList, setStadiumList] = useState([]);
    const { stadiumid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Make an HTTP GET request to fetch data from the Spring Boot API
        Liststadium().then(response => {
            setStadiumList(response.data);
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <div className="container mt-5">
            <h2>List Stadium</h2>
            <div className="row">
                {stadiumList.map(stadium => (
                    <div className="col-md-4" key={stadium.stadiumid}>
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">{stadium.name}</h5>
                                <p className="card-text"><strong>Capacity:</strong> {stadium.capacity}</p>
                                <p className="card-text"><strong>Location:</strong> {stadium.location}</p>
                                <Link to={`/BookingBystadium/${stadium.stadiumid}`} className='btn btn-outline-secondary'>Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
