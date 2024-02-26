import { Box, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@emotion/react'
import { CaretLeft } from 'phosphor-react';
import Profile_Form from '../../Sections/Profile/Profile_Form';


export default function Profile() {

    const theme = useTheme();

    return (
        <Box width={'320px'} height={'100vh'} sx={{ backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper, boxShadow: '0 0 2px rgba(0,0,0,.25)' }}>

            <Stack direction={'column'} width={'100%'} p={4} spacing={5}>

                <Stack direction={'row'} alignItems={'center'} spacing={3}>
                    <IconButton>
                        <CaretLeft />
                    </IconButton>
                    <Typography variant='h5'>
                        Profile
                    </Typography>
                </Stack>

                {/* profile form */}
                <Profile_Form />
            </Stack>
        </Box>
    )
}
