import React from "react";
import {
  Stack,
  Box,
  Avatar,
  Typography,
  IconButton,
  Badge,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { faker } from "@faker-js/faker";

import { PhoneIncoming, PhoneOutgoing } from "phosphor-react";

import StyledBadge from "../components/StyleBadge";

// import { AWS_S3_REGION, S3_BUCKET_NAME } from "../config";

const CallBox = ({ id, img, name, incoming, missed, online, date }) => {
  const theme = useTheme();

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
          {" "}
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt="Image Not Load" src={faker.image.avatar()} />
            </StyledBadge>
          ) : (
            <Avatar alt="Image Not Load" src={faker.image.avatar()} />
          )}
          <Stack
            direction={"column"}
            spacing={0.2}
            justifyContent={"flex-start"}
          >
            <Typography variant="subtitle2">{name}</Typography>

            <Stack direction={"row"} alignItems={"center"} spacing={.5}>
              <IconButton>
                {incoming ? (
                  <PhoneIncoming size={16} color={missed?"red":"green"}/>
                ) : (
                  <PhoneOutgoing size={16} />
                )}
              </IconButton>
              <Typography variant="subtitle" fontSize={"12px"}>
                {incoming ? "incoming" : "outgoing"}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack>
          <Typography fontSize={"12px"}>{date ? date : "Unknown"}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CallBox;
