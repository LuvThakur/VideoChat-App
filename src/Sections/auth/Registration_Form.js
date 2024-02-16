import React, { useState } from 'react'
import * as  Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormProvider, ReactformText } from '../../Hook_Form/Index';
import { Typography,  Stack, InputAdornment, IconButton, Alert, Button, Link } from '@mui/material';
import { Eye, EyeSlash } from 'phosphor-react';
import { useForm } from 'react-hook-form';


const RegisterSchema = Yup.object().shape({
    Fname: Yup.string().required("First Name is required"),
    Lname: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email is require").email("Email must be valid address"),
    password: Yup.string().required("Password is required")
})


const defaultValues = {
    Fname: "Luv",
    Lname: "Thakur",
    email: "xyz@gmail.com",
    password: "abc1234"
}

function Registration_Form() {


    const [showPassword, setpassword] = useState(false);

    const toggleshowPassword = () => {

        setpassword(!showPassword);
    }

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues
    })

    const { reset, setError, handleSubmit, formState: { errors } } = methods;


    const onSubmit = async (data) => {
        try {
            console.log("call");
        }
        catch (error) {
            console.log("->>", error)
            reset();
            setError("aftersubmit", { ...error, message: error.message })
        }
    }


    return (
        <FormProvider methods={methods} resolver={yupResolver(RegisterSchema)} defaultValues={defaultValues} onSubmit={handleSubmit(onSubmit)}>

            <Stack spacing={3}>
                {!!errors.aftersubmit && <Alert severity='error'>{errors.aftersubmit.message}</Alert>}
            </Stack>
            <Stack


                spacing={2}

            >
                <Stack direction={'row'} justifyContent={'space-between'} >
                    <ReactformText name='Fname' label="First Name"

                        sx={{ width: '49%' }}

                    />
                    <ReactformText name='Lname' label="Last Name"
                        sx={{ width: '49%' }}

                    />
                </Stack>

                <Stack spacing={2}>

                    <ReactformText name={"email"} label="Email Address" />
                    <ReactformText name={"password"} label="Password" type={showPassword ? "text" : "password"}

                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={toggleshowPassword} edge="end">
                                        {showPassword ? <Eye /> : <EyeSlash />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}

                    />

                </Stack>
                <Button fullWidth size='large' variant='contained' type='submit' sx={{ bgcolor: 'text.primary', color: (theme) => theme.palette.mode === 'light' ? "common.white" : 'grey.800' }}  >
                    Submit
                </Button>

            </Stack>

        </FormProvider >
    )
}

export default Registration_Form