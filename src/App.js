import React from 'react';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginForm from './Component/user/LoginForm';
import Registeruser from './Component/user/Registeruser';
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
import Listuser from './Component/user/Listuser';
import UserDetails from './Component/user/UserDetails';
import EditUser from './Component/user/EditUser';
import Editbooking from './Component/Booking/Editbooking';
import Bookingdetailbystadium from './Component/Stadium/Bookingdetailbystadium';
import Dashboard from './Component/Dashboard';
import Userprofile from './Component/user/Userprofile';
import StadiumListUser from './Component/Stadium/StadiumListUser';
import CategoryListuser from './Component/Category/CategoryListuser';
import ConfirmedBookingsTable from './Component/Booking/ConfirmedBookingsTable';

import PaymentPage from './Component/Payment/Paymentpage';
import CreateStadiumstaff from './Component/Staff/CreateStadiumstaff';
import Bookingliststaff from './Component/Staff/Bookingliststaff';
import Paymentaddform from './Component/Payment/Paymentaddform';
import StaffList from './Component/Staff/StaffList';
import StadiumRevenue from './Component/StadiumRevenue';
import Bookingperyear from './Component/Booking/Bookingperyear';
import BookingsPerMonth from './Component/Booking/Bookingpermonth';
import EditStaff from './Component/Staff/EditStaff';
import RevenueReport from './Component/Revenu/RevenueReport';
import PaymentComponent from './Component/Payment/PaymentComponent';
import PaymentTable from './Component/Payment/PaymentTable';


const Content = styled.div`
  padding: 20px;
  transition: margin-left 0.3s ease;
  min-height: 100vh;

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
          <Route path="/List-User" element={<Listuser />} />
          <Route path="/profile" element={<Userprofile />} />

          <Route path="/satff-add" element={<CreateStadiumstaff />} />

          <Route path="/Findcontrollnumber" element={<PaymentComponent />} />
          
          <Route path="/Revenue" element={<RevenueReport />} />
          
          <Route path="/totalbooking" element={<Bookingperyear />} />
          <Route path="/Monthbooking" element={<BookingsPerMonth />} />
          <Route path="/edit/:userid" element={<EditStaff />} />


          <Route path="/admin" element={<Dashboard />} />
         

          <Route path="/edit-User/:userid" element={<EditUser />} />
          <Route path="/user-details/:username" element={<UserDetails />} />
          <Route path="/BookingBystadium/:stadiumid" element={<Bookingdetailbystadium />} />

          <Route path="/add-Category" element={<Categoryaddfrom />} />
          <Route path="/Stafflist" element={<StaffList />} />

          <Route path="/add-stadium" element={<StadiumAddform />} />
          <Route path="/edit-stadium/:stadiumid" element={<Editstadium />} />
          <Route path="/edit-Category/:categoryid" element={<CataegoryEdit />} />
          <Route path="/List-booking" element={<BookingList />} />


          <Route path="/payment/:bookingId" element={<PaymentPage />} />


          <Route path="/edit-booking/:bookingId" element={<Editbooking />} />
        </>
      );
    }

    if (role === 'user') {
      return (
        <>
          <Route path="/List-stadium-user" element={<StadiumListUser/>} />
          <Route path="/List-Category-user" element={<CategoryListuser />} />
          <Route path="/Create-booking" element={<Createbooking />} />
          <Route path="/BookingBystadium/:stadiumid" element={<Bookingdetailbystadium />} />
          <Route path="/Listbyuser-booking" element={<BookingListbyuser />} />
          <Route path="/Listbooking-confired" element={<ConfirmedBookingsTable />} />
          <Route path="/profile" element={<Userprofile />} />
          <Route path="/payment/:bookingId" element={<PaymentPage />} />
          <Route path="/makepayemnt" element={<Paymentaddform />} />
          <Route path="/edit-booking/:bookingId" element={<Editbooking />} />

          <Route path="*" element={<Navigate to="/List-stadium-user" />} />

        </>
      );
    }


    if (role === 'staff') {
      return (
        <>
        
       
        <Route path="/Listbookign" element={<Bookingliststaff/>} />
        <Route path="/edit-booking/:bookingId" element={<Editbooking />} />
          <Route path="/profile" element={<Userprofile />} />
          <Route path="/amountstadium" element={< StadiumRevenue/>} />
          <Route path="/Findcontrollnumber" element={<PaymentComponent />} />

          <Route path="/paymenttable" element={<PaymentTable />} />
          <Route path="*" element={<Navigate to="/Listbookign" />} />


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
