import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';

function GuestLayout() {
    const {userToken, userRole} = useStateContext();

    if(userToken){
      return <Navigate to='/admin/dashboard' />
    }
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default GuestLayout;
