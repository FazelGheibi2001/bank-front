import React, {useEffect, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import {allUsersApi} from "./api-users";
import {
    Button,
    Paper,
    Chip,
    IconButton,
    TablePagination,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl
} from "@mui/material";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [totalRows, setTotalRows] = useState(0);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        fullName: '',
        role: 'USER'
    });

    useEffect(() => {
        fetchUsers(paginationModel.page, paginationModel.pageSize);
    }, [paginationModel.page, paginationModel.pageSize]);

    const fetchUsers = async (page, pageSize) => {
        setLoading(true);
        const response = await allUsersApi({page: page, pageSize: pageSize});
        setUsers(response?.content);
        setTotalRows(response?.totalElements);
        setLoading(false);
    };

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (id) => {
        alert(`Are you sure you want to delete ${id}`);
    }

    const handleUpdate = async (id) => {
        alert(`Are you sure you want to update ${id}`);
    }

    const handleShow = async (id) => {
        alert(`Are you sure you want to show ${id}`);
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreate = async () => {
        console.log(formValues);
        setFormValues({
            username: '',
            password: '',
            fullName: '',
            role: 'USER'
        })
        handleClose();
    };

    const handleReload = async () => {
        await fetchUsers(paginationModel.page, paginationModel.pageSize);
    }

    const columns = [
        // {
        //     sortable: true,
        //     field: 'lineNo',
        //     headerName: '#',
        //     flex: 0,
        //     editable: false,
        //     renderCell: (params: GridRenderCellParams<DatasetEntryEntity>) =>
        //         params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
        //     headerClassName: 'super-app-theme--header',
        //     headerAlign: 'center',
        //     align: 'center',
        // },
        {
            field: 'username',
            headerName: 'Username',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'fullName',
            headerName: 'Full Name',
            flex: 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'role',
            headerName: 'Role',
            flex: 1,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={
                        params.value === 'MANAGER' ? 'primary' :
                            params.value === 'USER' ? 'success' :
                                'error'
                    }
                    sx={{fontWeight: 'bold'}}
                />
            ),
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
        },
        {
            field: 'actions',
            headerName: '',
            flex: 1.5,
            sortable: false,
            renderCell: (params) => (
                <div>
                    <IconButton onClick={() => handleDelete(params.row.id)}>
                        <DeleteOutlineRoundedIcon sx={{color: "#FF0000"}}/>
                    </IconButton>
                    <IconButton onClick={() => handleUpdate(params.row.id)}>
                        <BorderColorRoundedIcon sx={{color: "#ffb73e"}}/>
                    </IconButton>
                    <IconButton onClick={() => handleShow(params.row.id)}>
                        <InfoRoundedIcon sx={{color: "#808080"}}/>
                    </IconButton>
                </div>
            ),
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
        },
    ];

    const rowsToShow = searchQuery ? filteredUsers : users;

    return (
        <div className="h-full w-full">
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10}}>
                <div>
                    <Button
                        sx={{
                            backgroundColor: 'white',
                            borderColor: '#042e78',
                            marginTop: 2,
                            marginBottom: 1,
                            marginLeft: 3,
                            marginRight: 1,
                            border: '2px solid'
                        }}
                        onClick={handleOpen}
                    >
                        Create
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: 'white',
                            borderColor: '#042e78',
                            marginTop: 2,
                            marginBottom: 1,
                            marginLeft: .25,
                            marginRight: 1,
                            border: '2px solid'
                        }}
                        onClick={() => handleReload()}
                    >
                        Reload
                    </Button>
                </div>
            </div>

            <Paper sx={{height: '88%', width: '100%'}}>
                <DataGrid
                    rows={rowsToShow}
                    columns={columns}
                    loading={loading}
                    pagination
                    checkboxSelection
                    disableSelectionOnClick
                    sx={{border: 0}}
                    hideFooter
                />
                <div className="bg-white">
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 50, 100, {value: -1, label: 'All'}]}
                        component="div"
                        count={totalRows}
                        rowsPerPage={paginationModel.pageSize}
                        page={paginationModel.page}
                        onPageChange={(event, newPage) => setPaginationModel((prev) => ({...prev, page: newPage}))}
                        onRowsPerPageChange={(event) => {
                            setPaginationModel((prev) => ({...prev, pageSize: +event.target.value, page: 0}));
                        }}
                    />
                </div>
            </Paper>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Create User</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Username"
                        name="username"
                        value={formValues.username}
                        onChange={handleChange}
                        autoComplete="off"
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
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Full Name"
                        name="fullName"
                        value={formValues.fullName}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Role</InputLabel>
                        <Select
                            name="role"
                            value={formValues.role}
                            onChange={handleChange}
                            label="Role"
                        >
                            <MenuItem value="MANAGER">MANAGER</MenuItem>
                            <MenuItem value="ADMIN">ADMIN</MenuItem>
                            <MenuItem value="USER">USER</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreate} color="primary" variant="contained">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Users;
