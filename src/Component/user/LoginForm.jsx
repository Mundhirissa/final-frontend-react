import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting login form', { username, password });

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', { username, password });
      console.log('Response received from server:', response.data);

      // Check if login was successful based on response status and message
      if (response.status === 200 && response.data.message === 'Login successful') {
        const role = response.data.role;
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);

        // Handle stadiumId if available and role is 'staff'
        if (role === 'staff') {
          const stadiumId = response.data.stadiumId || ''; // Use the stadiumId returned by the server
          localStorage.setItem('stadiumId', stadiumId);
        } else {
          localStorage.removeItem('stadiumId');
        }

        // Show success toast and navigate only after it finishes displaying
        toast.success('Login successful!', {
          onClose: () => {
            if (role === 'staff') {
              navigate('/amountstadium');
            } else if (role === 'admin') {
              navigate('/admin');
            } else {
              navigate('/List-stadium-user');
            }
          },
        });

        console.log('Login successful, navigating based on role');
      } else {
        toast.error('Invalid username or password');
      }
    } catch (error) {
      // Handle different error scenarios more specifically
      if (error.response && error.response.status === 401) {
        // Unauthorized, likely due to invalid credentials
        toast.error('Invalid username or password');
      } else {
        // Other errors, such as server issues
        console.error('Error during login:', error);
        toast.error('An error occurred. Please try again.');
      }
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
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
      </div>
    </div>
  );
};

export default LoginForm;
