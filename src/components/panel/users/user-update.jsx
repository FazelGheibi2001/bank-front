import React, {useEffect, useState} from "react";
import {getUserById, updateUser} from "./api-users";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RequiredTextField from "../../../shared/RequiredTextField";

const UserUpdate = ({open, handleClose, currentDataId, showMessage}) => {
    const [formValues, setFormValues] = useState({
        id: '',
        username: '',
        password: '',
        fullName: '',
        role: 'NONE'
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (currentDataId) {
            fetchUser(currentDataId);
        }
    }, [currentDataId]);

    const fetchUser = async (id) => {
        const response = await getUserById({id});
        setFormValues(response);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetFormValues = async () => {
        await fetchUser(currentDataId);
        setIsSubmitted(false);
    }

    const handleUpdate = async () => {
        setIsSubmitted(true);

        if (formValues.username !== '' &&
            formValues.password !== '' &&
            formValues.fullName !== '' &&
            formValues.role !== 'NONE') {
            try {
                await updateUser({
                        id: currentDataId,
                        username: formValues.username,
                        password: formValues.password,
                        fullName: formValues.fullName,
                        role: formValues.role
                    }
                );
                showMessage("Item updated successfully!", 'success');
                resetFormValues();
            } catch (error) {
                showMessage("Update Failed!", 'error');
            }
            setIsSubmitted(false);
            handleClose();
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <span>Update User</span>
                        <Button onClick={() => {
                            handleClose();
                            resetFormValues();
                        }} className="!text-red-600" style={{minWidth: 0, padding: '0 8px'}}>
                            <CloseIcon/>
                        </Button>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <RequiredTextField
                        errorMessage="Please enter username"
                        margin="normal"
                        fullWidth
                        label="Username"
                        name="username"
                        value={formValues?.username}
                        onChange={handleChange}
                        autoComplete="off"
                        isSubmitted={isSubmitted}
                    />
                    <RequiredTextField
                        errorMessage="Please enter password"
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="text"
                        name="password"
                        value={formValues?.password}
                        onChange={handleChange}
                        autoComplete="off"
                        isSubmitted={isSubmitted}
                    />
                    <RequiredTextField
                        errorMessage="Please enter full name"
                        margin="normal"
                        fullWidth
                        label="Full Name"
                        name="fullName"
                        value={formValues?.fullName}
                        onChange={handleChange}
                        autoComplete="off"
                        isSubmitted={isSubmitted}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Role</InputLabel>
                        <Select
                            name="role"
                            value={formValues?.role}
                            onChange={handleChange}
                            label="Role"
                            variant="outlined"
                            required={true}
                        >
                            <MenuItem value="NONE">None</MenuItem>
                            <MenuItem value="MANAGER">Manager</MenuItem>
                            <MenuItem value="ADMIN">Admin</MenuItem>
                            <MenuItem value="USER">User</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            handleClose();
                            resetFormValues();
                        }}
                        className="!text-red-700">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} color="primary" variant="contained">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UserUpdate;