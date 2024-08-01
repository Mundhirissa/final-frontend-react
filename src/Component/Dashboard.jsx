import React, { useEffect, useState } from 'react';
import { FaUser, FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [userCount, setUserCount] = useState(0);
    const [bookingCount, setBookingCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/api/users/count')
            .then(response => response.json())
            .then(data => setUserCount(data))
            .catch(error => console.error('Error fetching user count:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/bookings/count')
            .then(response => response.json())
            .then(data => setBookingCount(data))
            .catch(error => console.error('Error fetching booking count:', error));
    }, []);

    const handleCardClick = (path) => {
        navigate(path);
    };

    return (
        <div style={styles.dashboard}>
            <div style={styles.card} onClick={() => handleCardClick('/List-User')}>
                <h2><FaUser /> Users Registered</h2>
                <p>{userCount}</p>
            </div>
            <div style={styles.card} onClick={() => handleCardClick('/List-booking')}>
                <h2><FaClipboardList /> Total Bookings</h2>
                <p>{bookingCount}</p>
            </div>
        </div>
    );
};

const styles = {
    dashboard: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '20px',
    },
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        flex: '1',
        margin: '10px',
        cursor: 'pointer', // Add this line to show a pointer cursor on hover
    }
};

export default Dashboard;
