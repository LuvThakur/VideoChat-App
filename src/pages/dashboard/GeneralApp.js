import React from "react";
import Chats from "./Chats";
import { Stack, Box } from "@mui/material";
import Conversation from "../../components/Conversation";
import { useTheme } from "@emotion/react";

const GeneralApp = () => {

  const theme = useTheme();

  return (
    <Stack direction={'row'}>
      <Chats />

      <Box sx={{ width: 'calc(100vw - 480px)', height: '100%' }}>

        <Conversation />
      </Box>

    </Stack >

  );
};

export default GeneralApp;

