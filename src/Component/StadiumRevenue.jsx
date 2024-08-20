import React, { useEffect, useState } from 'react';
import { FaMoneyBill, FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const StadiumRevenue = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [bookingCount, setBookingCount] = useState(0);
    const [stadiumId, setStadiumId] = useState(null);
    const [stadiumName, setStadiumName] = useState('');
    const navigate =useNavigate();

    useEffect(() => {
        // Retrieve stadiumId from localStorage
        const storedStadiumId = localStorage.getItem('stadiumId');
        if (storedStadiumId) {
            setStadiumId(parseInt(storedStadiumId, 10)); // Convert to number
        }
    }, []);

    useEffect(() => {
        if (stadiumId !== null) {
            // Fetch stadium details to get the name
            fetch(`http://localhost:8080/api/stadiums/${stadiumId}`)
                .then(response => response.json())
                .then(data => setStadiumName(data.name))
                .catch(error => console.error('Error fetching stadium details:', error));

            // Fetch total amount for the stadium
            fetch(`http://localhost:8080/api/payments/total-amount/${stadiumId}`)
                .then(response => response.json())
                .then(data => setTotalAmount(data))
                .catch(error => console.error('Error fetching total amount:', error));

            // Fetch booking count for the stadium
            fetch(`http://localhost:8080/api/bookings/bookings/count-by-stadium?stadiumId=${stadiumId}`)
                .then(response => response.json())
                .then(data => setBookingCount(data))
                .catch(error => console.error('Error fetching booking count:', error));
        }
    }, [stadiumId]);

    if (stadiumId === null || stadiumName === '') {
        return <p>Loading...</p>; // Show loading state until stadiumId and stadiumName are set
    }

    const handleCardClick = (path) => {
        navigate(path);
    };

    return (
        <div style={styles.container}>
            <div style={{ ...styles.card, ...styles.revenueCard }}
            
            >
                <h2 style={styles.cardTitle}><FaMoneyBill style={styles.icon} />Revenue for {stadiumName}</h2>
                <p style={styles.cardValue}>{totalAmount.toLocaleString()}</p>
            </div>
            <div style={{ ...styles.card, ...styles.bookingCard }}
             onClick={() => handleCardClick('/Listbookign')}
            >
                <h2 style={styles.cardTitle}><FaClipboardList style={styles.icon} />Bookings for {stadiumName}</h2>
                <p style={styles.cardValue}>{bookingCount}</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap',
    },
    card: {
        borderRadius: '15px',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        color: '#fff',
        maxWidth: '400px',
        margin: '20px auto',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    revenueCard: {
        backgroundColor: '#f44336', // Red for revenue
    },
    bookingCard: {
        backgroundColor: '#4CAF50', // Green for bookings
    },
    cardTitle: {
        fontSize: '1.4em',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: '10px',
        letterSpacing: '1px',
    },
    cardValue: {
        fontSize: '2em',
        fontWeight: 'bold',
        margin: '0',
    },
    icon: {
        marginRight: '10px',
    },
};

export default StadiumRevenue;
