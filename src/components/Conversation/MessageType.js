import { useTheme } from "@emotion/react";

import { Divider, Stack, Typography, Box, Link, IconButton } from "@mui/material";
import { Download, Image } from "phosphor-react";
import React from "react";
import { Link as RouterLink } from 'react-router-dom';




const TextMsg = ({ el }) => {
    const theme = useTheme();

    return (
        <Stack direction={'row'} justifyContent={el.incoming ? 'start' : 'end'} p={1}>

            <Box sx={{ backgroundColor: el.outgoing ? '#5B96F7' : theme.palette.mode === 'light' ? '#eeeeee' : theme.palette.background.paper, borderRadius: '8px' }} width='max-content' p={1.5}>
                <Typography variant="subtitle2" color={theme.palette.mode === 'light' ? theme.palette.common.dark : theme.palette.common.white} >
                    {el.message}
                </Typography>

            </Box>

        </Stack>
    )
}


const TimeSeparation = ({ el }) => {

    return (
        <Stack direction="row" alignItems="center" justifyContent={'space-between'} p={1}>
            <Divider color='red' width="45%" />
            <Typography variant="caption">
                {el.text}
            </Typography>
            <Divider color='red' width="45%" />
        </Stack >

    )

}

const ImgMessage = ({ el }) => {
    const theme = useTheme();

    return (
        <Stack direction={'row'} justifyContent={el.incoming ? 'start' : 'end'} p={1}>

            <Box sx={{ backgroundColor: el.outgoing ? '#5B96F7' : theme.palette.mode === 'light' ? '#eeeeee' : theme.palette.background.paper, borderRadius: '8px' }} width='max-content' p={1.5}>

                <Stack spacing={2} >
                    <img src={el.img} alt={el.img} style={{ borderRadius: '8px', maxHeight: 210 }} />
                    <Typography variant="body2" color={theme.palette.mode === 'light' ? theme.palette.common.dark : theme.palette.common.white}>
                        {el.message}
                    </Typography>
                </Stack>
            </Box >
        </Stack >
    )
}

const ReplyMsg = ({ el }) => {
    const theme = useTheme();

    return (

        <Stack direction={'row'} justifyContent={el.incoming ? 'start' : 'end'} p={1}>
            <Box sx={{ backgroundColor: el.outgoing ? '#5B96F7' : theme.palette.mode === 'light' ? '#eeeeee' : theme.palette.background.paper, borderRadius: '8px' }} width='max-content' p={1.5}>
                <Stack spacing={2} >
                    <Stack spacing={3} alignItems={'center'}>
                        <Box sx={{ backgroundColor: el.outgoing ? ' #779edd ' : theme.palette.mode === 'light' ? theme.palette.background.paper : '#131d2b', boxShadow: el.outgoing ? '-3px 0px 0px 0px #cbd3e0' : '-3px -1px 0px 0px red', borderRadius: '2px' }} p={1}>
                            <Typography variant="subtitle2" color={theme.palette.mode === 'light' ? theme.palette.common.dark : theme.palette.common.white} >
                                {el.message}
                            </Typography>
                        </Box>
                    </Stack>
                    <Typography variant="subtitle2" color={theme.palette.mode === 'light' ? theme.palette.common.dark : theme.palette.common.white} >
                        {el.reply}
                    </Typography>
                </Stack >
            </Box >
        </Stack >


    )

}

const DocMsg = ({ el }) => {

    const theme = useTheme();

    return (
        <Stack direction={'row'} justifyContent={el.incoming ? 'start' : 'end'} p={1}>
            <Box sx={{ backgroundColor: el.outgoing ? '#5B96F7' : theme.palette.mode === 'light' ? '#eeeeee' : theme.palette.background.paper, borderRadius: '8px' }} width='max-content' p={1.5}>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>

                    <IconButton>
                        <Image color={theme.palette.mode === 'light' ? theme.palette.common.dark : theme.palette.common.white} />
                    </IconButton>
                    <Typography variant="caption2" color={theme.palette.mode === 'light' ? theme.palette.common.dark : theme.palette.common.white}>
                        Abstac.png
                    </Typography>

                    <IconButton>
                        <Download color={theme.palette.mode === 'light' ? theme.palette.common.dark : theme.palette.common.white} />
                    </IconButton>
                </Stack>

            </Box>

        </Stack>
    )

}

const LinkMsg = ({ el }) => {

    const theme = useTheme();

    const linkStyle = {
        textDecoration: 'underline',
        color: theme.palette.mode === 'light' ? '#039595' : '#88ff41',
    };


    return (
        <Stack direction={'row'} justifyContent={el.incoming ? 'start' : 'end'} p={1}>

            <Box sx={{ backgroundColor: el.outgoing ? '#5B96F7' : theme.palette.mode === 'light' ? '#eeeeee' : theme.palette.background.paper, borderRadius: '8px' }} width='max-content' p={1.5}>

                <Stack spacing={2} >
                    <img src={el.preview} alt={el.img} style={{ borderRadius: '8px', maxHeight: 210 }} />
                    <Typography variant="subtitle2" color={theme.palette.mode === 'light' ? theme.palette.common.dark : theme.palette.common.white}>
                        {el.message}
                    </Typography>

                    <Typography variant="subtitle2" color={theme.palette.mode === 'light' ? '#039595' : '#88ff41'} component={RouterLink} to="http://www.google.com" style={linkStyle}                    >
                        Google.Com
                    </Typography>
                    <Typography variant="body2" color={theme.palette.mode === 'light' ? theme.palette.common.dark : theme.palette.common.white}>
                        {el.message}
                    </Typography>

                </Stack>
            </Box >
        </Stack >
    )

}

export { TimeSeparation, TextMsg, ImgMessage, ReplyMsg, LinkMsg, DocMsg }