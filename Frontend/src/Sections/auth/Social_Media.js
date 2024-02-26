import { Divider, IconButton, Stack } from '@mui/material'
import { GithubLogo, GoogleLogo, TwitterLogo } from 'phosphor-react'
import React from 'react'

export const Social_Media = () => {
    return (
        <>
            <Divider>
                Or
            </Divider>

            <Stack direction={'row'} justifyContent={'center'} width={'100%'} >

                <IconButton >
                    <GoogleLogo color='#Df3e30' />
                </IconButton>
                <IconButton>
                    <GithubLogo color='black' />
                </IconButton>
                <IconButton>
                    <TwitterLogo color='#1c9cea' />
                </IconButton>
            </Stack>

        </>
    )
}
