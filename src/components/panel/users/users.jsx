import React, { useEffect, useState } from "react";
import { allUsersApi } from "./api-users";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Card,
    CardContent,
    Button,
    TextField
} from "@mui/material";
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Chip } from '@mui/material';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await allUsersApi();
        setUsers(response);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-full w-full">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div>
                    <Button sx={{ backgroundColor: 'white', borderColor: '#042e78', marginTop: 2, marginBottom: 1, marginLeft: 1, marginRight: 1, border: '2px solid' }}>
                        Create
                    </Button>
                    <Button sx={{ backgroundColor: 'white', borderColor: '#042e78', marginTop: 2, marginBottom: 1, marginLeft: .25, marginRight: 1, border: '2px solid' }}>
                        Reload
                    </Button>
                </div>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{ marginRight: 2 }}
                    fullWidth
                    style={{ maxWidth: "300px" }}
                />
            </div>

            <Card sx={{
                borderRadius: 3,
                boxShadow: 4,
                padding: 1,
                minWidth: '90%',
                minHeight: '85%',
                marginTop: 2,
            }}>
                <CardContent>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="users table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#e1e1e1" }}>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>#</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Username</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Full Name</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Role</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredUsers.map((user, index) => (
                                    <TableRow
                                        key={user.id}
                                        sx={{
                                            backgroundColor: index % 2 === 0 ? "#fafafa" : "#f1f1f1",
                                        }}
                                    >
                                        <TableCell sx={{ textAlign: 'center' }}>{index + 1}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{user.username}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{user.fullName}</TableCell>
                                        {user?.role === 'MANAGER' ? (
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Chip label="Manager" color="primary" sx={{ fontWeight: 'bold' }} />
                                            </TableCell>
                                        ) : null}

                                        {user?.role === 'USER' ? (
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Chip label="User" color="success" sx={{ fontWeight: 'bold' }} />
                                            </TableCell>
                                        ) : null}

                                        {user?.role === 'ADMIN' ? (
                                            <TableCell sx={{ textAlign: 'center' }}>
                                                <Chip label="Admin" color="error" sx={{ fontWeight: 'bold' }} />
                                            </TableCell>
                                        ) : null}
                                        <TableCell sx={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            paddingRight: 0,
                                            width: "150px"
                                        }}>
                                            <DeleteOutlineRoundedIcon sx={{ color: "#FF0000", fontSize: "1.5rem", marginLeft: 2.5 }} />
                                            <BorderColorRoundedIcon sx={{ color: "#FFC107", fontSize: "1.5rem", marginLeft: 2.5 }} />
                                            <InfoRoundedIcon sx={{ color: "#808080", fontSize: "1.5rem", marginLeft: 2.5 }} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </div>
    );
};

export default Users;
