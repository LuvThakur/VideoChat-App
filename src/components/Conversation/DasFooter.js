import React from 'react';
import { useTheme } from '@emotion/react';
import { Stack, Box, IconButton, TextField, InputAdornment } from '@mui/material';
import { Link, Smiley, TelegramLogo } from 'phosphor-react';

export default function DasFooter() {

    const theme = useTheme();

    return (


        <Box sx={{ height: '90px', backgroundColor: theme.mode === 'light' ? 'dark' : theme.palette.background.default, boxShadow: '0px 0px 2px rgba(0,0,0,0.25)' }} p={1}>

            <Stack direction={'row'} alignItems={'center'} spacing={2} p={0.2}>


                <TextField

                    sx={{ width: '100%', backgroundColor: theme.mode === 'light' ? 'dark' : theme.palette.background.default, }}


                    placeholder='Write a message ...'
                    id="outlined-start-adornment"


                    InputProps={{
                        style: { Color: theme.mode === 'light' ? 'dark' : '#fff', fontWeight: 600 },

                        startAdornment: <InputAdornment position="start">
                            <IconButton>
                                <Link />
                            </IconButton>
                        </InputAdornment>,
                        endAdornment: <InputAdornment position="end">
                            <IconButton>
                                <Smiley />
                            </IconButton>
                        </InputAdornment>,
                    }}
                />


                <Box sx={{ backgroundColor: '#5B96F7', width: '48px', height: '48px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <IconButton>
                        <TelegramLogo color='#fff' />
                    </IconButton>
                </Box>

            </Stack>
        </Box>

    )
}
