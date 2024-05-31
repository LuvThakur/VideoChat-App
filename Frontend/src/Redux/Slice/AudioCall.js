import { createSlice } from "@reduxjs/toolkit";
import { socket } from "../../socket";
import axios from "../../utils/axiosMethod";

const initialState = {
  open_audio_dialog: false,

  open_audio_notification_dialog: false,

  call_queue: [], // can have max 1 call at any point of time

  incoming: false,
};

const Slice = createSlice({
  name: "audiocall",

  initialState,

  reducers: {
    pushToAudioCallQueue: (state, action) => {
      if (state.call_queue.length === 0) {
        state.call_queue.push(action.payload.call);

        if (action.payload.incoming) {
          state.open_audio_notification_dialog = true;

          state.incoming = true;
        } else {
          state.open_audio_dialog = true;

          state.incoming = false;
        }
      } else {
        // if queue is not empty then emit user_is_busy => in turn server will send this event to sender of call

        socket.emit("user_is_busy_audio_call", { ...action.payload });
      }
    },

    resetAudioCallQueue: (state, action) => {
      state.call_queue = [];
      state.open_audio_notification_dialog = false;
      state.incoming = false;
    },

    closeNotificationBox: (state, action) => {
      state.open_audio_notification_dialog = false;
    },

    upDateCallBox: (state, action) => {
      state.open_audio_dialog = action.payload.state;
      state.open_audio_notification_dialog = false;
    },
  },
});

export default Slice.reducer;

export function StartAudioCall(id) {
  return async (dispatch, getState) => {
    dispatch(Slice.actions.resetAudioCallQueue());

    axios
      .post(
        "user/start-audio-call",
        { id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then((Response) => {
        console.log("respo-aduio=>>", Response);

        dispatch(
          Slice.actions.pushToAudioCallQueue({
            call: Response.data.data,
            incoming: false,
          })
        ).catch((err) => {
          console.log(err);
        });
      });
  };
}

export function PushIntoAudioCallQueue(call) {
  return async (dispatch, getState) => {
    dispatch(Slice.actions.pushToAudioCallQueue({ call, incoming: true }));
  };
}

export const ResetAnAudioCallQueue = () => {
  return async (dispatch, getState) => {
    dispatch(Slice.actions.resetAudioCallQueue());
  };
};

export const CloseAudioNotificationDialog = () => {
  return async (dispatch, getState) => {
    dispatch(Slice.actions.closeNotificationBox());
  };
};

export const UpdateAudioCallBox = ({ state }) => {
  return async (dispatch, getState) => {
    dispatch(Slice.actions.upDateCallBox({ state }));
  };
};
