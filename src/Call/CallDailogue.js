import React from 'react'

import { Dialog, DialogTitle, Stack, Box, IconButton, DialogActions, DialogContent, Button, Typography } from '@mui/material';

import { XCircle } from 'phosphor-react';

import { useTheme } from '@emotion/react';
import Search_Component from '../Search/Search_Component';
import NewCallBox from '../Call/NewCallBox';
import { Call_history } from '../data';

export default function CallDailogue({ open, handleClose }) {
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"

            fullWidth
            maxWidth="xs"
            keepMounted
        >
            <DialogTitle id="alert-dialog-title">


                <Stack spacing={2}>

                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        Create New Group
                        <IconButton onClick={handleClose}>
                            < XCircle />
                        </IconButton>
                    </Stack>
                    <Stack width={'100%'}>
                        <Box

                            sx={{
                                background: theme.palette.mode === 'light' ? '#EAF2FE' : theme.palette.background.default,
                                borderRadius: '5px',
                                display: 'flex',
                                height: '50px',
                                alignItems: 'center'
                            }}
                        >
                            <Stack width={'100%'}>
                                <Search_Component />
                            </Stack>
                        </Box>
                    </Stack>

                    <Typography variant='subtitle2'>
                        All Contacts
                    </Typography>
                </Stack>
            </DialogTitle>
            <DialogContent >
                <Stack spacing={2} mt={4}>

                    {
                        Call_history.map((el) => {
                            return <NewCallBox key={el.id} {...el} />
                        })
                    }
                </Stack>
            </DialogContent>

        </Dialog>
    )
}
