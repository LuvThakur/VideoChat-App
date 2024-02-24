import React from 'react'
import { Stack, Box,  Avatar, Typography, IconButton } from '@mui/material';
import { useTheme } from '@emotion/react'
import { PhoneIncoming, PhoneOutgoing } from 'phosphor-react';


const CallBox = ({ id, img, name, incoming, missed, date }) => {

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


                    <Stack direction={'column'} spacing={0.1} justifyContent={'flex-start'}>
                        <Stack>
                            <Typography variant='subtitle2'>
                                {name}
                            </Typography>
                        </Stack>

                        <Stack direction={'row'} alignItems={'center'}>

                            <IconButton>
                                {incoming ? <PhoneIncoming size={16} /> : <PhoneOutgoing size={16} />}
                            </IconButton>
                            <Typography variant='subtitle' fontSize={'12px'}>
                                {incoming ? "incoming" : "outgoing"}
                            </Typography>
                        </Stack>


                    </Stack>

                </Stack>

                <Stack>
                    <Typography fontSize={'12px'}>
                        {date}
                    </Typography>
                </Stack>


            </Stack>
        </Box>)
}
export default CallBox; 