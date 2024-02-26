import { Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useTheme } from '@emotion/react';
import Search_Component from '../../Search/Search_Component';
import { PhoneCall, PhoneX } from 'phosphor-react';
import { SimpleBarStyle } from '../../components/Scrollbar';
import { Call_history } from '../../data';
import CallBox from '../../Call/CallBox';
import CallDailogue from '../../Call/CallDailogue';


export default function CallLog() {

    const [open, setopen] = useState(false);

    const handleClose = () => {
        setopen(false);
    }

    const theme = useTheme();

    return (
        <Box
            sx={{
                position: 'relative',
                backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper,
                boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
                width: '320px',
                height: '100vh',

            }}
        >
            <Stack p={2} spacing={2} height={'100vh'}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography variant='h4'>
                        Call Logs
                    </Typography>
                    <IconButton>
                        <PhoneCall />
                    </IconButton>
                </Stack>

                <Stack width={'100%'}>
                    <Box

                        sx={{
                            background: theme.palette.mode === 'light' ? '#EAF2FE' : theme.palette.background.default,
                            borderRadius: '20px',
                            display: 'flex',
                            height: '50px',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Stack>
                            <Search_Component />
                        </Stack>
                    </Box>
                </Stack>

                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography >
                        Start new Conversation
                    </Typography>
                    <IconButton onClick={() => { setopen(true) }}>
                        <PhoneX color='#709CE6' />
                    </IconButton>
                </Stack>

                <Divider />
                <Stack sx={{ flexGrow: 1, overflowY: 'auto', height: '100%' }} >
                    <SimpleBarStyle timeout={500} clickOnTrack={false} >
                        <Stack direction={'column'} spacing={2.5}>

                            {Call_history.map((el) => {
                                return <CallBox key={el.id}  {...el} />
                            }

                            )}
                        </Stack>
                    </SimpleBarStyle>

                </Stack>
            </Stack>
            {open && <CallDailogue open={open} handleClose={handleClose} />}
        </Box>
    )
}
