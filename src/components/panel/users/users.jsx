import React, {useEffect, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import {deleteUser, getAllUsers} from "./api-users";
import {
    Button,
    Paper,
    Chip,
    IconButton
} from "@mui/material";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import CreateUser from "./user-create";
import AddIcon from '@mui/icons-material/Add';
import CachedIcon from '@mui/icons-material/Cached';
import CustomPagination from "../../../shared/pagination";
import {Modal, Box, Typography} from '@mui/material';

const Users = () => {
    const [data, setData] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 1,
        pageSize: 10,
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchUsers(paginationModel.page - 1, paginationModel.pageSize);
    }, [paginationModel.page, paginationModel.pageSize]);

    const fetchUsers = async (page, pageSize) => {
        setLoading(true);
        const response = await getAllUsers({page: page, pageSize: pageSize});
        setData(response?.content);
        setTotalPages(response?.totalPages);
        setLoading(false);
    };

    const handlePagination = (event, value) => {
        setPaginationModel({
            page: value,
            pageSize: paginationModel.pageSize
        })
    };

    const handlePageSizeChange = (event) => {
        setPaginationModel({
            page: 1,
            pageSize: event.target.value
        })
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteUser(deleteId);
            setDeleteModalOpen(false);
            setDeleteId(null);
            await fetchUsers(paginationModel.page - 1, paginationModel.pageSize);
        } catch (error) {
            console.error("Failed to delete:", error);
        }
    };

    const handleClose = () => {
        setDeleteModalOpen(false);
        setDeleteId(null);
    };


    const filteredUsers = data.filter((user) =>
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
        await fetchUsers(paginationModel.page - 1, paginationModel.pageSize);
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

    const rowsToShow = searchQuery ? filteredUsers : data;

    return (
        <div className="h-full w-full">
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10}}>
                <div>
                    <Button
                        sx={{
                            backgroundColor: 'white',
                            color: '#1976D2',
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
                            color: '#388E3C',
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

            <Paper sx={{height: '80%', width: '100%'}}>
                <DataGrid
                    rows={rowsToShow}
                    columns={columns}
                    loading={loading}
                    pagination
                    checkboxSelection
                    disableSelectionOnClick
                    sx={{borderTop: 1, borderColor: '#dcdcdc', borderBottom: 0}}
                    hideFooter
                />
                <div className="bg-white">
                    <CustomPagination
                        page={paginationModel.page}
                        pageSize={paginationModel.pageSize}
                        handlePagination={handlePagination}
                        handlePageSizeChange={handlePageSizeChange}
                        totalPages={totalPages}
                    />
                </div>
            </Paper>

            <CreateUser open={open} handleClose={() => setOpen(false)}/>

            <Modal
                open={deleteModalOpen}
                onClose={handleClose}
                aria-labelledby="delete-modal-title"
                aria-describedby="delete-modal-description"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        width: 500,
                        backgroundColor: 'background.paper',
                        borderRadius: '10px',
                        boxShadow: 24,
                        p: 3,
                    }}
                >
                    <Typography
                        id="delete-modal-title"
                        variant="h6"
                        sx={{ color: 'text.primary', fontWeight: 'bold', mb: 1 }}
                    >
                        Confirm Deletion
                    </Typography>
                    <Typography
                        id="delete-modal-description"
                        sx={{ color: 'text.secondary', fontSize: '1rem', mb: 2 }}
                    >
                        Are you sure you want to delete this item? This action cannot be undone.
                    </Typography>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            onClick={handleClose}
                            sx={{
                                mr: 1.5,
                                color: '#BC2727',
                                backgroundColor: 'transparent',
                                '&:hover': {
                                    backgroundColor: '#FCEAEA',
                                    borderColor: '#BC2727',
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirmDelete}
                            color="primary"
                            variant="contained"
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#4b9aed',
                                },
                            }}
                        >
                            Confirm
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default Users;
