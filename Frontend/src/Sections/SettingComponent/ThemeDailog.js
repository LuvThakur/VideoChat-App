import React from 'react';
import { RadioGroup, FormControlLabel, Dialog, DialogActions, DialogContent, DialogTitle, Button, Radio } from '@mui/material';

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
            PaperProps={{ style: { maxWidth: 'max-content', padding: '0px 90px 0px 0px' } }}

        >
            <DialogTitle id="alert-dialog-title">
                {"Choose Theme mode "}
            </DialogTitle>
            <DialogContent>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Dark"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="Dark" control={<Radio />} label="Dark" />
                    <FormControlLabel value="Light" control={<Radio />} label="Light" />
                    <FormControlLabel value="System Default" control={<Radio />} label="System Default" />
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleYes} >
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ThemeDailog;
