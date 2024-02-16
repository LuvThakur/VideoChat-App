import React from 'react'
import { FormProvider, ReactformText } from '../../Hook_Form/Index'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button, Stack } from '@mui/material';

const ForgotSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("email must be valid"),
});

const defaultValues = {
    email: "abc@gmail.com"
}

export default function Forgot_Form() {

    const methods = useForm(
        {
            resolver: yupResolver(ForgotSchema),
            defaultValues
        }
    );
    const { reset, handleSubmit, setError, formState: { errors } } = methods;

    const onSubmit = async (data) => {
        try {
            console.log("forgot");
            
        }
        catch (error) {
            console.log("->>", error)
            reset();
            setError("aftersubmit", { ...error, message: error.message })
        }
    }

    return (
        <FormProvider methods={methods} defaultValues={defaultValues} resolver={yupResolver} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <ReactformText name='email' label="email" />
                <Button fullWidth size='medium' type='submit' variant='contained'>
                    Submit
                </Button>
            </Stack>
        </FormProvider>

    )
}
