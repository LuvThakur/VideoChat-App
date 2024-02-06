import React from 'react'
import { Box, IconButton, Stack, Tabs, Tab, Typography} from '@mui/material'
import { ArrowFatLeft } from 'phosphor-react'
import { useDispatch } from 'react-redux'
import { TypeSidebarfun } from '../Redux/Slice/SidebarSlice'
import { Starred_Doc } from '../data/index'
import { TextMsg } from './Conversation/MessageType'

export default function StarredMessage() {

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

                <Stack  sx={{ flexGrow: 1, overflowY: 'auto', height: '100%', overflowX:'hidden' }}>

                    {
                        Starred_Doc.map((element, idx) => {

                            return <TextMsg el={element} key={idx} menu={false} />;

                        })
                    }


                </Stack>

            </Stack>

        </Box >

    )
}
