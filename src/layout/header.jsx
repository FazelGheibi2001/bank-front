import {AppBar, Badge, Box, IconButton, Toolbar, Typography} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import React, {useEffect, useState} from "react";
import {currentUserApi} from "../components/panel/api-panel";

const Header = ({toggleDrawer, setLoading, handleMenuClick}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [unreadNotifications, setUnreadNotifications] = useState(5);

    useEffect(() => {
        getCurrentUser();
    }, []);

    const getCurrentUser = async () => {
        setLoading(true);
        const response = await currentUserApi();
        setCurrentUser(response);
        setLoading(false);
    };

    return (
        <AppBar position="fixed">
            <Toolbar className="flex justify-between">
                <Box className="flex items-center space-x-4">
                    <IconButton color="inherit" onClick={() => handleMenuClick("Profile")}>
                        <AccountCircleIcon/>
                    </IconButton>
                    <IconButton color="inherit" onClick={() => handleMenuClick("Notifications")}>
                        <Badge
                            badgeContent={unreadNotifications}
                            color="error"
                            overlap="circular"
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <NotificationsIcon/>
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit" onClick={() => handleMenuClick("Settings")}>
                        <SettingsIcon/>
                    </IconButton>
                    <Typography className="text-white !font-sans text-lg" variant="h6">
                        {currentUser ? currentUser?.fullName : "No user"}
                    </Typography>
                </Box>

                <Typography className="text-white" variant="h6">
                    Market Time: 20:12:30
                </Typography>

                <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
                    <MenuIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Header;