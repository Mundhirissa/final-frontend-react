import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaList, FaPlus, FaSignInAlt, FaUserPlus, FaBookmark, FaClipboardList, FaUser,FaSignOutAlt } from 'react-icons/fa';

const SidebarContainer = styled.div`
  width: ${({ isOpen }) => (isOpen ? '250px' : '60px')};
  height: 100vh;
  background-color: #333;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s ease;

  @media (max-width: 768px) {
    width: ${({ isOpen }) => (isOpen ? '200px' : '60px')};
  }
`;

const ToggleButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 24px;
  transition: left 0.3s ease;
  text-align: left;
  padding-left: 20px;

  @media (max-width: 768px) {
    padding-left: 15px;
  }
`;

const MenuItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const MenuItem = styled(Link)`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;

  &:hover {
    background-color: #444;
  }

  & svg {
    margin-right: ${({ isOpen }) => (isOpen ? '10px' : '0')};
    transition: margin-right 0.3s ease;
  }

  & span {
    display: ${({ isOpen }) => (isOpen ? 'inline' : 'none')};
    transition: display 0.3s ease;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: white;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #444;
  }

  & svg {
    margin-right: ${({ isOpen }) => (isOpen ? '10px' : '0')};
    transition: margin-right 0.3s ease;
  }

  & span {
    display: ${({ isOpen }) => (isOpen ? 'inline' : 'none')};
    transition: display 0.3s ease;
  }
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <ToggleButton onClick={toggleSidebar}>
        {isOpen ? '✕' : '☰'}
      </ToggleButton>
      <MenuItemsContainer>
        {!role && (
          <>
            <MenuItem to="/" isOpen={isOpen}>
              <FaSignInAlt />
              <span>Login</span>
            </MenuItem>
            <MenuItem to="/Register-form" isOpen={isOpen}>
              <FaUserPlus />
              <span>Register</span>
            </MenuItem>
          </>
        )}
        {role === 'admin' && (
          <>
           <MenuItem to="/admin" isOpen={isOpen}>
              <FaHome />
              <span>Dashboard</span>
            </MenuItem>

            <MenuItem to="/add-stadium" isOpen={isOpen}>
              <FaPlus />
              <span>Add Stadium</span>
            </MenuItem>

            <MenuItem to="/List-stadium" isOpen={isOpen}>
              <FaList />
              <span>List Stadium</span>
            </MenuItem>

            <MenuItem to="/List-User" isOpen={isOpen}>
              <FaList />
              <span>List User</span>
            </MenuItem>


            <MenuItem to="/add-Category" isOpen={isOpen}>
              <FaPlus />
              <span>Add Category</span>
            </MenuItem>
            <MenuItem to="/List-Category" isOpen={isOpen}>
              <FaList />
              <span>List Category</span>
            </MenuItem>
            <MenuItem to="/Create-booking" isOpen={isOpen}>
              <FaBookmark />
              <span>Create Booking</span>
            </MenuItem>
            <MenuItem to="/List-booking" isOpen={isOpen}>
              <FaClipboardList />
              <span>List Booking</span>
            </MenuItem>
            <MenuItem to="/Listbyuser-booking" isOpen={isOpen}>
              <FaClipboardList />
              <span>List Booking By User</span>
            </MenuItem>
            
            <MenuItem to="/profile" isOpen={isOpen}>
              <FaUser />
              <span>User-Profile</span>
            </MenuItem>
          </>
        )}
        {role === 'user' && (
          <>
            <MenuItem to="/List-stadium-user" isOpen={isOpen}>
              <FaList />
              <span>List Stadium</span>
            </MenuItem>
            
            <MenuItem to="/Listbooking-confired" isOpen={isOpen}>
              <FaList />
              <span>List confirmed</span>
            </MenuItem>

            <MenuItem to="/List-Category-user" isOpen={isOpen}>
              <FaList />
              <span>List Category</span>
            </MenuItem>
            <MenuItem to="/Create-booking" isOpen={isOpen}>
              <FaBookmark />
              <span>Create Booking</span>
            </MenuItem>
            <MenuItem to="/Listbyuser-booking" isOpen={isOpen}>
              <FaClipboardList />
              <span>List Booking By User</span>
            </MenuItem>
            <MenuItem to="/profile" isOpen={isOpen}>
              <FaUser />
              <span>User-Profile</span>
            </MenuItem>
          </>
        )}
        {role && (
          <LogoutButton onClick={handleLogout} isOpen={isOpen}>
            <FaSignOutAlt />
            <span>Logout</span>
          </LogoutButton>
        )}
      </MenuItemsContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
