import React from "react";
import Lottie from "lottie-react";
import R_360 from "../assets/R360_Lite.json";
import "../assets/css/loader.css"
const Loader = () =>  <div className="loader"><Lottie animationData={R_360} loop={true} style={{
    width: "100vw",
    height: "100vh",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}} /></div>;

export default Loader;
