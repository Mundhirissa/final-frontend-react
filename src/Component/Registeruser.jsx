import React, { useState } from 'react'
import { createuser } from '../Services/Userservicse';
import { useNavigate } from 'react-router-dom';

function Registeruser() {
const [firstname, setFirstname] = useState('');
const [lastname, setLastname] = useState('');
const [username, setusername] = useState('');
const [email, setemail] = useState('');
const [password, setpassword] = useState('');
const navigate = useNavigate();

function savelist(e){
    e.preventDefault();
    const UserList ={firstname,lastname,username,email,password}
    console.log(UserList);

    createuser(UserList).then((response)=>{
      console.log(response.data);
      alert('data saved succesful');
      
    })
  }
  function cancel(){
    navigate('/')
}


  return (
    <div>
         <br></br>
         <br></br>
        <form >
        <input
          type="text"
          placeholder="Enter Firstname"
          required
          name="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
         <br></br>
         <br></br>

        <input
          type="text"
          placeholder="Enter lastname"
          required
          name="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <br></br>
        <br>
         </br>

        <input
          type="text"
          placeholder="Enter username"
          required
          name="username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <br></br>
        <br>
         </br>

        <input
          type="text"
          placeholder="Enter email"
          required
          name="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <br></br>
        <br></br>

        <input
          type="text"
          placeholder="Enter  password"
          required
          name="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <br></br>
        <br></br>


        <button  className='btn btn-outline-primary' type="submit" onClick={savelist}>Save</button>
        <button  className='btn btn-outline-danger' type="button" onClick={cancel} >Cancel</button>
      </form>
    </div>
  )
}

export default Registeruser
