import {AppBar, Badge, Box, IconButton, Toolbar, Typography} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import React, {useEffect, useState} from "react";
import {currentUserApi} from "../components/panel/api-panel";
import {useLocation} from "react-router-dom";

const Header = ({toggleDrawer, setLoading, handleMenuClick}) => {
    const location = useLocation();
    const [currentUser, setCurrentUser] = useState(null);
    const [unreadNotifications, setUnreadNotifications] = useState(5);
    const [marketTime, setMarketTime] = useState('');

    useEffect(() => {
        getCurrentUser();
        getCurrentTime()
    }, [location.pathname]);

    const getCurrentUser = async () => {
        setLoading(true);
        const response = await currentUserApi();
        setCurrentUser(response);
        setLoading(false);
    };

    const getCurrentTime = async () => {
        const date = new Date();
        const marketTimeFormatted = date.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: "Europe/Athens",
        });
        setMarketTime(marketTimeFormatted);
    }

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
                    {marketTime}
                </Typography>

                <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
                    <MenuIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Header;