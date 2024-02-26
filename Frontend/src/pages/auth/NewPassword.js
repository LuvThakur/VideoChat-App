import { Stack, Typography, Link } from '@mui/material'
import React from 'react'
import NewPassword_Form from '../../Sections/auth/NewPassword_Form'
import { Link as RouterLink } from 'react-router-dom'
import { CaretLeft } from 'phosphor-react'

export default function NewPassword() {
    return (
        <Stack spacing={4} position={'relative'}>
            <Typography variant='h4'>
                Reset Password
            </Typography>
            <Typography variant='subtitle2'>
                Please set your new  Password
            </Typography>

            <NewPassword_Form />
            <Link to="/auth/login" component={RouterLink}

                variant='subtitle2'
                sx={{ display: 'inline-flex', alignItems: 'center', mt: 3, mx: "auto" }}

            >

                <CaretLeft />
                Return to sign in
            </Link>
        </Stack>

    )
}
