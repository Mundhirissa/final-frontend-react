import React from 'react';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginForm from './Component/LoginForm';
import Registeruser from './Component/Registeruser';
import StadiumAddform from './Component/Stadium/StadiumAddform';
import StadiumList from './Component/Stadium/StadiumList';
import Editstadium from './Component/Stadium/Editstadium';
import Categoryaddfrom from './Component/Category/Categoryaddfrom';
import CategoryList from './Component/Category/CategoryList';
import CataegoryEdit from './Component/Category/CataegoryEdit';
import Createbooking from './Component/Booking/Createbooking';
import BookingList from './Component/Booking/BookingList';
import Sidebar from './Component/Navigation/Sidebar';
import GlobalStyles from './Component/Navigation/GlobalStyles';
import BookingListbyuser from './Component/Booking/BookingListbyuser';

const Content = styled.div`
  padding: 20px;
  transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: ${({ hasSidebar }) => (hasSidebar ? '60px' : '0')};
  }

  @media (min-width: 769px) {
    margin-left: ${({ hasSidebar }) => (hasSidebar ? '250px' : '0')};
  }
`;

const AppContent = () => {
  const location = useLocation();
  const showSidebar = location.pathname !== '/' && location.pathname !== '/Register-form';
  const role = localStorage.getItem('role');

  const renderRoutes = () => {
    if (!role) {
      return (
        <>
          <Route path="/" element={<LoginForm />} />
          <Route path="/Register-form" element={<Registeruser />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      );
    }

    if (role === 'admin') {
      return (
        <>
          <Route path="/List-stadium" element={<StadiumList />} />
          <Route path="/List-Category" element={<CategoryList />} />
          <Route path="/Create-booking" element={<Createbooking />} />
          <Route path="/Listbyuser-booking" element={<BookingListbyuser />} />
          <Route path="/add-Category" element={<Categoryaddfrom />} />
          <Route path="/add-stadium" element={<StadiumAddform />} />
          <Route path="/edit-stadium/:stadiumid" element={<Editstadium />} />
          <Route path="/edit-Category/:categoryid" element={<CataegoryEdit />} />
          <Route path="/List-booking" element={<BookingList />} />
        </>
      );
    }

    if (role === 'user') {
      return (
        <>
          <Route path="/List-stadium" element={<StadiumList />} />
          <Route path="/List-Category" element={<CategoryList />} />
          <Route path="/Create-booking" element={<Createbooking />} />
          <Route path="/Listbyuser-booking" element={<BookingListbyuser />} />
          <Route path="*" element={<Navigate to="/List-stadium" />} />
        </>
      );
    }

    return <Route path="*" element={<Navigate to="/" />} />;
  };

  return (
    <div className="App">
      {showSidebar && <Sidebar />}
      <Content hasSidebar={showSidebar}>
        <Routes>
          {renderRoutes()}
        </Routes>
      </Content>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
