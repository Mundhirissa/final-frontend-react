import React, { useEffect, useState } from 'react';
import { FaMoneyBill } from 'react-icons/fa';

const StadiumRevenue = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [stadiumId, setStadiumId] = useState(null);

    useEffect(() => {
        // Retrieve stadiumId from localStorage
        const storedStadiumId = localStorage.getItem('stadiumId');
        if (storedStadiumId) {
            setStadiumId(parseInt(storedStadiumId, 10)); // Convert to number
        }
    }, []);

    useEffect(() => {
        if (stadiumId !== null) { // Check if stadiumId is set
            fetch(`http://localhost:8080/api/payments/total-amount/${stadiumId}`)
                .then(response => response.json())
                .then(data => setTotalAmount(data))
                .catch(error => console.error('Error fetching total amount:', error));
        }
    }, [stadiumId]);

    if (stadiumId === null) {
        return <p>Loading...</p>; // Show loading state until stadiumId is set
    }

    return (
        <div style={styles.card}>
            <h2><FaMoneyBill /> Total Revenue for Stadium {stadiumId}</h2>
            <p>{totalAmount}</p>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        margin: '10px',
    }
};

export default StadiumRevenue;
