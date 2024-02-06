import React, { useState } from 'react'
import { faker } from '@faker-js/faker'
import { Stack, Box, IconButton, Typography, Avatar, Divider } from '@mui/material'
import { Bell, CaretLeft, Info, Key, Keyboard, Lock, Image, Note, PencilCircle } from 'phosphor-react'
import ThemeDailog from '../../Sections/SettingComponent/ThemeDailog';



export default function Setting() {


    const [openblock, setopenblock] = useState(false);

    const handleopenblk = () => {
        setopenblock(true);
    }
    
    const handlecloseblk = () => {
        setopenblock(false);
    }



    const list = [
        {
            key: 0,
            icon: <Bell size={20} />,
            title: 'Notifications',
            onclick: () => { }
        },
        {
            key: 1,
            icon: <Lock size={20} />,
            title: "Privacy",
            onclick: () => { }
        },
        {
            key: 2,
            icon: <Key size={20} />,
            title: "Security",
            onclick: () => { }
        },
        {
            key: 3,
            icon: <PencilCircle size={20} />,
            title: "Theme",
            onclick: handleopenblk
        },
        {
            key: 4,
            icon: <Image size={20} />,
            title: "Chat Wallpaper",
            onclick: () => { }
        },
        {
            key: 5,
            icon: <Note size={20} />,
            title: "Request Account Info",
            onclick: () => { }
        },
        {
            key: 6,
            icon: <Keyboard size={20} />,
            title: "Keyboard Shortcuts",
            onclick: () => { }
        },
        {
            key: 7,
            icon: <Info size={20} />,
            title: "Help",
            onclick: () => { }
        }

    ];

    return (
        <Stack direction={'row'} width={'100%'}>

            <Box width={'320px'} height={'100vh'} sx={{ background: '#f8faff', boxShadow: '0 0 2px rgba(0,0,0,.25)' }}>

                <Stack direction={'column'} width={'100%'} p={4} spacing={5}>

                    <Stack direction={'row'} alignItems={'center'} spacing={3}>
                        <IconButton>
                            <CaretLeft />
                        </IconButton>
                        <Typography variant='subtitle2'>
                            Settings
                        </Typography>
                    </Stack>

                    <Stack direction={'row'} spacing={3}>
                        <Avatar sx={{ width: '50px', height: '50px' }} src={faker.image.avatar()} />
                        <Stack direction={'column'}>

                            <Typography>
                                Satoru Sukuna
                            </Typography>
                            <Typography>
                                Sensei
                            </Typography>
                        </Stack>

                    </Stack>


                    <Stack spacing={2}>
                        {
                            list.map((el, key) => {
                                return (
                                    <Stack key={key}>
                                        <Stack direction={'row'} alignItems={'center'} spacing={2} sx={{ cursor: 'pointer' }} onClick={el.onclick}>
                                            <IconButton >
                                                {el.icon}
                                            </IconButton>

                                            <Typography>
                                                {el.title}
                                            </Typography>

                                        </Stack>
                                        {key !== 7 && <Divider />}

                                    </Stack>
                                )
                            })

                        }
                    </Stack>
                </Stack>
            </Box>
            {openblock && <ThemeDailog open={openblock} handleClose={handlecloseblk} />}
        </Stack>
    )
}
