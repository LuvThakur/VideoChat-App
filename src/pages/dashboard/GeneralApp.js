import React from "react";
import Chats from "./Chats";
import { Stack, Box } from "@mui/material";
import Conversation from "../../components/Conversation";
import Contact from "./Contact";
import { useSelector } from "react-redux";


const GeneralApp = () => {


  // const selector = useSelector(state => state.appe.sidebar);

  const sidebar = useSelector(state => state.appe.sidebar);

  return (
    <Stack direction={'row'} >
      <Chats />

      <Box sx={{ width: sidebar.isopen ? 'calc(100vw - 750px)' : 'calc(100vw - 450px)', height: '100%' }}>

        <Conversation />
      </Box>
      {sidebar.isopen &&
        <Contact />
      }
    </Stack >

  );
};

export default GeneralApp;

