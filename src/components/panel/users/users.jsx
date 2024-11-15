import React, {useEffect, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import {deleteUser, getAllUsers} from "./api-users";
import {
    Button,
    Paper,
    Chip,
    IconButton, Dialog, DialogTitle, DialogContent, FormControl, InputLabel, Select, MenuItem, DialogActions, TextField
} from "@mui/material";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import AddIcon from '@mui/icons-material/Add';
import CachedIcon from '@mui/icons-material/Cached';
import CustomPagination from "../../../shared/pagination";
import DeleteModal from "../../../shared/delete-modal";
import UserCreate from "./user-create";
import {useSnackbar} from "notistack";
import UserInfo from "./user-info";
import UserUpdate from "./user-update";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from "@mui/icons-material/Close";

const Users = () => {
    const [data, setData] = useState([]);
    const [paginationModel, setPaginationModel] = useState({
        page: 1,
        pageSize: 10,
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [createPopupOpen, setCreatePopupOpen] = useState(false);
    const [infoPopupOpen, setInfoPopupOpen] = useState(false);
    const [updatePopupOpen, setUpdatePopupOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [filterPopupOpen, setFilterPopupOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const {enqueueSnackbar} = useSnackbar();
    const [currentDataIdInfo, setCurrentDataIdInfo] = useState(null);
    const [currentDataIdUpdate, setCurrentDataIdUpdate] = useState(null);
    const [searchFormFilter, setSearchFormFilter] = useState({
        username: null,
        password: null,
        fullName: null,
        role: null
    });
    const [sortModel, setSortModel] = useState({
        field: '',
        sort: '',
    });

    useEffect(() => {
        fetchUsers(paginationModel.page, paginationModel.pageSize, searchFormFilter);
    }, [paginationModel.page, paginationModel.pageSize, createPopupOpen, deleteModalOpen, updatePopupOpen, sortModel]);

    const fetchUsers = async (page, pageSize, filters) => {
        setLoading(true);
        try {
            const response = await getAllUsers(
                {
                    page: page,
                    pageSize: pageSize,
                    sort: sortModel !== undefined ? sortModel : null,
                    filter: Object.fromEntries(
                        Object.entries(filters).filter(([key, value]) => value !== null)
                    ),
                }
            );
            setData(response?.content);
            setTotalPages(response?.totalPages);
        } catch (error) {
            showMessage("Error Fetching Data!", 'error');
        }
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

    const showMessage = (message, variant) => {
        let color;
        switch (variant) {
            case 'success':
                color = '#4caf50';
                break;
            case 'warning':
                color = '#ff9800';
                break;
            case 'error':
                color = '#f44336';
                break;
            default:
                color = '#000';
                break;
        }

        enqueueSnackbar(
            <div style={{display: 'flex', alignItems: 'center'}}>
                {message}
            </div>,
            {
                variant: variant,
                autoHideDuration: 3000,
                style: {
                    backgroundColor: 'white',
                    color: color,
                    borderRadius: '10px',
                    padding: '8px 16px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                },
            }
        );
    }

    const handleConfirmDelete = async () => {
        try {
            await deleteUser(deleteId);
            showMessage("Item deleted successfully!", 'warning');
            setDeleteModalOpen(false);
            setDeleteId(null);
        } catch (error) {
            showMessage("Delete Failed!", 'error');
        }
    };

    const handleDeleteModalClose = () => {
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
        setUpdatePopupOpen(true);
        setCurrentDataIdUpdate(id);
    }

    const handleInfo = async (id) => {
        setInfoPopupOpen(true);
        setCurrentDataIdInfo(id);
    }

    const handleReload = async () => {
        await fetchUsers(paginationModel.page, paginationModel.pageSize, searchFormFilter);
    }

    const handleFilter = async () => {
        setFilterPopupOpen(true);
    }

    const handleFilterClose = async () => {
        setFilterPopupOpen(false);
    }

    const handleSortModelChange = (newSortModel) => {
        setSortModel(newSortModel[0]);
    };

    const resetFilterFormValues = async () => {
        setFilterPopupOpen(false);
        await setSearchFormFilter({
            username: null,
            password: null,
            fullName: null,
            role: null
        })
        setPaginationModel({
            page: 1,
            pageSize: paginationModel.pageSize
        })
        await fetchUsers(1, paginationModel.pageSize, {
            username: null,
            password: null,
            fullName: null,
            role: null
        });
    }

    const handleFilterChange = (e) => {
        const {name, value} = e.target;
        setSearchFormFilter((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submitFilter = async () => {
        setPaginationModel({
            page: 1,
            pageSize: paginationModel.pageSize
        })
        await fetchUsers(1, paginationModel.pageSize, searchFormFilter);
        setFilterPopupOpen(false);
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
                    sx={{
                        backgroundColor:
                            params.value === 'MANAGER' ? '#edae49' :
                                params.value === 'USER' ? '#d1495b' :
                                    '#00798c',
                        fontWeight: 'bold',
                        color: 'white',
                        borderRadius: '10px'
                    }}
                    variant="filled"
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
                    <IconButton onClick={() => handleInfo(params.row.id)}>
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
                            color: '#388E3C',
                            marginTop: 2,
                            marginBottom: 1,
                            marginLeft: 3,
                            marginRight: 1,
                            border: '2px solid'
                        }}
                        onClick={() => setCreatePopupOpen(true)}
                    >
                        Add
                        <AddIcon className="ml-1"/>
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: 'white',
                            color: '#1976D2',
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
                    <Button
                        sx={{
                            backgroundColor: 'white',
                            color: '#1976D2',
                            marginTop: 2,
                            marginBottom: 1,
                            marginLeft: .25,
                            marginRight: 1,
                            border: '2px solid'
                        }}
                        onClick={() => handleFilter()}
                    >
                        Filter
                        <FilterAltIcon className="ml-1"/>
                    </Button>
                </div>
            </div>

            <Paper sx={{height: '80%', width: '100%'}}>
                <DataGrid
                    rows={rowsToShow}
                    columns={columns}
                    loading={loading}
                    pagination
                    // checkboxSelection
                    disableSelectionOnClick
                    onSortModelChange={handleSortModelChange}
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

            <UserCreate
                open={createPopupOpen}
                handleClose={() => setCreatePopupOpen(false)}
                showMessage={showMessage}
            />

            <DeleteModal
                open={deleteModalOpen}
                handleClose={handleDeleteModalClose}
                handleConfirmDelete={handleConfirmDelete}
            />

            <UserInfo
                open={infoPopupOpen}
                handleClose={() => setInfoPopupOpen(false)}
                currentDataId={currentDataIdInfo}
                showMessage={showMessage}
            />

            <UserUpdate
                open={updatePopupOpen}
                handleClose={() => setUpdatePopupOpen(false)}
                showMessage={showMessage}
                currentDataId={currentDataIdUpdate}
            />

            <div>
                <Dialog open={filterPopupOpen} onClose={handleFilterClose} maxWidth="sm" fullWidth>
                    <DialogTitle>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <span>Filter User</span>
                            <Button onClick={() => handleFilterClose()} className="!text-red-600"
                                    style={{minWidth: 0, padding: '0 8px'}}>
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
                            value={searchFormFilter?.username}
                            onChange={handleFilterChange}
                            autoComplete="off"
                        />
                        <TextField
                            errorMessage="Please enter full name"
                            margin="normal"
                            fullWidth
                            label="Full Name"
                            name="fullName"
                            value={searchFormFilter?.fullName}
                            onChange={handleFilterChange}
                            autoComplete="off"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Role</InputLabel>
                            <Select
                                name="role"
                                value={searchFormFilter?.role}
                                onChange={handleFilterChange}
                                label="Role"
                                variant="outlined"
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
                            onClick={() => resetFilterFormValues()}
                            className="!text-red-700">
                            Reset
                        </Button>
                        <Button onClick={submitFilter} color="primary" variant="contained">
                            Filter
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        </div>
    );
};

export default Users;
