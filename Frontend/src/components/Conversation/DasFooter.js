import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { Stack, Box, IconButton, TextField, InputAdornment, Typography } from '@mui/material';
import { Camera, File, Image, LinkSimple, Smiley, Sticker, TelegramLogo, User } from 'phosphor-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import { socket } from '../../socket';

import { useSelector } from 'react-redux';

export default function DasFooter() {
    const theme = useTheme();



    const [selectPicker, setSelectPicker] = useState(false);
    const [selectLink, setSelectLink] = useState(false);
    const [message, setMessage] = useState('');

    const { room_id } = useSelector((state) => state.appe);

    const user_id = window.localStorage.getItem("user_id");
    const { current_conversation } = useSelector((state) => state.conversation.direct_chat);

    console.log("u-ID->>", user_id, "\nrom_id", room_id, "\nconversio->>", current_conversation);

    const Options = [
        { title: 'Photos & Video', icon: <Image size={24} /> },
        { title: 'Camera', icon: <Camera size={24} /> },
        { title: 'Document', icon: <File size={24} /> },
        { title: 'Contact', icon: <User size={24} /> },
        { title: 'Sticker', icon: <Sticker size={24} /> },
    ];

    const AttachFileDialog = () => {
        return (
            <Stack direction={'column'}>
                {Options.map((element, index) => (
                    <Stack
                        key={index}
                        alignItems={'center'}
                        direction={'row'}
                        sx={{
                            padding: '0 6px',
                            '&:hover': {
                                backgroundColor: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.common.black,
                                borderRadius: '5px',
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                            },
                        }}
                    >
                        <IconButton>{element.icon}</IconButton>
                        <Typography
                            variant="subtitle1"
                            color={theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white}
                        >
                            {element.title}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
        );
    };

    const handleEmojiSelect = (emoji) => {
        setMessage((prevMessage) => prevMessage + emoji.native);
    };

    function linkify(text) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(
            urlRegex,
            (url) => `<a href="${url}" target="_blank">${url}</a>`
        );
    }

    function containsUrl(text) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return urlRegex.test(text);
    }

    const handleSendMessage = () => {
        if (!user_id) {
            console.error("User ID is null. Please log in.");
            return;
        }

        if (!current_conversation) {
            console.error("Current conversation is null. Please select a conversation.");
            return;
        }

        socket.emit("text_message", {
            message: linkify(message),
            conversation_id: room_id,
            from: user_id,
            to: current_conversation.user_id,
            type: containsUrl(message) ? "Link" : "Text",
        });

        console.log("current_conversation.user_id-->",user_id);
        console.log("current_conversation.user_id-->",current_conversation);
        setMessage(''); // Clear the message input after sending
    };

    return (
        <Box sx={{ height: '90px', boxShadow: '0px 0px 2px rgba(0,0,0,0.25)' }} p={1}>
            <Stack direction={'row'} alignItems={'center'} spacing={2} p={0.2}>
                <TextField
                    sx={{ width: '100%' }}
                    placeholder="Write a message ..."
                    id="outlined-start-adornment"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    InputProps={{
                        style: { color: theme.palette.mode === 'light' ? '#000' : '#fff', fontWeight: 600 },
                        startAdornment: (
                            <Stack>
                                <Stack sx={{ position: 'relative' }}>
                                    <Box
                                        sx={{
                                            display: selectLink ? 'inline' : 'none',
                                            position: 'absolute',
                                            bottom: '40px',
                                            backgroundColor: theme.palette.mode === 'light' ? '#f9fafb' : theme.palette.background.paper,
                                            borderRadius: '8px',
                                            zIndex: '10',
                                            width: 'max-content',
                                        }}
                                    >
                                        <AttachFileDialog />
                                    </Box>
                                </Stack>
                                <InputAdornment position="start">
                                    <IconButton onClick={() => setSelectLink((prev) => !prev)}>
                                        <LinkSimple />
                                    </IconButton>
                                </InputAdornment>
                            </Stack>
                        ),
                        endAdornment: (
                            <Stack position={'relative'}>
                                <Stack>
                                    <Box
                                        sx={{
                                            display: selectPicker ? 'inline' : 'none',
                                            position: 'absolute',
                                            bottom: '40px',
                                            right: '0%',
                                        }}
                                    >
                                        <Picker theme={theme.palette.mode} data={data} onEmojiSelect={handleEmojiSelect} />
                                    </Box>
                                </Stack>
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setSelectPicker((prev) => !prev)} sx={{ color: selectPicker ? theme.palette.primary.main : 'inherit' }}>
                                        <Smiley />
                                    </IconButton>
                                </InputAdornment>
                            </Stack>
                        ),
                    }}
                />
                <Box
                    sx={{
                        backgroundColor: '#5B96F7',
                        width: '48px',
                        height: '48px',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    <IconButton onClick={handleSendMessage}>
                        <TelegramLogo color='#fff' />
                    </IconButton>
                </Box>
            </Stack>
        </Box>
    );
}
