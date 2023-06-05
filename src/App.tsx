import './App.css';
import { Fragment, useEffect } from 'react';
import {  Route,  Routes } from 'react-router-dom';
import Login from './components/Login';
import CalendarCard from './components/calendarCard';
import ForgotPassword from './components/forgotPassword';
import OtpPage from './components/OtpPage';
import Privateroute from './components/Privateroute';
import Publicroute from './components/Publicroute';
import Notroutefound from './components/Notroutefound';
export const CACHE_STATIC_CONTENT = 'static-v0';
export const CACHE_DYNAMIC_CONTENT = 'dynamic-v0';


function App() {
  return (
    <Fragment>
        <Routes>
          <Route path="/" element={<Publicroute><Login /></Publicroute>} />
          <Route path="/otpPin" element={<Privateroute><OtpPage /></Privateroute>} />
          <Route path="/calender" element={<Privateroute><CalendarCard /></Privateroute>} />
          <Route path="/forgotpassword" element={<Privateroute><ForgotPassword /></Privateroute>} />
          <Route path='*'  element={<Notroutefound/>} />
        </Routes>
    </Fragment>
  );
}

export default App;
