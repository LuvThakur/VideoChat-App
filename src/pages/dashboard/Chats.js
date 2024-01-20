import React from 'react';
import { useTheme } from '@emotion/react';
import { Box, IconButton, Typography, InputBase, Button, Divider, Avatar, Badge } from '@mui/material';
import { Stack } from '@mui/material';
import { ArchiveBox, CircleDashed, MagnifyingGlass } from 'phosphor-react';
import { styled, alpha } from '@mui/material/styles';
import { faker } from '@faker-js/faker';
import { SimpleBarStyle } from '../../components/Scrollbar';
import { ChatList } from '../../../src/data/index';

const Chats = () => {

    const theme = useTheme();

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.mode === 'light' ? '#EAF2FE' : theme.palette.background.default, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.mode === 'light' ? '#EAF2FE' : theme.palette.background.default, 0.25),
        },
        marginRight: theme.spacing(3),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));



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
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));



    const ChatBox = ({ id, img, name, msg, time, unread, online }) => {
        return (
            <Box p={2} sx={{
                width: '100%',
                background: theme.palette.mode === 'light' ? '#EAF2FE' : theme.palette.background.default,
                borderRadius: '8px',
            }}>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} >
                    <Stack direction={'row'} spacing={2}>

                        {
                            online ?

                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <Avatar alt="Image Not Load" src={faker.image.avatar()} />
                                </StyledBadge>
                                :
                                <Avatar alt="Image Not Load" src={faker.image.avatar()} />

                        }

                        <Stack direction={'column'} spacing={0.1} >
                            <Typography variant='subtitle2'>
                                {name}
                            </Typography>
                            <Typography variant='caption'>
                                {msg}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack direction={'column'} justifyContent={'center'} spacing={2}>
                        <Typography variant='caption'>{time}</Typography>
                        {
                            unread === 0 ?
                                ''
                                :
                                <Badge color="secondary" badgeContent={`${unread}`}>

                                </Badge>
                        }
                    </Stack>
                </Stack>
            </Box>

        );
    };


    return (
        <Box
            sx={{
                position: 'relative',
                backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper,
                boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
                width: '350px',
                height: '100vh',

            }}
        >
            <Stack spacing={2} height={'100vh'} p={2} >
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography variant='h4'>
                        Chats
                    </Typography>

                    <IconButton>
                        <CircleDashed />
                    </IconButton>

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
                            <Search >
                                <SearchIconWrapper>
                                    <MagnifyingGlass width={'24px'} height={'24px'} color='blue' />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />

                            </Search>

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

                <Stack direction={'column'} sx={{ flexGrow: 1, overflowY: 'scroll', height: '100%' }} >
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
    );
}

export default Chats;
