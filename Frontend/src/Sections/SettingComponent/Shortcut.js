import React from 'react';
import { Grid, Slide, Dialog, DialogActions, DialogContent, DialogTitle, Button,  Stack, Typography, } from '@mui/material';



export default function Shortcut({ open, handleClose }) {
    const handleYes = () => {
        handleClose(true);
    };

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    
    const list = [
        {
            index: 0,
            text: "Mark as Unread",
            Combo: ["Cmd", "Shift", "U"]

        },
        {
            index: 1,
            text: "Archive Chat",
            Combo: ["Cmd", "Shift", "E"]

        },
        {
            index: 2,
            text: "Pin Chat",
            Combo: ["Cmd", "Shift", "P"]

        },
        {
            index: 3,
            text: "Search Chat",
            Combo: ["Cmd", "Shift", "F"]

        },
        {
            index: 4,
            text: "Next Chat",
            Combo: ["Ctrl", "Tab"]

        },
        {
            index: 5,
            text: "Next Tab",
            Combo: ["Cmd", "Shift", "N"]

        },
        {
            index: 6,
            text: "New Group",
            Combo: ["Cmd", "Shift", "N"]

        },
        {
            index: 7,
            text: "Increase speed of voice message",
            Combo: ["Shift", "."]

        },
        {
            index: 8,
            text: "Settings",
            Combo: ["Shift", ","]

        },
        {
            index: 9,
            text: "Settings",
            Combo: ["Cmd", "G"]

        },
        {
            index: 10,
            text: "Mute",
            Combo: ["Cmd", "Shift", "M"]

        },
        {
            index: 11,
            text: "Delete chat",
            Combo: ["Cmd", "Shift", "D"]

        },
        {
            index: 12,
            text: "Search",
            Combo: ["Cmd", "F"]

        },
        {
            index: 13,
            text: "New Chat",
            Combo: ["Cmd", "N"]

        },
        {
            index: 14,
            text: "Previous Chat",
            Combo: ["Ctrl", "Shift", "T"]

        },
        {
            index: 15,
            text: "Profile & About  ",
            Combo: ["Cmd", "P"]

        },
        {
            index: 16,
            text: "Profile & About",
            Combo: ["Shift", ","]

        },
        {
            index: 17,
            text: "Emoji Panel",
            Combo: ["Cmd", "E"]

        },
        {
            index: 18,
            text: "Sticker Panel",
            Combo: ["Cmd", "S"]

        },

    ];

    return (
        <Dialog
            fullWidth
            maxWidth='md'
            open={open}
            onClose={handleClose}
            keepMounted
            TransitionComponent={Transition}
        >
            <DialogTitle>Keyboard Shortcut</DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
                <Grid container spacing={3}>
                    {list.map(({ index, text, Combo }) => (
                        <Grid item key={index} xs={12}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                <Typography variant="body1">{text}</Typography>
                                <Stack direction="row" spacing={1}>
                                    {Combo.map((el, i) => (
                                        <Button key={i} disabled variant="contained" sx={{ color: '#000', backgroundColor: '#F3F3F3' }}>
                                            {el}
                                        </Button>
                                    ))}
                                </Stack>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleYes} variant='contained'>Ok</Button>
            </DialogActions>
        </Dialog>
    );
}
