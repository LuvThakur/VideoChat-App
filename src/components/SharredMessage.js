import React from 'react'
import { Box, IconButton, Stack, Tabs, Tab, Typography, Grid, styled, Paper } from '@mui/material'
import { ArrowFatLeft } from 'phosphor-react'
import { faker } from '@faker-js/faker'
import { useDispatch } from 'react-redux'
import { TypeSidebarfun } from '../Redux/Slice/SidebarSlice'
import { Share_Link, Share_Doc } from '../data/index'
import { DocMsg, LinkMsg } from './Conversation/MessageType'

export default function SharredMessage() {



    const Item = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(1),
        textAlign: 'center',
    }));


    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const dispatch = useDispatch();
    return (

        <Box sx={{ width: '300px', boxShadow: '0px 0px 2px rgba(0,0,0,0.25)' }} >

            <Stack direction="column" spacing={2} p={1} height={'100vh'}>
                <Stack direction='row' alignItems='center' spacing={2} p={1}>
                    <IconButton onClick={() => { dispatch(TypeSidebarfun('Contact')) }}>
                        <ArrowFatLeft />
                    </IconButton>
                    <Typography variant="subtitle" >
                        Starred Messages
                    </Typography>

                </Stack>


                <Tabs value={value} onChange={handleChange}>
                    <Tab label='Media' />
                    <Tab label='Link' />
                    <Tab label='Docs' />
                </Tabs>

                <Typography p={1}>
                    02 Feb 2024
                </Typography>

                <Stack direction="column" sx={{ flexGrow: 1, overflowY: 'auto', height: '100%' }}  >
                    {
                        (() => {
                            switch (value) {
                                case 0:
                                    return (
                                        <Grid container columns={{ md: 11 }}>
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16].map((el, idx) => (
                                                <Grid item md={3} key={idx} style={{ margin: '8px' }}>
                                                    <Item>
                                                        <img
                                                            src={faker.image.avatar()}
                                                            alt={faker.name.firstName()}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                                borderRadius: '1%',
                                                                border: '2px solid #fff',
                                                            }}
                                                        />
                                                    </Item>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    );
                                case 1:
                                    return (

                                        Share_Link.map((element, idx) => (
                                            <LinkMsg el={element} key={idx} />
                                        ))

                                    );

                                case 2:
                                    return (
                                        Share_Doc.map((element, idx) => (
                                            <DocMsg key={idx} el={element} />
                                        ))
                                    );
                                default:
                                    return null;
                            }
                        })()
                    }
                </Stack>

            </Stack>

        </Box >

    )
}
