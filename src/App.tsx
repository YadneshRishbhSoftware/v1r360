import './App.css';
import { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Router, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import CalendarCard from './components/calendarCard';
import ForgotPassword from './components/forgotPassword';
import OtpPage from './components/OtpPage';
export const CACHE_STATIC_CONTENT = 'static-v0';
export const CACHE_DYNAMIC_CONTENT = 'dynamic-v0';
function App() {
  // const [lendingComponent, setLendingComponent] = useState('');
  const navigate = useNavigate()
  useEffect(() => {
    if ('caches' in window) {      
      caches.match('/pinValue').then((response) => {
        if (response) {       //if user have logged in once , and have set his pin number    
          response.json().then((result)  =>  {
            // self.setState({
            //   lendingComponent: 'PinLogin'
            // })
            // navigate("/otpPin")
          });
        }
        else {     //first time user    
          navigate("/")
        }
      });
    } else {
      navigate("/")
    }
  }, []); 
  return (
    // <Login />
    <Fragment>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/otpPin" element={<OtpPage />} />
          <Route path="/calender" element={<CalendarCard />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
    </Fragment>
  );
}

export default App;
