import React, {useEffect, useState} from "react";
import {getUserById} from "./api-users";
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

const UserInfo = ({open, handleClose, currentDataId, showMessage}) => {
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        fullName: '',
        role: 'NONE'
    });

    const fetchUser = async (id) => {
        try {
            const response = await getUserById({id});
            setFormValues(response);
        } catch (error) {
            showMessage("Error Fetching Data!", 'error');
        }
    };

    useEffect(() => {
        if (currentDataId) {
            fetchUser(currentDataId);
        }
    }, [currentDataId]);

    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <span>Show</span>
                        <Button onClick={() => handleClose()} className="!text-red-600" style={{minWidth: 0, padding: '0 8px'}}>
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
                        autoComplete="off"
                        disabled={true}
                        isSubmitted={false}
                    />
                    <RequiredTextField
                        errorMessage="Please enter password"
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="text"
                        name="password"
                        value={formValues?.password}
                        autoComplete="off"
                        disabled={true}
                        isSubmitted={false}
                    />
                    <RequiredTextField
                        errorMessage="Please enter full name"
                        margin="normal"
                        fullWidth
                        label="Full Name"
                        name="fullName"
                        value={formValues?.fullName}
                        autoComplete="off"
                        disabled={true}
                        isSubmitted={false}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Role</InputLabel>
                        <Select
                            name="role"
                            value={formValues?.role}
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
                        onClick={() => handleClose()}
                        className="!text-red-700">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default UserInfo;