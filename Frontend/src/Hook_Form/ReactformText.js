import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

ReactformText.propTypes = {
    name: PropTypes.string,
    helperText: PropTypes.node
}

export default function ReactformText({ name, helperText, ...other }) {
    //control object gives an control over the form's state and behaviour
    const { control } = useFormContext();
    return (
        <Controller name={name} control={control} render={({ field, fieldState: { error } }) => (
            <TextField

                {...field}
                fullWidth
                error={!!error}

                value={typeof field.value === "number" && field.value === 0 ? "" : field.value}
                helperText={error ? error.message : helperText}
                {...other}
            />

        )
        } />
    )
}