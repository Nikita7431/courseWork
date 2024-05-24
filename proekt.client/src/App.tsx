import React, { useState, useEffect } from 'react';
import FetchMotoCard from './Components/FetchMotoCard';



//import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm';
import Navbars from './Components/Navbars';
import Profile from './Components/Profile';
import RegForm from './Components/RegForm';
import BookingList from './Components/BookingList';
import Info from './Components/Info';




const App: React.FC = () => {

    return (
        <div className="App">
       
                <header>
                    <h1>Honda motorcycle</h1>

                </header>
                <Navbars />

                <Routes>
                    <Route path="" element={<FetchMotoCard />} />
                    <Route path="/link" element={<LoginForm />} />
                <Route path="/user" element={<Profile />} />
                <Route path="/Reg" element={<RegForm />} />
                <Route path="/Booking" element={<BookingList />} />
                <Route path="/Info" element={<Info />} />
                    
                </Routes>
         
        </div>
    );
    
};

export default App;
