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
      navigate('/')
      
    })
  }
  function cancel(){
    navigate('/')
}


  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
      <h2 className="card-title text-center mb-4">Registration Form</h2>
        <form >
        <div className='form-group'>
        <input
          type="text"
          placeholder="Enter Firstname"
          required
          name="firstname"
          value={firstname}
          className='form-control'
          onChange={(e) => setFirstname(e.target.value)}
        />
         </div>
         
         <div className='form-group'>
        <input
          type="text"
          placeholder="Enter lastname"
          required
          name="lastname"
          value={lastname}
            className='form-control'
          onChange={(e) => setLastname(e.target.value)}
        />
        </div>
       
       <div className='form-group'>
        <input
          type="text"
          placeholder="Enter username"
          required
          name="username"
          value={username}
            className='form-control'
          onChange={(e) => setusername(e.target.value)}
        />
        </div>
        
        <div className='form-group'>
        <input
          type="text"
          placeholder="Enter email"
          required
          name="email"
          value={email}
            className='form-control'
          onChange={(e) => setemail(e.target.value)}
        />
        </div>
        
        <div className='form-group'>
        <input
          type="text"
          placeholder="Enter  password"
          required
          name="password"
          value={password}
            className='form-control'
          onChange={(e) => setpassword(e.target.value)}
        />
       </div>


        <button  className='btn btn-outline-primary' type="submit" onClick={savelist}>Save</button>
        <button  className='btn btn-outline-danger' type="button" onClick={cancel} >Cancel</button>
      </form>
    </div>
    </div>
  )
}

export default Registeruser
