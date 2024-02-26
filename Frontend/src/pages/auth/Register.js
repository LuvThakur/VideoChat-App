import { Stack, Typography, Link } from '@mui/material'
import React from 'react'
import Registration_Form from '../../Sections/auth/Registration_Form'
import { Link as RouterLink } from 'react-router-dom'

function RegisterForm() {
    return (
        <Stack spacing={4} position={'relative'} >

            <Typography variant='h4'>
                Get Started With Tawk
            </Typography>

            <Stack direction={'row'} spacing={0.8}>
                <Typography variant='body2'>
                    Already have an account ?
                </Typography>
                <Link to="/auth/login" component={RouterLink} variant='subtitle2'>
                    Sign in
                </Link>
            </Stack>



            <Registration_Form />


            <Typography component={'div'} textAlign={'center'} variant='subtitle2'
            >
                By Signing up , i agree to  <Link to="/auth/service" component={RouterLink}> Terms of Service</Link> and <Link to="/auth/policy" component={RouterLink}>Privacy Policy</Link>
            </Typography>

        </Stack>
    )
}

export default RegisterForm