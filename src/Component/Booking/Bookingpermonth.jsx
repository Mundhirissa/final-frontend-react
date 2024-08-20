import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingsPerMonth = () => {
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
  const [bookingsPerMonth, setBookingsPerMonth] = useState({});

  useEffect(() => {
    const fetchBookingsPerMonth = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/bookings/bookings/count-per-month', {
          params: { year }
        });
        setBookingsPerMonth(response.data);
      } catch (error) {
        console.error('Error fetching bookings per month:', error);
      }
    };

    fetchBookingsPerMonth();
  }, [year]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2 className="card-title">Bookings Per Month for {year}</h2>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="yearInput" className="form-label">Select Year:</label>
            <input
              type="number"
              id="yearInput"
              className="form-control"
              value={year}
              onChange={handleYearChange}
              min="2000"
            //   max={new Date().getFullYear()}
            />
          </div>
          <ul className="list-group">
            {Object.entries(bookingsPerMonth).map(([month, count]) => (
              <li key={month} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{month}</span>
                <span className="badge bg-primary rounded-pill">{count} bookings</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookingsPerMonth;
