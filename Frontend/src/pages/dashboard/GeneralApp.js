import React from "react";
import Chats from "./Chats";
import { Stack, Box } from "@mui/material";
import Conversation from "../../components/Conversation";
import Contact from "./Contact";
import { useSelector } from "react-redux";
import SharredMessage from "../../components/SharredMessage";
import StarredMessage from "../../components/StarredMessage";


const GeneralApp = () => {


  // const selector = useSelector(state => state.appe.sidebar);

  const sidebar = useSelector(state => state.appe.sidebar);

  return (
    <Stack direction={'row'} >
      <Chats />

      <Box sx={{ width: sidebar.isOpen ? 'calc(100vw - 750px)' : 'calc(100vw - 450px)', height: '100%' }}>

        <Conversation />
      </Box>
      {sidebar.isOpen && (() => {
        switch (sidebar.type) {
          case 'Contact':
            return <Contact />;

          case 'Share':
            return <SharredMessage />;

          case 'Starred':
            return <StarredMessage />
            
          default:
            return null;
        }
      })()}
    </Stack >

  );
};

export default GeneralApp;
