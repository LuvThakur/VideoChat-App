import React from 'react'
import { Stack, Box, styled, Badge, Avatar, Typography, IconButton, Divider } from '@mui/material';
import { useTheme } from '@emotion/react';
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from 'phosphor-react';
import { faker } from '@faker-js/faker';



export default function DasHeader() {

    const theme = useTheme();



    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '1px solid currentColor',
                content: '""',
            },
        }
    }));

    return (
        <Box sx={{ height: '90px', backgroundColor: theme.mode === 'light' ? 'dark' : theme.palette.background.default, boxShadow: '0px 0px 2px rgba(0,0,0,0.25)' }} width="100%" p={1}>

            <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%" height="100%" p={1}>

                <Stack direction="row" alignItems="center" >
                    <Stack direction="row" spacing={2}>
                        <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                            <Avatar alt="Image Not Load" src={faker.image.avatar()} />
                        </StyledBadge>

                        <Stack direction="column" spacing={0.1}>
                            <Typography variant="subtitle2" fontWeight="800">
                                {'Animal Kingdom'}
                            </Typography>
                            <Typography variant="caption">
                                {'msg'}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack direction="row" alignItems="center" height={'100%'} spacing={1}>
                    <IconButton>
                        <VideoCamera />
                    </IconButton>
                    <IconButton>
                        <Phone />
                    </IconButton>
                    <IconButton>
                        <MagnifyingGlass />
                    </IconButton>
                    <Divider orientation="vertical" color='red' />
                    <IconButton>
                        <CaretDown />
                    </IconButton>
                </Stack>

            </Stack>
        </Box >

    )
}
