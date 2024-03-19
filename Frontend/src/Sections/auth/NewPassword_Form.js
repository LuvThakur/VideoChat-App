import React, { useState } from 'react'
import { FormProvider, ReactformText } from '../../Hook_Form/Index'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Eye, EyeSlash } from 'phosphor-react';
import { Button, IconButton, InputAdornment, Stack, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { ResetPasswordfun } from '../../Redux/Slice/AuthSlice';
import { useSearchParams } from 'react-router-dom'

export default function NewPassword_Form() {


    const dispatch = useDispatch();

    const [queryParameters] = useSearchParams();

    const [showPassword, setPassword] = useState(false);
    const [showPasswordconfirm, setPasswordconfirm] = useState(false);

    const PasswordSchema = Yup.object().shape({
        Password: Yup.string().required("Password is required").min(6, "Minimum six characters required"),
        ConfirmPassword: Yup.string().required("Confirm Password is required").min(6, "Minimum six characters required")
    });

    const defaultValues = {
        Password: "",
        ConfirmPassword: ""
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
            const token = queryParameters.get("token");
            if (!token) {
                throw new Error("Token is missing");
            }

            // Check if Password and ConfirmPassword match
            if (data.Password !== data.ConfirmPassword) {
                throw new Error("Passwords do not match");
            }


            // console.log("", token);
            dispatch(ResetPasswordfun({ ...data, Reqtoken: token }));
        } catch (error) {
            console.error("Error submitting form:", error);
            setError("aftersubmit", { message: error.message });
        }
    }

    return (
        <FormProvider methods={methods} resolver={yupResolver(PasswordSchema)} defaultValues={defaultValues} onSubmit={handleSubmit(onSubmit)}>


            <Stack spacing={3}>
                {!!errors.aftersubmit && <Alert severity='error'>{errors.aftersubmit.message}</Alert>}
            </Stack>
            <Stack spacing={2}>

                <ReactformText name={"Password"} label="Password" type={showPassword ? "text" : "Password"}

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


                <ReactformText name="ConfirmPassword" label="ConfirmPassword" type={showPasswordconfirm ? 'text' : 'Password'}

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
