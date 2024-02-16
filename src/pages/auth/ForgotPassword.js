import { Link, Stack, Typography } from '@mui/material'
import React from 'react'
import Forgot_Form from '../../Sections/auth/Forgot_Form'
import { Link as RouterLink } from 'react-router-dom'
import { CaretLeft } from 'phosphor-react'

export default function ForgotPassword() {
    return (
        <Stack spacing={4} position={'relative'} >
            <Typography variant='h4'>
                Forgot Your  Password ?
            </Typography>

            <Typography variant='subtitle2'>
                Please Enter your email address which associated with your  account
                we will  send you a link to reset  a password

            </Typography>
            <Forgot_Form />

            <Link to="/auth/login" component={RouterLink}

                variant='subtitle2'
                sx={{ display: 'inline-flex', alignItems: 'center', mt: 3, mx: "auto" }}

            >

                <CaretLeft />
                Return to sign in
            </Link>

        </Stack>)
}
