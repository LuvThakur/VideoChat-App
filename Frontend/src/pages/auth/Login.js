import { Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { Social_Media } from '../../Sections/auth/Social_Media';
import Login_Form from '../../Sections/auth/Login_Form';

export default function Login() {
    return (
        <>
            <Stack spacing={2} position={'relative'}>
                <Typography variant='h4'>
                    Login to Chat
                </Typography>

                <Stack direction={'row'} spacing={0.8}>
                    <Typography variant='body2'>
                        New user?
                    </Typography>
                    <Link to="/auth/register" component={RouterLink} variant='subtitle2'>
                        Create an new account
                    </Link>

                </Stack>
                <Login_Form />

                <Social_Media />

            </Stack>
        </>
    )
}
