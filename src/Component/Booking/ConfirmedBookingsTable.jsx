
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getConfirmedBookings } from '../../Services/Bookingservices';

const ConfirmedBookingsTable = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const fetchBookings = async () => {
      try {
        const data = await getConfirmedBookings();
        const filteredBookings = data.filter(booking => booking.user.username === storedUsername);
        setBookings(filteredBookings);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (storedUsername) {
      fetchBookings();
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Table striped bordered hover>
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>User</th>
          <th>Stadium</th>
          <th>Category</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking.bookingId}>
            <td>{booking.bookingId}</td>
            <td>{booking.date}</td>
            <td>{booking.startTime}</td>
            <td>{booking.endTime}</td>
            <td>{booking.user?.username}</td>
            <td>{booking.stadium?.name}</td>
            <td>{booking.category?.categoryname}</td>
            <td style={{ color: booking.status === 'Confirmed' ? 'green' : 'red' }}>{booking.status}</td>
            <td>
              <Button
                onClick={() => navigate(`/payment/${booking.bookingId}`)}
                disabled={booking.status !== 'Confirmed'}
              >
                Make Payment
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ConfirmedBookingsTable;




