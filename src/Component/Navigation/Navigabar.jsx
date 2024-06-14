import { Navbar, Nav } from 'rsuite';
import CogIcon from '@rsuite/icons/legacy/Cog';
import { Link } from 'react-router-dom';

const Navigabar = () => (
  <Navbar>
    <Navbar.Brand href="#">RSUITE</Navbar.Brand>
    <Nav>
    <Nav.Item> <Link to={'/'}>Home</Link> </Nav.Item>
      <Nav.Item><Link to={'/Create-booking'}>Book</Link></Nav.Item>
      <Nav.Item> <Link to={'/List-stadium'}> Stadium</Link>  </Nav.Item>
 
        <Nav.Item> <Link to={'/List-Category'}>  Category</Link></Nav.Item>
        <Nav.Item><Link to={'/List-booking'}>List-Booking</Link></Nav.Item>
       
    </Nav>
    <Nav pullRight>
      <Nav.Item icon={<CogIcon />}>Settings</Nav.Item>
    </Nav>
  </Navbar>
);
export default Navigabar;