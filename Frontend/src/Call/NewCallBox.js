import React from "react";
import { Stack, Box, Avatar, Typography, IconButton } from "@mui/material";
import {
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  VideoCamera,
} from "phosphor-react";

import { useTheme } from "@emotion/react";
import { Call_history } from "../data";
import { useDispatch } from "react-redux";



import StartAudioCall from "../Redux/Slice/AudioCall";

const NewCallBox = ({ id, img, name, incoming, missed, online ,handleClose }) => {
  const theme = useTheme();

  const dispatch = useDispatch();

  return (
    <Box
      p={2}
      sx={{
        width: "100%",
        background:
          theme.palette.mode === "light"
            ? "#EAF2FE"
            : theme.palette.background.default,
        borderRadius: "8px",
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={2}>
          <Avatar alt="Image Not Load" src={img} />

          <Stack>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            onClick={() => {
              dispatch(StartAudioCall(id));
              handleClose();
            }}
          >
            <Phone style={{ color: theme.palette.primary.main }} />
          </IconButton>
          <IconButton>
            <VideoCamera style={{ color: theme.palette.primary.main }} />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default NewCallBox;
