import React, { useEffect } from "react";
import useResponsive from "../../hooks/useResponsive";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { connectSocket, socket } from "../../socket";
import {
  DecideConversation,
  ShowAlertSnackbar,
  FetchUserProfile,
} from "../../Redux/Slice/SidebarSlice";

import {
  addNewDirectConversation,
  updateExistingDirectConversation,
  AddDirectMessage,
} from "../../Redux/Slice/Conversation";

import AudioCallNotification from "../../Sections/dashboard/Audio/CallNotification";
import AudioCallDialog from "../../Sections/dashboard/Audio/CallDialogBox";


import {
  PushIntoAudioCallQueue,
  UpdateAudioCallBox,
} from "../../Redux/Slice/AudioCall";

const DashboardLayout = () => {
  const isDesktop = useResponsive("up", "md");

  const dispatch = useDispatch();

  // const {user_id} = useSelector((state) => state.auth);

  // u have to use same varible which use in redux store for signout
  const { isLoggedIn } = useSelector((state) => state.auth);

  const conversationList = useSelector(
    (state) => state.conversation.direct_chat.conversationList
  );

  const user_id = window.localStorage.getItem("user_id");

  // console.log("user->dash", user_id);

  useEffect(() => {
    dispatch(FetchUserProfile());
  });

  const { current_conversation } = useSelector(
    (state) => state.conversation.direct_chat
  );

  const { open_audio_notification_dialog, open_audio_dialog } = useSelector(
    (state) => state.audioCall
  );

  useEffect(() => {
    if (isLoggedIn) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
      };

      window.onload();

      if (!socket) {
        connectSocket(user_id);
      }

      socket.on("new_friend_request", (data) => {
        dispatch(ShowAlertSnackbar(data.message, "success")); // Pass message and severity directly
      });

      socket.on("request_accepted", (data) => {
        dispatch(ShowAlertSnackbar(data.message, "success")); // Pass message and severity directly
      });

      socket.on("request_sent", (data) => {
        dispatch(ShowAlertSnackbar(data.message, "success")); // Pass message and severity directly
      });

      socket.on("request_sent_error", (data) => {
        dispatch(ShowAlertSnackbar(data.message, "success")); // Pass message and severity directly
      });

      socket.on("request_accepted_error", (data) => {
        dispatch(ShowAlertSnackbar(data.message, "success")); // Pass message and severity directly
      });

      socket.on("start_chat", (data) => {
        console.log("Received conversation data:", data);
        console.log("Current conversation list:", conversationList);

        // Check if the received conversation already exists in the conversation list
        const existingConversation = conversationList.find(
          (el) => el?.id === data._id
        );

        if (existingConversation) {
          console.log("Existing conversation found:", data);
          // Dispatch an action to update the existing conversation
          dispatch(
            updateExistingDirectConversation({ conversationList: data })
          );
        } else {
          console.log("New conversation:", data);
          // Dispatch an action to add the new conversation to the conversation list
          dispatch(addNewDirectConversation({ conversationList: data }));
        }
        //particular conversation id
        dispatch(DecideConversation({ room_id: data._id }));
      });

      socket.on("new_message", (data) => {
        console.log(
          "current_conversation ->",
          current_conversation,
          "data->",
          data
        );

        const message = data.message;

        // check msg we got is  currently selected conversation  ?

        if (current_conversation?.id === data.conversation_id) {
          dispatch(
            AddDirectMessage({
              id: message._id,
              type: "msg",
              subtype: message.type,
              message: message.text,
              incoming: message.to === user_id,
              outgoing: message.from === user_id,
            })
          );
        }
      });

      socket.on("audio_call_notification", (data) => {
        // TODO => dispatch an action to add this in call_queue
        dispatch(PushIntoAudioCallQueue(data));
      });

      return () => {
        socket?.off("new_friend_request");
        socket?.off("request_accepted");
        socket?.off("request_Sent");
        socket?.off("start_chat");
        socket?.off("new_message");
        socket?.off("audio_call_notification");
      };
    }
  }, [isLoggedIn, socket]);

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <>
      <Stack direction={"row"}>
        <Sidebar />
        <Outlet />
      </Stack>

      {open_audio_notification_dialog && (
        <AudioCallNotification open={open_audio_notification_dialog} />
      )}

      {open_audio_dialog && (
        <AudioCallDialog
          open={open_audio_dialog}
          handleClose={handleCloseAudioDialog}
        />
      )}
    </>
  );
};

export default DashboardLayout;
