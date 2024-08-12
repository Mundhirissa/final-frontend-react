
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Userprofile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password:''
  });

  useEffect(() => {
    const fetchUser = async () => {
      const username = localStorage.getItem('username');
      if (username) {
        try {
          const response = await axios.get(`http://localhost:8080/api/users/username/${username}`);
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setMessage('Error fetching user data. Please try again.');
        }
      }
    };

    fetchUser();
  }, []);

  const handleEdit = () => {
    setEditUser({
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      password:user.password
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/users/${user.userid}`, editUser);
      setUser(response.data);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating user data:', error);
      setMessage('Error updating user data. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="card-title text-center mb-4">User Profile</h2>
        <div className="form-group">
          <label>First Name:</label><p>{user.firstname}</p>
        </div>
        <div className="form-group">
          <label>Last Name:</label><p>{user.lastname}</p>
        </div>
        <div className="form-group">
          <label>Username:</label>
          <p>{user.username}</p>
        </div>
        <div className="form-group">
          <label>Email:</label>
          <p>{user.email}</p>
        </div>
        <div className="form-group">
          <label>Role:</label>
          <p>{user.role}</p>
        </div>
        <Button variant="primary" onClick={handleEdit}>Edit</Button>
        {message && <p className="mt-3 text-center text-danger">{message}</p>}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User-Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                value={editUser.firstname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                value={editUser.lastname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={editUser.username}
                onChange={handleChange}
              />
            </Form.Group>


            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editUser.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value={editUser.password}
                onChange={handleChange}
              />
            </Form.Group>



          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Userprofile;
