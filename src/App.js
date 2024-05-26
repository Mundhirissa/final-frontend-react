 
import './App.css';
import Registeruser from './Component/Registeruser';
import Navigabar from './Component/Navigation/Navigabar';
import LoginForm from './Component/LoginForm';
import StadiumAddform from './Component/Stadium/StadiumAddform';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StadiumList from './Component/Stadium/StadiumList';
import Editstadium from './Component/Stadium/Editstadium';
import Categoryaddfrom from './Component/Category/Categoryaddfrom';

function App() {
  return (
    <div className="App">
   <BrowserRouter>
   <Navigabar/>
   <Routes>

      
   <Route path="/" element={<LoginForm/>} />
   <Route path="/add-stadium" element={<StadiumAddform/>} />
   <Route path="/Register-form" element={<Registeruser/>} />
   <Route path="/List-stadium" element={<StadiumList/>} />
   <Route path="/List-Category" element={<Categoryaddfrom/>} />
   <Route path="/edit-stadium/:stadiumid" element={<Editstadium/>} />

   


   </Routes>
   
   
   </BrowserRouter>
    
 
    
    </div>
  );
}

export default App;
