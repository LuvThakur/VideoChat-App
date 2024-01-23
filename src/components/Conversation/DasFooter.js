import React, { useState } from 'react';
import { useTheme } from '@emotion/react';
import { Stack, Box, IconButton, TextField, InputAdornment, Typography } from '@mui/material';
import { Camera, File, Image, LinkSimple, Smiley, Sticker, TelegramLogo, User, image } from 'phosphor-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';


export default function DasFooter() {

    const theme = useTheme();

    console.log(theme);

    const [selectPicker, SetPicker] = useState(false);
    const [selectLink, SetLink] = useState(false);


    const handleEmojiSelect = (emoji) => {
        console.log(emoji);
        SetPicker(false);
    };

    const Options =
        [
            {
                title: 'Photos & Video',
                icon: <Image size={24} />


            },
            {
                title: 'Camera',
                icon: <Camera size={24} />
            },
            {
                title: 'Document',
                icon: <File size={24} />
            },
            {
                title: 'Contact',
                icon: <User size={24} />
            },
            {
                title: 'Sticker',
                icon: <Sticker size={24} />

            }

        ];

    const AttachFileDailog = () => {

        const theme = useTheme();

        return (
            <Stack direction={'column'} p={0.5}>
                {Options.map((element, index) => {
                    return (
                        <Stack
                            key={index}
                            alignItems={'center'}
                            direction={'row'}

                            sx={{
                                padding: '0 6px',
                                '&:hover': {
                                    backgroundColor: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.common.black,
                                    borderRadius: '8px',
                                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
                                }
                            }}
                        >
                            <IconButton  >
                                {element.icon}
                            </IconButton>
                            <Typography variant="subtitle1" color={theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white} >
                                {element.title}
                            </Typography>
                        </Stack>
                    );
                })}
            </Stack>
        );
    };


    return (


        <Box sx={{ height: '90px', boxShadow: '0px 0px 2px rgba(0,0,0,0.25)' }} p={1}>

            <Stack direction={'row'} alignItems={'center'} spacing={2} p={0.2}>



                <TextField

                    sx={{ width: '100%' }}


                    placeholder='Write a message ...'
                    id="outlined-start-adornment"


                    InputProps={{
                        style: { Color: theme.mode === 'light' ? 'dark' : '#fff', fontWeight: 600 },

                        startAdornment:
                            <Stack >
                                <Stack sx={{ position: 'relative' }}>

                                    <Box sx={{ display: selectLink ? 'inline' : 'none', position: 'absolute', bottom: '40px', backgroundColor: theme.palette.mode === 'light' ? '#f9fafb' : theme.palette.background.paper, borderRadius: '8px', zIndex: '10', width: 'max-content' }}>

                                        <AttachFileDailog />
                                    </Box>
                                </Stack>


                                <InputAdornment position="start" >
                                    <IconButton onClick={() => SetLink((prev) => !prev)}>
                                        <LinkSimple />
                                    </IconButton>
                                </InputAdornment>

                            </Stack>
                        ,


                        endAdornment:

                            <Stack position={'relative'}>
                                <Stack>
                                    <Box sx={{ display: selectPicker ? 'inline' : 'none', position: 'absolute', bottom: '40px', right: '0%' }}>
                                        <Picker theme={theme.palette.mode} data={data} onEmojiSelect={console.log} />
                                    </Box>
                                </Stack>

                                <InputAdornment position="end">
                                    <IconButton onClick={() => SetPicker((prev) => !prev)} sx={{ color: selectPicker ? theme.palette.primary.main : 'inherit' }}>
                                        <Smiley />
                                    </IconButton>
                                </InputAdornment>

                            </Stack>
                    }}
                />


                <Box sx={{ backgroundColor: '#5B96F7', width: '48px', height: '48px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <IconButton>
                        <TelegramLogo color='#fff' />
                    </IconButton>
                </Box>


            </Stack>
        </Box >

    )
}
