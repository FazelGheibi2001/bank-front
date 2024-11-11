import React, {useEffect, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import {deleteUser, getAllUsers} from "./api-users";
import {
    Button,
    Paper,
    Chip,
    IconButton,
    TablePagination
} from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import CreateUser from "./user-create";
import AddIcon from '@mui/icons-material/Add';
import CachedIcon from '@mui/icons-material/Cached';

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
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchUsers(paginationModel.page, paginationModel.pageSize);
    }, [paginationModel.page, paginationModel.pageSize]);

    const fetchUsers = async (page, pageSize) => {
        setLoading(true);
        const response = await getAllUsers({page: page, pageSize: pageSize});
        setUsers(response?.content);
        setTotalRows(response?.totalElements);
        setLoading(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteUser(deleteId);
            setDeleteModalOpen(false);
            setDeleteId(null);
            fetchUsers(paginationModel.page, paginationModel.pageSize);
        } catch (error) {
            console.error("Failed to delete:", error);
        }
    };

    const handleClose = () => {
        setDeleteModalOpen(false);
        setDeleteId(null);
    };


    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (id) => {
        setDeleteId(id);
        setDeleteModalOpen(true);
    }

    const handleUpdate = async (id) => {
        alert(`Are you sure you want to update ${id}`);
    }

    const handleShow = async (id) => {
        alert(`Are you sure you want to show ${id}`);
    }

    const handleReload = async () => {
        await fetchUsers(paginationModel.page, paginationModel.pageSize);
    }

    const columns = [
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
                        onClick={() => setOpen(true)}
                    >
                        Add
                        <AddIcon className="ml-1"/>
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
                        <CachedIcon className="ml-1"/>
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

            <CreateUser open={open} handleClose={() => setOpen(false)}/>

            <div>
                <Dialog open={deleteModalOpen} onClose={handleClose}>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete item with ID {deleteId}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmDelete} color="secondary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default Users;
