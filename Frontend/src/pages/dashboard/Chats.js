import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { Box, IconButton, Typography, Button, Divider } from '@mui/material';
import { Stack } from '@mui/material';
import { ArchiveBox, CircleDashed, User } from 'phosphor-react';
import { SimpleBarStyle } from '../../components/Scrollbar';
import { ChatList } from '../../../src/data/index';
import Search_Component from '../../Search/Search_Component';
import ChatBox from '../../Chat/ChatBox';
import FriendsDailogBox from '../../Sections/User_Collections/FriendsDailogBox';
const Chats = () => {

    const theme = useTheme();

    const [openDialoge, setDialoge] = useState(false);


    const handleOpenDialoge = () => {

        setDialoge(true);
    }

    const handleCloseDialoge = () => {

        setDialoge(false);
    }


    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper,
                    boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
                    width: '320px',
                    height: '100vh',

                }}
            >
                <Stack spacing={2} height={'100vh'} p={2} >
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography variant='h4'>
                            Chats
                        </Typography>


                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <IconButton onClick={() => { handleOpenDialoge() }}>
                                <User />
                            </IconButton>

                            <IconButton>
                                <CircleDashed />
                            </IconButton>
                        </Stack>
                    </Stack>


                    <Stack sx={{ width: '100%' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                background: theme.palette.mode === 'light' ? '#EAF2FE' : theme.palette.background.default,
                                height: '50px',
                                borderRadius: '20px',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                <Search_Component />
                            </Stack>
                        </Box>
                    </Stack>

                    <Stack direction={'row'} alignItems={'center'}>
                        <IconButton>
                            <ArchiveBox />
                        </IconButton>

                        <Button>
                            Archived
                        </Button>

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
            </Box >
            {
                openDialoge && <FriendsDailogBox open={openDialoge} handleClose={handleCloseDialoge} />
            }
        </>

    );
}

export default Chats;
