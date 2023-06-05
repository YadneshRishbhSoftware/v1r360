import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

interface Props {
    children?: any;
    redirect?: string;
}

const Publicroute = ({children ,redirect = "/calender"} : Props) => {
    const token = localStorage.getItem("token")
    if(token) {
        return <Navigate to={redirect} />;
    }
  return children ? children : <Outlet />;
}

export default Publicroute
