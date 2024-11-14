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

        if (onChange) {
            onChange(e);
        }
    };

    useEffect(() => {
        if (isSubmitted) {
            setError(rest.value?.trim() === '');
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
                "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#191919",
                },
            }}
            onChange={handleChange}
        />
    );
};

export default RequiredTextField;
