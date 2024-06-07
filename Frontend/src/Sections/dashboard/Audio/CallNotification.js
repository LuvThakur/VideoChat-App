import { faker } from "@faker-js/faker";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ResetAnAudioCallQueue,
  UpdateAudioCallBox,
} from "../../../Redux/Slice/AudioCall";
import { socket } from "../../../socket";
// import { AWS_S3_REGION, S3_BUCKET_NAME } from "../../../config";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CallNotification = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.appe);
  const [call_details] = useSelector((state) => state.audiocall.call_queue);

  console.log("xyz-details-", call_details.from.firstname);

  const handleAccept = () => {
    socket.emit("audio_call_accepted", { ...call_details });

    console.log("audio_call_accepted-",{...call_details});

    dispatch(UpdateAudioCallBox({ state: true }));
  };

  const handleDeny = () => {
    //
    socket.emit("audio_call_denied", { ...call_details });
    dispatch(ResetAnAudioCallQueue());
    handleClose();
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDeny}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <Stack>
            <Stack direction="column" alignItems="center" spacing={2} p={3}>
              <Avatar
                sx={{ height: 100, width: 100, mb: 2 }}
                // src={`https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${call_details?.from_user?.avatar}`}
              />
              <Typography variant="h6">
                {call_details.from.firstname}
              </Typography>
            </Stack>

            {/* <Stack>
              <Avatar
                sx={{ height: 100, width: 100 }}
                // src={`https://${S3_BUCKET_NAME}.s3.${AWS_S3_REGION}.amazonaws.com/${user?.avatar}`}
              />
              <Typography></Typography>
            </Stack> */}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleAccept} variant="contained" color="success">
            Accept
          </Button>
          <Button onClick={handleDeny} variant="contained" color="error">
            Deny
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CallNotification;
