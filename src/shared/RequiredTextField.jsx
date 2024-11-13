import { TextField } from "@mui/material";
import { useState, useEffect } from "react";

const RequiredTextField = ({ errorMessage, onChange, isSubmitted, ...rest }) => {
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        if (e.target.validity.valid) {
            setError(false);
        } else {
            setError(true);
        }

        // Call parent onChange to update form state
        if (onChange) {
            onChange(e);
        }
    };

    // Trigger validation when form is submitted
    useEffect(() => {
        if (isSubmitted) {
            // Validate the field again on form submit
            setError(rest.value.trim() === '');
        }
    }, [isSubmitted, rest.value]);

    return (
        <TextField
            {...rest}
            required
            error={error}
            helperText={error ? errorMessage : ""}
            sx={{
                "& .MuiInputLabel-asterisk": {
                    color: "red",
                },
            }}
            onChange={handleChange}
        />
    );
};

export default RequiredTextField;
