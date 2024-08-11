import { Outlet, Navigate } from "react-router-dom";
import React from 'react'

function ProtectedRoutes({props}) {
const user =  localStorage.getItem('token');
  return (
    user ? <Outlet /> : <Navigate to="/register"/> 
  )
}

export default ProtectedRoutes