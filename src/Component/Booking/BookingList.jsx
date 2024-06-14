import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Listbooking } from '../../Services/Bookingservices';

export default function BookingList() {
    const [BookingList, setBookingList] = useState([]);
    const { bookingid} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Make an HTTP GET request to fetch data from the Spring Boot API
         Listbooking().then(response => {
            setBookingList(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

      function handleDeletebooking(){

      }
    

  return (
    <div>
      <br></br>
      <br></br>
        <table className='table table-striped table table-bordered'>
        <thead>
          <tr>
            <th>BookingID</th>
            <th>Date</th>
            <th>Time</th>
            <th>userid</th>
            <th>username</th>
            <th>categoryid</th>
            <th>Categoryname</th>
            <th>StadiumID</th>
            <th>Stadium Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          { BookingList.map(Booking => (
            <tr key={Booking.bookingid}>
              <td>{Booking.bookingid}</td>
              <td>{Booking.date}</td>
              <td>{Booking.time}</td>
              <td>{Booking.user.userid}</td>
              <td>{Booking.user.username}</td>
              <td>{Booking.category.categoryid}</td>
              <td>{Booking.category.categoryname}</td>
              <td>{Booking.stadium.stadiumid}</td>
              <td>{Booking.stadium.name}</td>
              <td>
                <button  className='btn btn-outline-danger'  onClick={() => handleDeletebooking(Booking.bookingid)}>Delete</button>
                <Link to={`/edit-Category/${Booking.bookingid}`}  className='btn btn-outline-info'>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
