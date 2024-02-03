import React from 'react'
import { Avatar, Box, IconButton, Stack, Typography, Badge, styled, Divider, Button } from '@mui/material'
import { CaretRight, Phone, Star, VideoCamera, XCircle, Bell, Prohibit, Trash } from 'phosphor-react';
import { useTheme } from '@emotion/react';
import { faker } from '@faker-js/faker';
import { useDispatch } from 'react-redux';
import { ToggleSidebarfun, TypeSidebarfun } from '../../Redux/Slice/SidebarSlice';
import AntSwitch from '../../components/AntSwitch';

function Contact() {
    const theme = useTheme();
    const dispatch = useDispatch();

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
        <Box width='300px' height='100vh' >

            <Stack height="100%" >

                <Box sx={{ width: '100%',  boxShadow: '0px 0px 2px rgba(0,0,0,0.25)' }} p={1}>
                    <Stack direction={'row'} alignItems='center' spacing={2} p={1}>
                        <IconButton onClick={() => { dispatch(ToggleSidebarfun()) }}>
                            <XCircle size={24} />
                        </IconButton>
                        <Typography variant='subtitle2'>
                            Contact info
                        </Typography>
                    </Stack>
                </Box>
                <Stack height="100%" direction='column' p={1}>

                    <Stack direction='row' alignItems='center' justifyContent='space-evenly' p={1}>
                        <StyledBadge>
                            <Avatar src={faker.image.avatar()} alt={faker.name.firstName()} style={{ width: 48, height: 48 }} />
                        </StyledBadge>
                        <Stack direction='column'>
                            <Typography variant='subtitle2'>
                                Luv Thakur
                            </Typography>
                            <Typography variant='subtitle2'>
                                +9177910857463
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack direction='row' alignItems='center' justifyContent='space-evenly'>
                        <Stack direction='column'>
                            <IconButton>
                                <VideoCamera />
                            </IconButton>
                            <Typography variant='subtitle2'>
                                Audio
                            </Typography>
                        </Stack>
                        <Stack direction='column'>
                            <IconButton>
                                <Phone />
                            </IconButton>
                            <Typography variant='subtitle2'>
                                Voice
                            </Typography>
                        </Stack>

                    </Stack>
                </Stack>
                <Divider />

                <Stack  direction='column' justifyContent='center' p={1}>
                    <Typography variant='subtitle2'>
                        About
                    </Typography>
                    <Typography variant='subtitle2'>
                        Hi there, i am using
                    </Typography>

                </Stack>

                <Divider />

                <Stack height="100%" direction='column' justifyContent='space-evenly' p={1}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between' >
                        <Typography variant='subtitle2'>
                            Media, links and docs
                        </Typography>

                        <Button endIcon={<CaretRight />} >
                            201
                        </Button>
                    </Stack>

                    <Stack direction='row' alignItems='center' justifyContent='space-evenly' p={1} spacing={2} >

                        {
                            [1, 2, 3].map((el) => (
                                <Box key={el} >
                                    <img src={faker.image.food()} alt={faker.name.firstName()} sx={{ width: '75px', height: '75px' }} />
                                </Box>
                            ))
                        }


                    </Stack>

                </Stack>

                <Divider />

                <Stack  direction='row' alignItems='center' justifyContent='space-between' p={1}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between' >

                        <IconButton>
                            <Star size={16} />
                        </IconButton>
                        <Typography variant='subtitle2'>
                            Starred Messages
                        </Typography>
                    </Stack>

                    <IconButton onClick={() => { dispatch(TypeSidebarfun("Starred")) }}>
                        <CaretRight size={16} />
                    </IconButton>
                </Stack>

                <Divider />

                <Stack  direction='row' alignItems='center' justifyContent='space-between' p={1}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between' >
                        <IconButton>
                            <Bell />
                        </IconButton>
                        <Typography variant='subtitle2'>
                            Mute Notifications
                        </Typography>

                    </Stack>


                    <AntSwitch />

                </Stack>


                <Divider />


                <Stack direction='column' p={1}>

                    <Stack p={1}>

                        <Typography variant='subtitle2'>
                            1 group in common
                        </Typography>
                    </Stack>
                    <Stack direction='row' alignItems='center' spacing={2} p={1}>

                        <Avatar src={faker.image.avatar()} alt={faker.name.firstName()} style={{ width: '32px', height: '32px' }} />

                        <Stack direction='column'>
                            <Typography variant='subtitle2'>
                                Camel’s Gang
                            </Typography>

                            <Typography variant='subtitle2'>
                                Owl, Parrot, Rabbit , You
                            </Typography>


                        </Stack>

                    </Stack>


                    <Stack direction='row' alignItems='center' spacing={4} p={1}>
                        <Button startIcon={<Prohibit />} fullWidth variant='outlined'>
                            Block
                        </Button>

                        <Button startIcon={<Trash />} fullWidth variant='outlined'>
                            Delete
                        </Button>
                    </Stack>
                </Stack>



            </Stack>


        </Box >
    )
}

export default Contact