import React from "react";
import { Divider, Stack, Typography, Box, IconButton, Menu, Fade, useTheme } from "@mui/material";
import { DotsThreeVertical, Download, Image } from "phosphor-react";
import { Link as RouterLink } from 'react-router-dom';
import { Message_options } from '../../data/index';




const MenuOptions = () => {


    const theme = useTheme();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };
    const open = Boolean(anchorEl);

    const handleClose = () => {

        setAnchorEl(null);
    };



    return (
        <>

            <DotsThreeVertical
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}

                onClick={handleClick}
                size={16} />


            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                TransitionComponent={Fade}
            >

                <Stack direction={'column'} >
                    {
                        Message_options.map((el, index) => {

                            return (
                                <Stack

                                    key={index}
                                    onClick={handleClose}
                                    alignItems={'center'}
                                    direction={'row'}


                                    sx={{
                                        padding: '8px 16px',
                                        '&:hover': {
                                            backgroundColor: theme.palette.mode === 'light' ? '#cacaca' : theme.palette.common.black,

                                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                        }
                                    }} >{el.title}

                                </Stack>
                            )
                        })

                    }
                </Stack>


            </Menu >
        </>
    )
};


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

const TextMsg = ({ el }) => {
    const theme = useTheme();

    return (
        <Stack direction={'row'} justifyContent={el.incoming ? 'start' : 'end'} p={1}>

            <Box sx={{ backgroundColor: el.outgoing ? '#5B96F7' : theme.palette.mode === 'light' ? '#eeeeee' : theme.palette.background.paper, borderRadius: '8px' }} width='max-content' p={1.5}>
                <Typography variant="subtitle2" color={theme.palette.mode === 'light' ? theme.palette.common.dark : theme.palette.common.white} >
                    {el.message}
                </Typography>

            </Box>

            <MenuOptions />

        </Stack>
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
            <MenuOptions />
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
            <MenuOptions />
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
            <MenuOptions />
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
            <MenuOptions />
        </Stack >
    )

}

export { TimeSeparation, TextMsg, ImgMessage, ReplyMsg, LinkMsg, DocMsg }
