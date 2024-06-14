import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getbyidstadium, updatestadium } from '../../Services/Stadiumservices';

export default function Editstadium() {
    const { stadiumid } = useParams();
    const [name, setname] = useState('');
    const [capacity, setcapacity] = useState('');
    const [location, setlocation] = useState('');
    const navigate = useNavigate();


    function cancel(){
        navigate('/List-stadium')
    }
    useEffect(() => {
        getbyidstadium(stadiumid).then(response => {
            // Populate the name field with the fetched data
            setname(response.data.name || '');
            setcapacity(response.data.capacity || '');
            setlocation(response.data.location || '');
          })
          .catch(error => {
            console.error('Error fetching data by ID:', error);
          });
      }, [stadiumid]);



      function Edits_tadium(e){
        e.preventDefault();
        const upateList ={name,capacity,location}
        console.log(upateList);
       updatestadium(upateList,stadiumid).then((response)=>{
          console.log(response.data);
          alert('data updated succesful');
          navigate('/List-stadium');
        }).catch(err => console.log(err));
      }



  return (
    <div>
        <h1>EditStadium</h1>
        <br></br>
         <br></br>
        <form >
        <input
          type="text"
          placeholder="Enter name of stadium"
          required
          name="name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
         <br></br>
         <br></br>

        <input
          type="number"
          placeholder="Enter Capacity of stadium"
          required
          name="capacity"
          value={capacity}
          onChange={(e) => setcapacity(e.target.value)}
        />
        <br></br>
        <br>
         </br>

        <input
          type="text"
          placeholder="Enter location of stadium"
          required
          name="location"
          value={location}
          onChange={(e) => setlocation(e.target.value)}
        />
        <br></br>
        <br>
         </br>
        <button  className='btn btn-outline-primary' type="submit" onClick={Edits_tadium}>Update</button>
        <button  className='btn btn-outline-danger' type="button" onClick={cancel} >Cancel</button>
      </form>
    </div>
  )
}
