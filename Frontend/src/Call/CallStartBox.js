import React, { useEffect } from "react";
import { faker } from "@faker-js/faker";

import {
  Dialog,
  Slide,
  DialogTitle,
  Stack,
  Box,
  IconButton,
  DialogActions,
  DialogContent,
  Button,
  Typography,
} from "@mui/material";

import { XCircle } from "phosphor-react";

import { useTheme } from "@emotion/react";
import Search_Component from "../Search/Search_Component";
import NewCallBox from "./NewCallBox";
import { Call_history } from "../data";

import { useDispatch, useSelector } from "react-redux";

import { FetchFriends } from "../Redux/Slice/SidebarSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CallStartBox({ open, handleClose }) {
  const theme = useTheme();

  const { friends } = useSelector((state) => state.appe);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(FetchAllUsers());
    dispatch(FetchFriends());
  }, []);

  //   console.log(Call_history, all_users, "Call List Info");

  const list = friends.map(
    (el) => (
      {
        id: el?._id,
        name: `${el?.firstname} ${el?.lastname}`,
        image: faker.image.avatar(),
      }
    )
  );

  console.log("Call List Info", list);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Transition}
      fullWidth
      maxWidth="xs"
      keepMounted
    >
      <DialogTitle id="alert-dialog-title">
        <Stack spacing={2}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            Make a New Call
            <IconButton onClick={handleClose}>
              <XCircle />
            </IconButton>
          </Stack>
          {/* <Stack width={"100%"}>
            <Box
              sx={{
                background:
                  theme.palette.mode === "light"
                    ? "#EAF2FE"
                    : theme.palette.background.default,
                borderRadius: "5px",
                display: "flex",
                height: "50px",
                alignItems: "center",
              }}
            >
              <Stack width={"100%"}>
                <Search_Component />
              </Stack>
            </Box>
          </Stack> */}

          <Typography variant="subtitle2">All Contacts</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={4}>
          {list.map((el) => {
            return <NewCallBox key={el.id} {...el} />;
          })}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
