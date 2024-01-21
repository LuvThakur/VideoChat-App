import React from 'react'
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Stack } from '@mui/material';

const DashboardLayout = () => {

  return (
    <Stack direction={'row'}>
      <Sidebar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
