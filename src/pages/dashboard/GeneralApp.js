import React from "react";
import Chats from "./Chats";
import { Stack, Box } from "@mui/material";
import Conversation from "../../components/Conversation";
import { useTheme } from "@emotion/react";

const GeneralApp = () => {

  const theme = useTheme();
  console.log(theme)

  return (
    <Stack direction={'row'}>
      <Chats />

      <Box sx={{ width: 'calc(100vw - 480px)', height: '100%', backgroundColor: theme.mode === 'light' ? 'black' : theme.palette.background.default }}>

        <Conversation />
      </Box>

    </Stack >

  );
};

export default GeneralApp;
