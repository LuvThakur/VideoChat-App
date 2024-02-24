import React from 'react'
import { Stack, Box, Avatar, Typography, IconButton } from '@mui/material';
import { Phone, PhoneIncoming, PhoneOutgoing, VideoCamera } from 'phosphor-react';

import { useTheme } from '@emotion/react';
import { Call_history } from '../data';

const NewCallBox = ({ id, img, name, incoming, missed, date }) => {

    const theme = useTheme();

    return (
        <Box p={2} sx={{
            width: '100%',
            background: theme.palette.mode === 'light' ? '#EAF2FE' : theme.palette.background.default,
            borderRadius: '8px',
        }}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} >
                <Stack direction={'row'} spacing={2}>

                    <Avatar alt="Image Not Load" src={img} />


                    <Stack>
                        <Typography variant='subtitle2'>
                            {name}
                        </Typography>
                    </Stack>



                </Stack>

                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} >
                    <IconButton >
                        <Phone color='green' />
                    </IconButton>
                    <IconButton>
                        <VideoCamera color='green' />
                    </IconButton>
                </Stack>


            </Stack>
        </Box>)
}

export default NewCallBox;