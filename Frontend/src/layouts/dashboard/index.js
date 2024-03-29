import React, { useEffect } from 'react'
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { connectSocket, socket } from '../../Socket';
import { ShowAlertSnackbar } from '../../Redux/Slice/SidebarSlice';

const DashboardLayout = () => {

  // u have to use same varible which use in redux store for signout
  const { isLoggedIn } = useSelector((state) => state.auth)

  const dispatch = useDispatch();

  const user_id = window.localStorage.getItem("user_id");

  useEffect(() => {

    if (isLoggedIn) {

      window.onload = function () {

        if (!window.location.hash) {

          window.location = window.location + '#loaded';
          window.location.reload();
        }
      }

      // window.location.reload();

      if (!socket) {

        connectSocket(user_id);

      }


      socket.on("new_friend_request", (data) => {
        dispatch(ShowAlertSnackbar({ message: data.message, severity: "success" }));
      })

      socket.on("request_accepted", (data) => {
        dispatch(ShowAlertSnackbar({ message: data.message, severity: "success" }));
      })

      socket.on("request_Sent", (data) => {
        dispatch(ShowAlertSnackbar({ message: data.message, severity: "success" }));
      })


      return () => {

        socket.off("new_friend_request");
        socket.off("request_accepted");
        socket.off("request_Sent");
      }

    }

  }, [isLoggedIn, socket])


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
