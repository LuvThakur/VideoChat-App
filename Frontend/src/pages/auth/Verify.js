import { Stack, Typography, stack } from '@mui/material'
import React from 'react'
import VerifyForm from '../../Sections/auth/VerifyForm'
import { useSelector } from 'react-redux'

export default function Verify() {

    const { email } = useSelector((state) => state.auth);

    return (
        <>
            <Stack spacing={2} position={'relative'}>

                <Typography variant='h4'>
                    Please Verify OTP
                </Typography>


                <Stack>
                    <Typography>`    Verification email sent to ({email})`</Typography>
                </Stack>

                <VerifyForm />
            </Stack>

        </>
    )
}
