
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaPlus, FaList, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaBookmark,FaWallet, FaClipboardList, FaUser, FaChevronDown, FaChevronUp, FaChevronRight, FaTags, FaFootballBall, FaAngleDoubleUp, FaCaretUp, FaCaretDown } from 'react-icons/fa';
import { FaFootball } from 'react-icons/fa6';
const SidebarContainer = styled.div`
  width: ${({ isOpen }) => (isOpen ? '250px' : '60px')};
  height: 100vh;
  background-color: #1e2a38; /* Darker shade for a modern look */
  color: #ffffff; /* White text for contrast */
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: width 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow for depth */
  border-right: 2px solid #007bff; /* Accent color border for visual interest */
  overflow-y: auto; /* Enable vertical scrolling if content exceeds height */

  @media (max-width: 768px) {
    width: ${({ isOpen }) => (isOpen ? '200px' : '60px')};
  }

  /* Sidebar header styling */
  .sidebar-header {
    width: 100%;
    padding: 15px;
    background-color: #007bff; /* Bright blue color for the header */
    color: #ffffff;
    text-align: center;
    font-size: 1.2em;
    font-weight: bold;
    border-bottom: 2px solid #0056b3; /* Darker blue for border */
  }

  /* Sidebar links styling */
  .sidebar-link {
    width: 100%;
    padding: 10px;
    text-align: center;
    color: #ffffff;
    text-decoration: none;
    font-size: 1em;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
      background-color: #0056b3; /* Darker blue for hover effect */
      color: #ffffff;
    }
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
const DropdownContainer = styled.div`
  width: 100%;
  padding: 10px 20px;
  background-color: #1e2a38; /* Match the sidebar background */
  border-radius: 4px; /* Rounded corners for consistency */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow for depth */
`;

const DropdownHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space out the icon and text */
  padding: 10px;
  background-color: #007bff; /* Match the sidebar header color */
  color: #ffffff; /* White text for contrast */
  border-radius: 4px; /* Consistent rounded corners */
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
`;

