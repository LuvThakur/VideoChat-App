import React from 'react'
import { FormProvider, ReactVerifyForm } from '../../Hook_Form/Index';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from "react-redux";

import { useRef } from 'react';
import { VerifyOtpfun } from '../../Redux/Slice/AuthSlice';


const VerfiySchema = Yup.object().shape({

    code1: Yup.string().required("Otp require"),
    code2: Yup.string().required("Otp require"),
    code3: Yup.string().required("Otp require"),
    code4: Yup.string().required("Otp require"),
    code5: Yup.string().required("Otp require"),
    code6: Yup.string().required("Otp require")

});


const defaultValues = {
    code1: "",
    code2: "",
    code3: "",
    code4: "",
    code5: "",
    code6: "",

}

const VerifyForm = () => {

    const dispatch = useDispatch();

    const { email } = useSelector((state) => state.auth);

    const methods = useForm({
        resolver: yupResolver(VerfiySchema),
        defaultValues,
    });


    const codesRef = useRef(null);

    const { reset, setError, handleSubmit} = methods;


    const onSubmit = async (data) => {

        try {

            console.log("otp", data);

            dispatch(VerifyOtpfun({
                email,
                otp: `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`
            }
            ));

        }
        catch (error) {
            console.log("->>", error)
            reset();
            setError("aftersubmit", { ...error, message: error.message })
        }

    }



    return (
        <FormProvider methods={methods} resolver={yupResolver(VerfiySchema)} defaultValues={defaultValues} onSubmit={handleSubmit(onSubmit)} >
            <Stack spacing={3}>
                <Stack>
                    <ReactVerifyForm keyname="code" input={["code1", "code2", "code3", "code4", "code5", "code6",]}  />
                </Stack>
                <Stack>
                    <Button fullWidth size='large' variant='contained' type='submit' sx={{ bgcolor: 'text.primary', color: (theme) => theme.palette.mode === 'light' ? "common.white" : 'grey.800' }}  >
                        Verify
                    </Button>
                </Stack>
            </Stack>
        </FormProvider>
    )
}

export default VerifyForm