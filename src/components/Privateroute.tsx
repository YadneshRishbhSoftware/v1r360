import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface Props {
    children?: any;
    redirect?: string;
}

const Privateroute = ({children ,redirect = "/"} : Props) => {
    const token = localStorage.getItem("token")
    if(!token) {
        return <Navigate to={redirect} />;
    }
  return children ? children : <Outlet />;
}

export default Privateroute
