import React from 'react';
import { Stack, Box } from '@mui/material';

import DasHeader from './DasHeader';
import DasFooter from './DasFooter';


export default function Conversation() {



    return (
        <Stack direction="column" width="100%" height="100%">
            <DasHeader />
            <Box sx={{ height: '100%' }}>

            </Box>
            <DasFooter />
        </Stack >
    )
}

