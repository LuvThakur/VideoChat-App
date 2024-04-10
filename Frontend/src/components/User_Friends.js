import React from 'react'
import { useTheme } from '@emotion/react'
import { Button, Stack, Typography, Box, Avatar, IconButton } from '@mui/material';
import StyledBadge from './StyleBadge';
import { faker } from '@faker-js/faker';
import { socket } from "../Socket";
import { MessengerLogo } from 'phosphor-react';

const UserComponent = ({ firstname, lastname, _id, online, img }) => {

    const theme = useTheme();

    const name = `${firstname} ${lastname}`;


    const user_id = window.localStorage.getItem("user_id");

    console.log("u-id", user_id);


    return (
        <Box

            p={2}
            sx={{
                width: "100%",
                borderRadius: 1,
                backgroundColor: theme.palette.background.neutral


            }}
        >

            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} >
                {
                    online ?
                        (
                            <StyledBadge

                                overlap='circular'
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant='dot'

                            >

                                <Avatar alt="Image Not Load" src={faker.image.avatar()} />

                            </StyledBadge>

                        )
                        :
                        <Avatar alt="Image Not Load" src={faker.image.avatar()} />


                }

                <Stack direction={'column'} spacing={0.1} >
                    <Typography variant='subtitle2'>
                        {name}
                    </Typography>

                </Stack>

                <Stack direction={'row'} spacing={2} alignItems={'center'}>

                    <Button
                        onClick={() => {


                            socket.emit("friend_request", { to: _id, from: user_id }, () => {
                                console.log("Friend request sent");
                                alert("Request sent");
                            });
                        }}
                    >
                        Send Request
                    </Button>

                </Stack>
            </Stack>

        </Box>
    )
}

const UserFriendsComponent = ({ firstname, lastname, _id, online, img }) => {

    const theme = useTheme();

    const name = `${firstname} ${lastname}`;

    return (
        <Box

            p={2}
            sx={{
                width: "100%",
                borderRadius: 1,
                backgroundColor: theme.palette.background.neutral


            }}
        >

            <Stack direction={'row'} alignItems={'center'} spacing={2}>
                {
                    online ?
                        (
                            <StyledBadge

                                overlap='circular'
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant='dot'

                            >

                                <Avatar alt="Image Not Load" src={faker.image.avatar()} />

                            </StyledBadge>

                        )
                        :
                        <Avatar alt="Image Not Load" src={faker.image.avatar()} />


                }

                <Stack direction={'column'} spacing={0.1} >
                    <Typography variant='subtitle2'>
                        {name}
                    </Typography>

                </Stack>

                <Stack direction={'row'} spacing={2} alignItems={'center'}>

                    <IconButton>
                        <MessengerLogo />
                    </IconButton>
                </Stack>
            </Stack>

        </Box>
    )
}

const FriendRequestComponent = ({ firstname, lastname, _id, online, img, id }) => {

    const theme = useTheme();

    const name = `${firstname} ${lastname}`;

    return (
        <Box

            p={2}
            sx={{
                width: "100%",
                borderRadius: 1,
                backgroundColor: theme.palette.background.neutral



            }}
        >

            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                {
                    online ?
                        (
                            <StyledBadge

                                overlap='circular'
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant='dot'

                            >

                                <Avatar alt="Image Not Load" src={faker.image.avatar()} />

                            </StyledBadge>

                        )
                        :
                        <Avatar alt="Image Not Load" src={faker.image.avatar()} />


                }

                <Stack direction={'column'} spacing={0.1} >
                    <Typography variant='subtitle2'>
                        {name}
                    </Typography>

                </Stack>

                <Stack direction={'row'} spacing={2} alignItems={'center'}>

                    <Button

                        onClick={() => {
                            socket.emit("accept_request", { request_id: id }, () => {
                                alert("req accept");
                                console.log("reqeust accept")
                            })
                        }}
                    >
                        Accept Request
                    </Button>

                </Stack>
            </Stack>

        </Box>
    )
}

export { UserComponent, UserFriendsComponent, FriendRequestComponent };