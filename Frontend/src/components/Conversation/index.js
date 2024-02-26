import React from 'react';
import { Stack, Box } from '@mui/material';

import DasHeader from './DasHeader';
import DasFooter from './DasFooter';
import Message from './Message';


export default function Conversation() {



    return (
        <Stack direction="column" width="100%" height={'100vh'} >
            <DasHeader />
            <Box sx={{ height: '100%', overflowY: 'Scroll', overflowX: 'hidden' }}>
                <Message />
            </Box>
            <DasFooter />
        </Stack >
    )
}

