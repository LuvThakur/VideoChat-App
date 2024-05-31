import React, { useState } from "react";
import {
  Stack,
  Box,
  styled,
  Badge,
  Avatar,
  Typography,
  IconButton,
  Divider,
  Menu,
  Fade,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from "phosphor-react";
import { faker } from "@faker-js/faker";
import { useDispatch, useSelector } from "react-redux";

import useResponsive from "../../hooks/useResponsive";

import { ToggleSidebarfun } from "../../Redux/Slice/SidebarSlice"; // Correct import
import { StartAudioCall } from "../../Redux/Slice/AudioCall";

const conversation_menu = [
  {
    title: "Contact info",
  },
  {
    title: "Mute notifications",
  },

  {
    title: "Clear messages",
  },

  {
    title: "Delete chat",
  },
];

export default function DasHeader() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const isMobile = useResponsive("between", "md", "xs", "sm");

  const { current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        border: "1px solid currentColor",
        content: '""',
      },
    },
  }));

  const [conversationMenuAnchorEl, setConversationMenuAnchorEl] =React.useState(null);

  const openConversationMenu = Boolean(conversationMenuAnchorEl);

  const handleClickConversationMenu = (event) => {
    setConversationMenuAnchorEl(event.currentTarget);// what is currentTarget ?
  };

  const handleCloseConversationMenu = () => {
    setConversationMenuAnchorEl(null);
  };

  return (
    <Box
      sx={{
        backgroundColor:
          theme.mode === "light" ? "dark" : theme.palette.background.default,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
      }}
      width="100%"
      p={1}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        height="100%"
        p={1}
      >
        <Stack
          direction="row"
          alignItems="center"
          onClick={() => {
            dispatch(ToggleSidebarfun());
          }}
        >
          <Stack direction="row" spacing={2}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt="Image Not Load" src={faker.image.avatar()} />
            </StyledBadge>

            <Stack direction="column" spacing={0.1}>
              <Typography variant="subtitle2" fontWeight="800">
                {current_conversation?.name}
              </Typography>
              <Typography variant="caption">online</Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          height={"100%"}
          spacing={isMobile ? 1 : 3}
        >
          <IconButton>
            <VideoCamera />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch(StartAudioCall(current_conversation.user_id));
            }}
          >
            <Phone />
          </IconButton>

          {!isMobile && (
            <IconButton>
              <MagnifyingGlass />
            </IconButton>
          )}

          <Divider orientation="vertical" color="red" />

          <IconButton
            id="conversation-positioned-button"
            aria-controls={
              openConversationMenu ? "conversation-positioned-menu" : undefined
            }
            aria-haspopup="true"
            aria-expanded={openConversationMenu ? "true" : undefined}
            onClick={handleClickConversationMenu}
          >
            <CaretDown />
          </IconButton>

          <Menu
            MenuListProps={{ "aria-labelledby": "fade-button" }}
            TransitionComponent={Fade}
            id="conversation-positioned-menu"
            aria-labelledby="conversation-positioned-button"
            anchorEl={conversationMenuAnchorEl}
            open={openConversationMenu}
            onClose={handleCloseConversationMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box>
              <Stack>
                {conversation_menu.map((el) => {
                  <MenuItem onClick={handleCloseConversationMenu}>
                    <Stack
                      sx={{ minWidth: 100 }}
                      direction="row"
                      alignItems={"center"}
                      justifyContent="space-between"
                    >
                      <span>{el.title}</span>{" "}
                    </Stack>
                  </MenuItem>;
                })}
              </Stack>
            </Box>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
}
