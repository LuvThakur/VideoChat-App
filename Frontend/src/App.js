// routes
import Router from "./routes";
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';

import React from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import { useDispatch, useSelector } from "react-redux";
import { CloseAlertSnackbar } from "./Redux/Slice/SidebarSlice";


function App() {

  const vertical = "top";
  const horizontal = "right";


  const { open, message, severity } = useSelector((state) => state.appe.AlertSnackbar);

  const dispatch = useDispatch();



  const handleClose = () => {

    dispatch(CloseAlertSnackbar());

  }

  // // Ensure message and severity are strings

  const alertMessage = message;
  const alertSeverity = severity;


  // transition


  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
  });

  return (
    <>
      <ThemeProvider>
        <ThemeSettings>
          <Router />
        </ThemeSettings>
      </ThemeProvider>

      {open && alertMessage ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          key={vertical + horizontal}
          autoHideDuration={1000}
          onClose={handleClose}

          TransitionComponent={Transition}
        >


          <Alert
            onClose={handleClose}
            severity={alertSeverity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {alertMessage}
          </Alert>



        </Snackbar>
      ) :
        <> </>

      }
    </>
  );
}

export default App;

