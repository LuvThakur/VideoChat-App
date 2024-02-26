import React from 'react'
import { Stack, Box,Badge, Avatar, Typography} from '@mui/material';
import { faker } from '@faker-js/faker';
import { useTheme } from '@emotion/react'
import StyledBadge from '../components/StyleBadge';

const ChatBox = ({ id, img, name, msg, time, unread, online }) => {

    const theme = useTheme();

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



export default ChatBox;