import React, { useState } from "react";
import { Avatar, Box, Divider, IconButton, Stack, Switch } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Outlet } from "react-router-dom";
import Logo from '../../assets/Images/logo.ico';
import { Nav_Buttons } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from '@faker-js/faker';
import useSettings from "../../hooks/useSettings";
import { styled } from '@mui/material/styles';

const DashboardLayout = () => {
  const theme = useTheme();

  const [selected, setSselected] = useState(null);


  const { onToggleMode } = useSettings();

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 40,
    height: 20,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      '&.Mui-checked': {
        transform: 'translateX(20px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 15,
      height: 15,
      borderRadius: 15 / 2,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 20 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));



  return (
    <Stack direction={'row'}>
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


      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
