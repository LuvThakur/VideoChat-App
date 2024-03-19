import React from 'react'
import { FormProvider, ReactformText } from '../../Hook_Form/Index';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button ,Stack} from '@mui/material';
import { useForm } from 'react-hook-form';



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


    const methods = useForm({
        resolver: yupResolver(VerfiySchema),
        defaultValues,
    });


    const { reset, setError, handleSubmit, formState: { errors } } = methods;


    const onSubmit = async (data) => {

        try {

        }
        catch (error) {
            console.log("->>", error)
            reset();
            setError("aftersubmit", { ...error, message: error.message })
        }

    }



    return (
        <FormProvider methods={methods} resolver={yupResolver(VerfiySchema)} defaultValues={defaultValues} onSubmit={handleSubmit(onSubmit)}>

            <Stack spacing={3}>

            </Stack>

            <Button fullWidth size='large' variant='contained' type='submit' sx={{ bgcolor: 'text.primary', color: (theme) => theme.palette.mode === 'light' ? "common.white" : 'grey.800' }}  >
                Verify
            </Button>
        </FormProvider>
    )
}

export default VerifyForm