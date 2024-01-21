import React, { useState } from "react";
import { Avatar, Box, Divider, IconButton, Stack } from "@mui/material";
import { useTheme } from "@emotion/react";
import Logo from '../../assets/Images/logo.ico';
import { Nav_Buttons } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from '@faker-js/faker';
import useSettings from "../../hooks/useSettings";
import AntSwitch from "../../components/AntSwitch";
export default function Sidebar() {

    const theme = useTheme();

    const [selected, setSselected] = useState(null);


    const { onToggleMode } = useSettings();


    return (
        <Box sx={{
            backgroundColor: theme.palette.background.default,
            boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
            width: '130px',
            height: '100vh',
            padding: '16px 0'

        }}>

            <Stack direction="column" alignItems="center" sx={{ height: "100%" }} justifyContent="space-between">

                <Stack direction="column" alignItems="center" spacing={3}>

                    <Box
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            width: '64px',
                            height: '64px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                        }}
                    >
                        <img src={Logo} alt="chat app logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>

                    <Stack spacing={3} sx={{ width: 'max-width', alignItems: 'center', direction: 'column' }}>
                        {


                            Nav_Buttons.map((button) =>
                                button.index === selected ?

                                    (
                                        <Box key={button.index} sx={{ backgroundColor: theme.palette.primary.main, borderRadius: '12px' }}>

                                            <IconButton sx={{ color: '#FFFFFF' }}>
                                                {button.icon}
                                            </IconButton>

                                        </Box>
                                    )

                                    :

                                    <IconButton onClick={() => setSselected(button.index)} key={button.index} sx={{ color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080707' }}>
                                        {button.icon}
                                    </IconButton>

                            )
                        }


                        <Divider sx={{ width: '70px', backgroundColor: 'red', height: '1px', fontSize: '24px', marginY: '16px' }} />

                    </Stack>


                    {
                        selected === 3
                            ?
                            <Box sx={{ backgroundColor: theme.palette.primary.main, borderRadius: '12px' }}>

                                <IconButton sx={{ color: '#FFFFFF' }}>
                                    <Gear size={32} />
                                </IconButton>

                            </Box>

                            :

                            <IconButton onClick={() => setSselected(3)} sx={{ color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#080707' }}>
                                <Gear size={32} />
                            </IconButton>
                    }

                </Stack>


                <Stack direction="column" alignItems="center" spacing={5}>

                    <AntSwitch checked={useSettings().themeMode === 'dark'}
                        onClick={() => {
                            onToggleMode();
                        }} />

                    <Avatar src={faker.image.avatar()} />
                </Stack>

            </Stack>

        </Box>
    )
}
