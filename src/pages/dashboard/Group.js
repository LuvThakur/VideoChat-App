import React, { useState } from 'react'
import { Box, Stack, Typography, Link, IconButton, Divider } from '@mui/material'
import { useTheme } from '@emotion/react'
import Search_Component from '../../Search/Search_Component';
import { Plus, Users, UsersThree } from 'phosphor-react';
import { SimpleBarStyle } from '../../components/Scrollbar';
import { ChatList } from '../../data';
import ChatBox from '../../Chat/ChatBox';
import CreateGroup from '../../Sections/Group/CreateGroup';





export default function Group() {

    const theme = useTheme();

    const [open, setopen] = useState(false);

    const handleCloseDailog = () => {
        setopen(false);
    }

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
            <Stack spacing={2} height={'100vh'} p={2}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography variant='h4'>
                        Group
                    </Typography>
                    <IconButton>
                        <UsersThree />
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
                    <Typography component={Link} underline="none">
                        Create New Group
                    </Typography>
                    <IconButton onClick={() => { setopen(true) }}>
                        <Plus color='#709CE6' />
                    </IconButton>
                </Stack>
                <Divider />
                <Stack sx={{ flexGrow: 1, overflowY: 'scroll', height: '100%' }} >
                    <SimpleBarStyle timeout={500} clickOnTrack={false} >
                        <Stack direction={'column'} spacing={2.5}>
                            <Typography fontWeight={'700'} variant='subtitle2' color={'#676667'} >
                                Pinned
                            </Typography>

                            {ChatList.filter((chat) => chat.pinned === true).map((chat) => {
                                return <ChatBox key={chat.id}  {...chat} />
                            })}
                        </Stack>

                        <Stack direction={'column'} spacing={2.5}>
                            <Typography fontWeight={'700'} variant='subtitle2' color={'#676667'}>
                                All Chats
                            </Typography>

                            {ChatList.filter((chat) => chat.pinned === false).map((chat) => {
                                return <ChatBox key={chat.id} {...chat} />
                            })}
                        </Stack>
                    </SimpleBarStyle>

                </Stack>
            </Stack>
            {open && <CreateGroup open={open} handleClose={handleCloseDailog} />}
        </Box>
    )
}

