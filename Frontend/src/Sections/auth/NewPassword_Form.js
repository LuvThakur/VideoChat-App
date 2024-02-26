import React, { useState } from 'react'
import { FormProvider, ReactformText } from '../../Hook_Form/Index'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Eye, EyeSlash } from 'phosphor-react';
import { Button, IconButton, InputAdornment, Stack, Alert } from '@mui/material';

export default function NewPassword_Form() {

    const [showPassword, setPassword] = useState(false);
    const [showPasswordconfirm, setPasswordconfirm] = useState(false);

    const PasswordSchema = Yup.object().shape({
        password: Yup.string().required("Password is required").min(6, "Minimum six characters required"),
        confirmpassword: Yup.string().required("Confirm Password is required").min(6, "Minimum six characters required")
    });

    const defaultValues = {
        password: "",
        confirmpassword: ""
    }

    const methods = useForm({
        resolver: yupResolver(PasswordSchema),
        defaultValues
    });

    const { reset, setError, handleSubmit, formState: { errors } } = methods;

    const toggleshowPassword = () => {
        setPassword(!showPassword);
    }
    const toggleshowPasswordconfirm = () => {
        setPasswordconfirm(!showPasswordconfirm);
    }

    const onSubmit = async (data) => {
        try {
            console.log("gernrate");
        }
        catch (error) {
            console.log("->>", error)
            reset();
            setError("aftersubmit", { ...error, message: error.message })
        }
    }

    return (
        <FormProvider methods={methods} resolver={yupResolver(PasswordSchema)} defaultValues={defaultValues} onSubmit={handleSubmit(onSubmit)}>


            <Stack spacing={3}>
                {!!errors.aftersubmit && <Alert severity='error'>{errors.aftersubmit.message}</Alert>}
            </Stack>
            <Stack spacing={2}>
                
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


                <ReactformText name="confirmpassword" label="ConfirmPassword" type={showPasswordconfirm ? 'text' : 'password'}

                    InputProps={{
                        endAdornment: (
                            < InputAdornment position='end'>
                                <IconButton onClick={toggleshowPasswordconfirm} edge="end">
                                    {showPasswordconfirm ? <Eye /> : <EyeSlash />}
                                </IconButton>
                            </InputAdornment>


                        )
                    }}


                />
                <Button fullWidth size='large' variant='contained' type='submit' sx={{ bgcolor: 'text.primary', color: (theme) => theme.palette.mode === 'light' ? "common.white" : 'grey.800' }}  >
                    Submit
                </Button>
            </Stack>
        </FormProvider >)
}
