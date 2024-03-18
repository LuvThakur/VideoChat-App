import React from 'react'
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const DashboardLayout = () => {

  // u have to use same varible which use in redux store for signout

  const { isLoggedIn } = useSelector((state) => state.auth)
  if (!isLoggedIn) {

    return <Navigate to="/auth/login" />
  }


  return (
    <Stack direction={'row'}>
      <Sidebar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
