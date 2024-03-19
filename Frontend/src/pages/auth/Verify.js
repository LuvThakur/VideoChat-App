import { Stack, Typography, stack } from '@mui/material'
import React from 'react'
import VerifyForm from '../../Sections/auth/VerifyForm'

export default function Verify() {
    return (
        <>
            <Stack spacing={2} position={'relative'}>

                <Typography variant='h4'>
                    Please Verify OTP
                </Typography>

                <Stack>
                    <Typography>     Sent to email (luvthakur262001@gmail.com)</Typography>
                </Stack>

                <VerifyForm />
            </Stack>

        </>
    )
}
