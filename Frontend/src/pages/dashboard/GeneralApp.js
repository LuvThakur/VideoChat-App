import React from "react";
import Chats from "./Chats";
import { Stack, Box, Typography } from "@mui/material";
import Conversation from "../../components/Conversation";
import Contact from "./Contact";
import { useSelector } from "react-redux";
import SharredMessage from "../../components/SharredMessage";
import StarredMessage from "../../components/StarredMessage";
import NoChat from "../../assets/Illustration/NoChat";
import { Link, useSearchParams } from "react-router-dom";

import { useTheme } from "@emotion/react";



import ChatComponent from "./Conversation_Handling";

const GeneralApp = () => {


  const theme = useTheme();

  // const selector = useSelector(state => state.appe.sidebar);

  const sidebar = useSelector(state => state.appe.sidebar);

  const { chat_type, room_id } = useSelector(state => state.appe);


  const [searchParams] = useSearchParams();
  
  return (
    <Stack direction={'row'} >
      <Chats />

      <Box sx={{ width: sidebar.isOpen ? 'calc(100vw - 750px)' : 'calc(100vw - 450px)', height: '100%', borderBottom: searchParams.get("type") === "individual-chat" && searchParams.get("id") ? '0px' : '6px solid #0162c4' }}>


        {

          chat_type === 'individual' && room_id !== null ? <ChatComponent /> :
            <Stack justifyContent={'center'} alignContent={'center'} alignItems={'center'} spacing={5}>

              <Stack>
                <NoChat />
              </Stack>

              <Typography variant="subtitle2">
                Select a conversation or start a{" "}
                <Link
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                  }}
                  to="/"
                >
                  new one
                </Link>
              </Typography>
            </Stack>

        }
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
