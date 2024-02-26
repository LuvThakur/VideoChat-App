import { Container, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import logo from '../../assets/Images/logo.ico';

const MainLayout = () => {
  return (
    <>
      <Container maxWidth="sm">
        <Stack spacing={5}>
          <Stack alignItems={'center'} justifyContent={'center'} width={'100%'}>

            <img src={logo} alt="logo" style={{ height: '100px', width: "100px" }} />
          </Stack>
        </Stack>

        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
