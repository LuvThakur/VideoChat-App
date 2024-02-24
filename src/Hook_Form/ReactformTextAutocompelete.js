import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import PropTypes from "prop-types";

ReactformTextAutocompelete.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    helperText: PropTypes.node

}


export default function ReactformTextAutocompelete({ name, label, helperText, ...other }) {

    const { Control, setValue } = useFormContext();
    return (
        <Controller name={name} control={Control}

            render={(({ field, fieldState: { error } }) => (

                <Autocomplete

                    {...field}
                    fullWidth

                    error={!!error}


                    onChange={(event, newValue) => setValue(name, newValue, { shouldValidate: true })}

                    value={typeof field.value === "number" && field.value === 0 ? "" : field.value}

                    helperText={error ? error.message : helperText}

                    {...other}

                    renderInput={(params) => (<TextField label={label} error={!!error} helperText={error ? error.message : helperText} {...params} />)}

                />
            ))}

        />
    )
}
