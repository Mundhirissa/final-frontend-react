import React, { useState } from 'react'
import { createstadium } from '../../Services/Stadiumservices';
import { useNavigate } from 'react-router-dom';

export default function StadiumAddform() {

    const [name, setname] = useState('');
    const [capacity, setcapacity] = useState('');
    const [location, setlocation] = useState('');
    const navigate = useNavigate();
  
    
    function AddStadium(e){
        e.preventDefault();
        const StadiumList ={name,capacity,location}
        console.log(StadiumList);
    
        createstadium(StadiumList).then((response)=>{
          console.log(response.data);
          alert('data saved succesful');
          navigate('/List-stadium')
          
        })
      }
    

function cancel(){
    navigate('/List-stadium')
}


  return (
    <div>
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
        <button  className='btn btn-outline-primary' type="submit" onClick={AddStadium}>Save</button>
        <button  className='btn btn-outline-danger' type="button" onClick={cancel} >Cancel</button>
      </form>
    </div>
  )
}
