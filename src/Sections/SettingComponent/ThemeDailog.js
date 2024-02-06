import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, DialogContentText } from '@mui/material';

const ThemeDailog = ({ open, handleClose }) => {

    const handleCancel = () => {
        handleClose(false);
    };

    const handleYes = () => {
        // Handle the "Yes" action here if needed
        handleClose(true);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to block this account?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Click "Yes" to block.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleYes} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ThemeDailog;
