import { Box, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useTheme } from '@emotion/react'
import { CaretLeft } from 'phosphor-react';
import Profile_Form from '../../Sections/Profile/Profile_Form';

import { FetchUserProfile } from '../../Redux/Slice/SidebarSlice';
import { useDispatch } from 'react-redux';


export default function Profile() {


    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(FetchUserProfile());

    }, []);



    const theme = useTheme();

    return (
        <Stack direction="row" sx={{ width: "100%" }}>


            <Box
                sx={{
                    overflowY: "scroll",

                    height: "100vh",
                    width: 320,
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? "#F8FAFF"
                            : theme.palette.background,

                    boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                }}
            >
                <Stack p={4} spacing={5}>
                    {/* Header */}
                    <Stack direction="row" alignItems={"center"} spacing={3}>
                        <IconButton>
                            <CaretLeft size={24} color={"#4B4B4B"} />
                        </IconButton>

                        <Typography variant="h5">Profile</Typography>
                    </Stack>

                    {/* Profile Edit Form */}
                    <Profile_Form />
                </Stack>
            </Box>


            {/* right side box  */}

            <Box
                sx={{
                    height: "100%",
                    width: "calc(100vw - 420px )",
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? "#FFF"
                            : theme.palette.background.paper,
                    borderBottom: "6px solid #0162C4",
                }}
            ></Box>



        </Stack>






    )
}



/*
<Box width={'320px'} height={'100vh'} sx={{ backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper, boxShadow: '0 0 2px rgba(0,0,0,.25)' }}>
 
      <Stack direction={'column'} width={'100%'} p={4} spacing={5}>
 
          <Stack direction={'row'} alignItems={'center'} spacing={3}>
              <IconButton>
                  <CaretLeft />
              </IconButton>
              <Typography variant='h5'>
                  Profile
              </Typography>
          </Stack>
}
          <Profile_Form />
      </Stack>
  </Box>
 
  */