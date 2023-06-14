import "./App.css";
import { Fragment, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import CalendarCard from "./components/CalendarCard";
import ForgotPassword from "./components/forgotPassword";
import OtpPage from "./components/OtpPage";
export const CACHE_STATIC_CONTENT = "static-v0";
export const CACHE_DYNAMIC_CONTENT = "dynamic-v0";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if ("caches" in window) {
      console.log("if");
      caches.match("/pinValue").then((response) => {
        console.log("response", response);
        if (location?.pathname === "/calender") {
          navigate("/calender")
        }else
          if (response) {
            console.log("if1");
            //if user have logged in once , and have set his pin number
            response.json().then((result) => {
              navigate("/otpPin");
            });
          } else {
            console.log("else1");
            //first time user
            navigate("/");
          }
      });
    } else {
      console.log("else");
      navigate("/");
    }
  }, []);

  return (
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
