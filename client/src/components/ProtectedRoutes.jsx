import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
const accessToken = localStorage.getItem('accessToken')
console.log(accessToken);
if(!accessToken){
    return <Navigate to='/login'/>
}


  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default ProtectedRoutes