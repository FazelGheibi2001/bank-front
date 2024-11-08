import React, {useEffect, useState} from "react";
import {DataGrid} from '@mui/x-data-grid';
import {allUsersApi} from "./api-users";
import {Button, TextField, Paper, Chip, IconButton} from "@mui/material";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import {GridRenderCellParams} from "@mui/x-data-grid";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 5});


    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await allUsersApi();
        setUsers(response?.content);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const columns = [
        {
            sortable: true,
            field: 'lineNo',
            headerName: '#',
            flex: 0,
            editable: false,
            renderCell: (params: GridRenderCellParams<DatasetEntryEntity>) =>
                params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
        },
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
                    <IconButton onClick={() => alert(params.row.id)}>
                        <DeleteOutlineRoundedIcon sx={{color: "#FF0000"}}/>
                    </IconButton>
                    <IconButton onClick={() => alert(params.row.id)}>
                        <BorderColorRoundedIcon sx={{color: "#ffb73e"}}/>
                    </IconButton>
                    <IconButton onClick={() => alert(params.row.id)}>
                        <InfoRoundedIcon sx={{color: "#808080"}}/>
                    </IconButton>
                </div>
            ),
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            align: 'center',
        },
    ];

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
                        onClick={() => alert("create")}
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
                        onClick={() => alert("reload")}
                    >
                        Reload
                    </Button>
                </div>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{marginRight: 3, marginTop: 2}}
                    fullWidth
                    style={{maxWidth: "300px"}}
                />
            </div>

            <Paper sx={{height: '88%', width: '100%'}}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={paginationModel.pageSize}
                    page={paginationModel.page}
                    onPageSizeChange={(newPageSize) => setPaginationModel({...paginationModel, pageSize: newPageSize})}
                    onPageChange={(newPage) => setPaginationModel({...paginationModel, page: newPage})}
                    pagination
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{border: 0}}
                />
            </Paper>
        </div>
    );
};

export default Users;
