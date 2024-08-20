import React, { useEffect, useState } from 'react';
import { FaClipboardList, FaMoneyBill, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [userCount, setUserCount] = useState(0);
    const [bookingCount, setBookingCount] = useState(0);
    const [totalPaidAmount, setTotalPaidAmount] = useState(0);
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

    useEffect(() => {
        fetch('http://localhost:8080/api/payments/total-paid-amount')  // Fetching total paid amount
            .then(response => response.json())
            .then(data => setTotalPaidAmount(data))
            .catch(error => console.error('Error fetching total paid amount:', error));
    }, []);

    const handleCardClick = (path) => {
        navigate(path);
    };

    return (
        <div style={styles.dashboard}>
            <div
                style={{ ...styles.card, ...styles.userCard }}
                onClick={() => handleCardClick('/List-User')}
            >
                <h3 style={styles.cardTitle}><FaUser style={styles.icon} /> Users Registered</h3>
                <h1 style={styles.cardValue}>{userCount}</h1>
            </div>
            <div
                style={{ ...styles.card, ...styles.bookingCard }}
                onClick={() => handleCardClick('/List-booking')}
            >
                <h3 style={styles.cardTitle}><FaClipboardList style={styles.icon} /> Total Bookings</h3>
                <h1 style={styles.cardValue}>{bookingCount}</h1>
            </div>
            <div style={{ ...styles.card, ...styles.revenueCard }}
             onClick={() => handleCardClick('/Revenue')}>
                <h3 style={styles.cardTitle}><FaMoneyBill style={styles.icon} /> Total Revenue</h3>
                <h1 style={styles.cardValue}>{totalPaidAmount.toLocaleString()}</h1>
            </div>
        </div>
    );
};

const styles = {
    dashboard: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '40px',
        backgroundColor: '#f5f7fa',
    },
    card: {
        borderRadius: '15px',
        padding: '30px',
        textAlign: 'center',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        flex: '1',
        margin: '15px',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        color: '#fff',
        maxWidth: '300px',
        minHeight: '200px',
    },
    userCard: {
        backgroundColor: '#4caf50',
    },
    bookingCard: {
        backgroundColor: '#2196f3',
    },
    revenueCard: {
        backgroundColor: '#f44336',
    },
    cardHover: {
        transform: 'translateY(-10px)',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
    },
    icon: {
        marginRight: '10px',
    },
    cardTitle: {
        fontSize: '1.2em',
        fontWeight: 'bold',
        marginBottom: '10px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    cardValue: {
        fontSize: '2.5em',
        fontWeight: 'bold',
        margin: '0',
    }
};

export default Dashboard;
