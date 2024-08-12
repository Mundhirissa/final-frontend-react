
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
    console.log('Submitting login form', { username, password });

    try {
        const response = await axios.post('http://localhost:8080/api/users/login', { username, password });
        console.log('Response received from server:', response.data);

        if (response.data.message === 'Login successful') {
            const role = response.data.role;
            localStorage.setItem('username', username);
            localStorage.setItem('role', role);

            // Handle stadiumId if available
            if (role === 'staff') {
                const stadiumId = response.data.stadiumId || ''; // Use the stadiumId returned by the server
                localStorage.setItem('stadiumId', stadiumId);
                // Navigate to '/amountstadium' for staff role
                navigate('/amountstadium');
            } else {
                localStorage.removeItem('stadiumId');
                // Additional navigation for non-staff roles
                if (role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/List-stadium-user');
                }
            }

            setMessage('Login successful!');
            console.log('Login successful, navigating based on role');
        } else {
            setMessage('Invalid username or password');
        }
    } catch (error) {
        console.error('Error during login:', error);
        setMessage('An error occurred. Please try again.');
    }
};



  const register = () => {
    navigate('/Register-form');
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="card-title text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-primary" type="submit">Login</button>
            <button className="btn btn-info" type="button" onClick={register}>Register</button>
          </div>
        </form>
        {message && <p className="mt-3 text-center text-danger">{message}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
