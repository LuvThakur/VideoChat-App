import React from 'react'
import { Stack, Box, Badge, Avatar, Typography, alpha } from '@mui/material';
import { faker } from '@faker-js/faker';
import { useTheme } from '@emotion/react'
import StyledBadge from '../components/StyleBadge';
import { useDispatch, useSelector } from 'react-redux';
import { DecideConversation } from '../Redux/Slice/SidebarSlice';
import { fetchDirectone2oneConversation } from '../Redux/Slice/Conversation';

const ChatBox = ({ id, img, name, msg, time, unread, online }) => {




    console.log("msg-id>", msg, id);
    const theme = useTheme();

    const dispatch = useDispatch();

    const { room_id } = useSelector((state) => state.appe);


    const selectedChatId = room_id?.toString();



    let isSelected = room_id === id;


    if (!selectedChatId) {
        isSelected = false;
    }


    // const {current_message}
    const handleClick = () => {
        dispatch(DecideConversation({ room_id: id })); // Set selected user's room ID
        // dispatch(fetchDirectone2oneConversation({ conversationList: [{ id }] })); // Fetch conversation details of selected user
    }



    return (
        <Box

            onClick={handleClick}

            p={2}
            sx={{

                width: '100%',
                background: isSelected
                    ? theme.palette.mode === 'light'
                        ? '#BDE1FF' // Change background color when selected
                        : theme.palette.primary.main
                    : theme.palette.mode === 'light'
                        ? '#EAF2FE'
                        : theme.palette.background.default, borderRadius: '8px',
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



export default ChatBox;