import React, { useEffect, useState } from 'react'
import { Liststadium, deletebyidstadium } from '../../Services/Stadiumservices';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function StadiumList() {
    const [stadiumList, setStadiumList] = useState([]);
    const { stadiumid} = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        // Make an HTTP GET request to fetch data from the Spring Boot API
         Liststadium ().then(response => {
            setStadiumList(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

   




      const handleDeletestadium = (stadiumid) => {
        // Make an HTTP DELETE request to delete the Idara
        deletebyidstadium(stadiumid).then(response => {
            alert("idara already deleted");
            // If the deletion is successful, update the state to remove the deleted Idara
            setStadiumList(prevIdaraList => prevIdaraList.filter(stadium => stadium.stadiumid !== stadiumid));
          })
          .catch(error => {
            console.error('Error deleting Idara:', error);
          });
      };





  return (
    <div>
     
<table className='table table-striped table table-bordered'>
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
          { stadiumList.map(stadium => (
            <tr key={stadium.stadiumid}>
              <td>{stadium.stadiumid}</td>
              <td>{stadium.name}</td>
              <td>{stadium.capacity}</td>
              <td>{stadium.location}</td>
              <td>
                <button  className='btn btn-outline-danger'  onClick={() => handleDeletestadium(stadium.stadiumid)}>Delete</button>
                <Link to={`/edit-stadium/${stadium.stadiumid}`}  className='btn btn-outline-info'>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>



    </div>
  )
}
