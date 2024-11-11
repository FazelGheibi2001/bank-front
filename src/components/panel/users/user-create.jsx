import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import React, {useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import {createUser} from "./api-users";

const CreateUser = ({open, handleClose}) => {
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        fullName: '',
        role: 'NONE'
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreate = async () => {
        await createUser({
                username: formValues.username,
                password: formValues.password,
                fullName: formValues.fullName,
                role: formValues.role
            }
        );
        setFormValues({
            username: '',
            password: '',
            fullName: '',
            role: 'NONE'
        })
        handleClose();
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <span>Create User</span>
                        <Button onClick={handleClose} className="!text-red-600" style={{minWidth: 0, padding: '0 8px'}}>
                            <CloseIcon/>
                        </Button>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Username"
                        name="username"
                        value={formValues.username}
                        onChange={handleChange}
                        autoComplete="off"
                        required={true}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="text"
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                        autoComplete="off"
                        required={true}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Full Name"
                        name="fullName"
                        value={formValues.fullName}
                        onChange={handleChange}
                        autoComplete="off"
                        required={true}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Role</InputLabel>
                        <Select
                            name="role"
                            value={formValues.role}
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
                    <Button onClick={handleClose} className="!text-red-700">
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} color="primary" variant="contained">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreateUser;