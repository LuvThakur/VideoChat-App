import React, { useCallback, useState } from 'react';
import * as Yup from 'yup';
import { FormProvider, ReactformText } from '../../Hook_Form/Index';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Stack, Button, Box } from '@mui/material';

import { UpdateUserProfile } from '../../Redux/Slice/SidebarSlice';
import { useDispatch } from 'react-redux';

const LoginSchema = Yup.object().shape({
    firstname: Yup.string().required("Name is required").min(3, "Minimum 3 characters required"),
    lastname: Yup.string().required("Name is required").min(3, "Minimum 3 characters required"),
    about: Yup.string().required("About is required").max(20, "You have exceeded the limit of 20 words"),
    avatarUrl: Yup.string().required("Avatar is required"),
});

const defaultValues = {
    firstname: "",
    lastname: "",
    about: "",
    avatarUrl: "",
};
//firstname  lastname about
const Profile_Form = () => {


    const dispatch = useDispatch();


    const [avatar, setAvatar] = useState(null); // State to hold uploaded avatar

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const { reset, setError, setValue, watch, handleSubmit, formState: { errors } } = methods;

    const handleDrop = useCallback((acceptfiles) => {
        const file = acceptfiles[0];
        if (file) {
            setAvatar(file);
            setValue("avatarUrl", URL.createObjectURL(file), { shouldValidate: true });
        }
    }, [setValue]);

    const onSubmit = async (data) => {
        try {
            // Handle form submission with avatar
            console.log("Form data with avatar:", { ...data, avatar: avatar });

            dispatch(UpdateUserProfile({ firstname:data?.firstname , lastname:data?.lastname , about:data?.about ,avatar:"fake/url"}))


        } catch (error) {
            console.error("Error submitting form:", error);
            reset();
            setError("aftersubmit", { message: "Error submitting form" });
        }
    };

    return (
        <FormProvider methods={methods} resolver={yupResolver(LoginSchema)} defaultValues={defaultValues} onSubmit={handleSubmit(onSubmit)}>

            <Stack spacing={4}>
                {!!errors.aftersubmit && (
                    <Alert severity='error'>{errors.aftersubmit.message}</Alert>
                )}

                <Stack spacing={4}>

                    {avatar ? (
                        <Stack alignItems={'center'} justifyContent={'center'}>

                            <Box sx={{ overflow: 'hidden', borderRadius: '50%', width: '100px', height: '100px' }}>
                                <img
                                    src={URL.createObjectURL(avatar)}
                                    alt="Uploaded Avatar"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </Box>
                        </Stack>
                    )
                        :
                        <Box sx={{ overflow: 'hidden', borderRadius: '50%', width: '100px', height: '100px' }}>

                        </Box>

                    }
                    <Stack>

                        <input type="file" accept="image/*" onChange={(e) => handleDrop(e.target.files)} style={{ color: 'red', width: 'auto' }} />
                    </Stack>

                    <ReactformText name={"firstname"} label="firstname" />
                    <ReactformText name={"lastname"} label="lastname" />
                    <ReactformText multiline name={"about"} label="About" rows={4} />


                </Stack>

                <Button
                    variant='contained'
                    type='submit'
                    sx={{
                        bgcolor: 'text.primary',
                        color: (theme) => theme.palette.mode === 'light' ? "common.white" : 'grey.800',
                        alignSelf: 'flex-end',
                        width: 'auto',
                    }}
                >
                    Save
                </Button>
            </Stack>
        </FormProvider>
    );
};

export default Profile_Form;
