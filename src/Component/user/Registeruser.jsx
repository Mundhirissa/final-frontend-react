
import React, { useState } from 'react';
import { createuser } from '../../Services/Userservicse';
import { useNavigate } from 'react-router-dom';

function Registeruser() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function savelist(e) {
    e.preventDefault();
    const UserList = {
      firstname,
      lastname,
      username,
      email,
      password,
      role: 'user' // Default role set to 'user'
    };
    console.log(UserList);

    createuser(UserList).then((response) => {
      console.log(response.data);
      alert('Data saved successfully');
      navigate('/');
    }).catch(error => {
      console.error('There was an error!', error);
      alert('Failed to save data');
    });
  }

  function cancel() {
    navigate('/');
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="card-title text-center mb-4">Registration Form</h2>
        <form>
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
              placeholder="Enter Lastname"
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
              placeholder="Enter Username"
              required
              name="username"
              value={username}
              className='form-control'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <input
              type="email"
              placeholder="Enter Email"
              required
              name="email"
              value={email}
              className='form-control'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <input
              type="password"
              placeholder="Enter Password"
              required
              name="password"
              value={password}
              className='form-control'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className='btn btn-outline-primary' type="submit" onClick={savelist}>Save</button>
          <button className='btn btn-outline-danger' type="button" onClick={cancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default Registeruser;