const DropdownList = styled.div`
  width: 100%;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  padding: 10px;
  background-color: #2c3e50; /* Slightly lighter shade than sidebar background */
  border-radius: 4px; /* Rounded corners for consistency */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
`;
const H4 = styled.h4`
  font-size: 1.3rem;
  font-weight: bold;
  color:  #007bff; /* Yellow color */
  background-color: #333; /* Black background */
  padding: 10px 20px;
  border-radius: 5px;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  const [isStaffDropdownOpen, setStaffDropdownOpen] = useState(false);
  const [isBookingDropdownOpen, setBookingDropdownOpen] = useState(false);
  const [isStadiumDropdownOpen, setStadiumDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (setDropdownOpen) => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <SidebarContainer isOpen={isOpen}>

<H4>STADIUM BOOKING</H4>

      {/* <ToggleButton onClick={toggleSidebar}>
        {isOpen ? '✕' : '☰'}
      </ToggleButton> */}
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

            <DropdownContainer>
              <DropdownHeader onClick={() => toggleDropdown(setStaffDropdownOpen)}>
                <FaUser />
                <span>Staff</span>
                {isStaffDropdownOpen ? <FaCaretUp /> : <FaCaretDown />}
              </DropdownHeader>
              <DropdownList isOpen={isStaffDropdownOpen}>
                <MenuItem to="/satff-add" isOpen={isOpen}>
                  <FaPlus />
                  <span>Add Staff</span>
                </MenuItem>
                <MenuItem to="/Stafflist" isOpen={isOpen}>
                  <FaList />
                  <span>List Staff</span>
                </MenuItem>
              </DropdownList>
            </DropdownContainer>

            <DropdownContainer>
              <DropdownHeader onClick={() => toggleDropdown(setBookingDropdownOpen)}>
                <FaBookmark />
                <span>Booking</span>
                {isBookingDropdownOpen ? <FaCaretUp /> : <FaCaretDown />}
              </DropdownHeader>
              <DropdownList isOpen={isBookingDropdownOpen}>
                <MenuItem to="/Create-booking" isOpen={isOpen}>
                  <FaBookmark />
                  <span>Create Booking</span>
                </MenuItem>
                <MenuItem to="/List-booking" isOpen={isOpen}>
                  <FaClipboardList />
                  <span>List Booking</span>
                </MenuItem>

                <MenuItem to="/Monthbooking" isOpen={isOpen}>
                  <FaClipboardList />
                  <span>Month </span>
                </MenuItem>

                <MenuItem to="/totalbooking" isOpen={isOpen}>
                  <FaClipboardList />
                  <span>Total Booking</span>
                </MenuItem>

                <MenuItem to="/Listbyuser-booking" isOpen={isOpen}>
                  <FaClipboardList />
                  <span>List Booking By User</span>
                </MenuItem>
              </DropdownList>
            </DropdownContainer>

            <DropdownContainer>
              <DropdownHeader onClick={() => toggleDropdown(setStadiumDropdownOpen)}>
                <FaFootballBall />
                <span>Stadium</span>
                {isStadiumDropdownOpen ? <FaCaretUp /> : <FaCaretDown />}
              </DropdownHeader>
              <DropdownList isOpen={isStadiumDropdownOpen}>
                <MenuItem to="/add-stadium" isOpen={isOpen}>
                  <FaPlus />
                  <span>Add Stadium</span>
                </MenuItem>
                <MenuItem to="/List-stadium" isOpen={isOpen}>
                  <FaList />
                  <span>List Stadium</span>
                </MenuItem>
              </DropdownList>
            </DropdownContainer>

            <DropdownContainer>
              <DropdownHeader onClick={() => toggleDropdown(setUserDropdownOpen)}>
                <FaUser />
                <span>User</span>
                {isUserDropdownOpen ? <FaCaretUp /> : <FaCaretDown />}
              </DropdownHeader>
              <DropdownList isOpen={isUserDropdownOpen}>
                <MenuItem to="/List-User" isOpen={isOpen}>
                  <FaList />
                  <span>List User</span>
                </MenuItem>
              </DropdownList>
            </DropdownContainer>

            <DropdownContainer>
              <DropdownHeader onClick={() => toggleDropdown(setCategoryDropdownOpen)}>
                <FaTags />
                <span>Category</span>
                {isCategoryDropdownOpen ? <FaCaretUp /> : <FaCaretDown />}
              </DropdownHeader>
              <DropdownList isOpen={isCategoryDropdownOpen}>
                <MenuItem to="/add-Category" isOpen={isOpen}>
                  <FaPlus />
                  <span>Add Category</span>
                </MenuItem>
                <MenuItem to="/List-Category" isOpen={isOpen}>
                  <FaList />
                  <span>List Category</span>
                </MenuItem>
              </DropdownList>
            </DropdownContainer>
            <MenuItem to="/Revenue" isOpen={isOpen}>
              <FaUser />
              <span>Report</span>
            </MenuItem>

            <MenuItem to="/Findcontrollnumber" isOpen={isOpen}>
              <FaUser />
              <span>Find-Control-umber</span>
            </MenuItem>

            <MenuItem to="/profile" isOpen={isOpen}>
              <FaUser />
              <span>User Profile</span>
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
              <span>Generate Controll number</span>
            </MenuItem>

            <MenuItem to="/makepayemnt" isOpen={isOpen}>
              < FaWallet />
              <span>Payment</span>
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
              <span>User Profile</span>
            </MenuItem>
          </>
        )}

        {role === 'staff' && (
          <>
          <MenuItem to="/amountstadium" isOpen={isOpen}>
              <FaHome />
              <span>Dashboard</span>
            </MenuItem>
            

       
            <MenuItem to="/Listbookign" isOpen={isOpen}>
              <FaList />
              <span>List Booking</span>
            </MenuItem>

            <MenuItem to="/Findcontrollnumber" isOpen={isOpen}>
              <FaUser />
              <span>Find-Control-umber</span>
            </MenuItem>

            <MenuItem to="/profile" isOpen={isOpen}>
              <FaUser />
              <span>User Profile</span>
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
