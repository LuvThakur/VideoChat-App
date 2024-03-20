import { Stack, TextField } from '@mui/material';
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const ReactVerifyForm = ({ keyname = "", input = [], ...other }) => {

    const { control } = useFormContext();

    const handlechangeOtpField = (event, handlechange) => {

        const { maxLength, value, name } = event.target;

        const fieldIndexValue = name.replace(keyname, "");

        const fieldIndex = Number(fieldIndexValue);

        const nextfield = document.querySelector(`input[name=${keyname}${fieldIndex + 1}]`);


        // Handle normal input

        if (value.length > maxLength) {

            event.target.value = value[0];

        }

        if (value.length >= maxLength && fieldIndex < 6 && nextfield !== null) {
            nextfield.focus();
        }

        // Handle backspace
        if (value.length === 0 && fieldIndex > 0) {
            const prevField = document.querySelector(`input[name=${keyname}${fieldIndex - 1}]`);
            if (prevField) {
                prevField.focus();
            }
        }


        // onChange event handler is responsible for updating the form state with the new value of the input field.
        handlechange(event);

    }

    return (
        <Stack direction={"row"} spacing={2} justifyContent={"center"} >
            {

                input.map((name, Index) => (
                    <Controller key={name} name={`${keyname}${Index + 1}`} control={control}
                        render={
                            ({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    error={!!error}
                                    autoFocus={Index === 0}
                                    placeholder={'-'}
                                    onChange={(event) => { handlechangeOtpField(event, field.onChange) }}

                                    onFocus={(event) => event.currentTarget.select()}

                                    InputProps={{

                                        sx: {
                                            width: { sx: 36, sm: 56 },
                                            height: { sx: 36, sm: 56 },
                                            "& input": { p: 0, textAlign: 'center' }
                                        }

                                    }}

                                    inputProps={{
                                        maxLength: 1,
                                        type: "number",

                                    }}

                                    {...other}
                                />
                            )
                        } />

                ))
            }

        </Stack>
    )
}

export default ReactVerifyForm