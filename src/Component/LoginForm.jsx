// src/LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', { username, password });
      setMessage(response.data);
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  function register(){
navigate('/Register-form')
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button  className='btn btn-primary' type="submit">Login</button>
        <button className='btn btn-info' type='button' onClick={register}>Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginForm;
