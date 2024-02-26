import { Box, Stack, Alert, Link, IconButton, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Dialog } from '@mui/material'
import { useTheme } from '@emotion/react'
import {  XCircle } from 'phosphor-react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormProvider, ReactformText, ReactformTextAutocompelete } from '../../Hook_Form/Index';

const GroupSchema = Yup.object().shape({

    title: Yup.string().required("Title is required"),
    members: Yup.array().min(2, "Minimum two memebers require")
});

const defaultValues = {
    title: "",
    members: []
}


const dummy = ["N-1 ", "N-2", "N-3", "N-4", "N-5","N-2", "N-3", "N-4", "N-5","N-2", "N-3", "N-4", "N-5"];


const Group_Form = () => {

    const methods = useForm({
        resolver: yupResolver(GroupSchema)
    });

    const { reset, watch, setError, handleSubmit, formState: { errors, isValid, isSubmitting, isSubmitSuccessful } } = methods;
    const onSubmit = async () => {
        try {
            console.log("call group")
        }
        catch (error) {
            reset()
            setError("aftergroup", { ...error, message: error.message })
        }
    }

    return (
        <FormProvider methods={methods} resolver={yupResolver(GroupSchema)} defaultValues={defaultValues} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <Stack spacing={3}>
                    {!!errors.aftersubmit && <Alert severity='error'>{errors.aftersubmit.message}</Alert>}
                </Stack>
                <ReactformText name="title" label="Title" />
                <ReactformTextAutocompelete name="Group Name" label="members" multiple freeSolo options={dummy.map((el) => el)} ChipProps={{ size: "medium" }} />
            </Stack>
        </FormProvider>

    )

}

export default function CreateGroup({ open, handleClose }) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"

            fullWidth
            maxWidth="xs"
        >
            <DialogTitle id="alert-dialog-title">
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    Create New Group
                    <IconButton onClick={handleClose}>
                        <XCircle />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <Group_Form />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant='outlined' autoFocus>
                Cancel
                </Button>
                <Button onClick={handleClose} variant='contained' autoFocus>
                Create
                </Button>
            </DialogActions>
        </Dialog>
    )

}
