import React, {useEffect, useState} from "react";
import {currentUserApi} from "./api-panel";
import CircularProgress from "@mui/material/CircularProgress";
import {
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    AppBar,
    Toolbar,
    Typography,
    Box, Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import NotificationsIcon from "@mui/icons-material/Notifications";
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocalConvenienceStoreRoundedIcon from '@mui/icons-material/LocalConvenienceStoreRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import DonutSmallRoundedIcon from '@mui/icons-material/DonutSmallRounded';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ManageHistoryRoundedIcon from '@mui/icons-material/ManageHistoryRounded';
import OnlinePredictionRoundedIcon from '@mui/icons-material/OnlinePredictionRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import Users from "./users/users";

const Panel = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedPage, setSelectedPage] = useState("Home");
    const [unreadNotifications, setUnreadNotifications] = useState(5);
    const PAGES = [
        "Home",
        "Accounts",
        "Users",
        "Positions",
        "Profits",
        "Market",
        "Open Positions",
        "Dashboard",
        "Magic Number",
        "Back Test",
        "Signals",
        "Exit"
    ];

    useEffect(() => {
        getCurrentUser();
    }, []);

    const getCurrentUser = async () => {
        setLoading(true);
        const response = await currentUserApi();
        setCurrentUser(response);
        setLoading(false);
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const handleMenuClick = (page) => {
        setSelectedPage(page);
        setDrawerOpen(false);
    };

    const renderContent = () => {
        if (selectedPage === 'Exit') {
            window.location.href = '/login';
            sessionStorage.clear()
            return null
        }

        switch (selectedPage) {
            case "Home":
                return <div className="text-black">Home Content</div>;
            case "Accounts":
                return <div className="text-black">Accounts Content</div>;
            case "Users":
                return <Users/>
            case "Positions":
                return <div className="text-black">Position Content</div>;
            case "Profits":
                return <div className="text-black">Profits Content</div>;
            case "Market":
                return <div className="text-black">Market Content</div>;
            case "Open Positions":
                return <div className="text-black">Open Positions Content</div>;
            case "Dashboard":
                return <div className="text-black">Dashboard Content</div>;
            case "Magic Number":
                return <div className="text-black">Magic Number Content</div>;
            case "Signals":
                return <div className="text-black">Signals Content</div>;
            case "Back Test":
                return <div className="text-black">Back Test Content</div>;
            case "Settings":
                return <div className="text-black">Settings Content</div>;
            case "Profile":
                return <div className="text-black">Profile Content</div>;
            case "Notifications":
                return <div className="text-black">Notifications Content</div>;
            default:
                return <div className="text-black">Welcome!</div>;
        }
    };

    return (
        <div className="flex h-screen">
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

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{width: 300, "& .MuiDrawer-paper": {width: 300}}}
            >
                <Box className="flex justify-center items-center mt-4">
                    <img src="/logo1.png" alt="logo" className="w-1/2"/>
                </Box>
                <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                    <List>
                        {PAGES.map((page) => (
                            <ListItem
                                button
                                key={page}
                                onClick={() => handleMenuClick(page)}
                                sx={{
                                    backgroundColor: selectedPage === page ? "#FCBCA5" : "transparent",
                                    color: selectedPage === page ? "#787878" : "inherit",
                                    "&:hover": {
                                        backgroundColor: "#FCBCA5",
                                        color: "#787878",
                                    },
                                }}
                            >
                                <ListItemText className="text-center" primary={page}/>
                                <ListItemIcon>
                                    {page === "Accounts" && <PeopleAltRoundedIcon/>}
                                    {page === "Users" && <AdminPanelSettingsRoundedIcon/>}
                                    {page === "Home" && <HomeIcon/>}
                                    {page === "Settings" && <SettingsIcon/>}
                                    {page === "Profile" && <AccountCircleIcon/>}
                                    {page === "Notifications" && <NotificationsIcon/>}
                                    {page === "Positions" && <ReceiptLongRoundedIcon/>}
                                    {page === "Profits" && <MonetizationOnRoundedIcon/>}
                                    {page === "Market" && <LocalConvenienceStoreRoundedIcon/>}
                                    {page === "Open Positions" && <AccountBalanceWalletRoundedIcon/>}
                                    {page === "Dashboard" && <DonutSmallRoundedIcon/>}
                                    {page === "Magic Number" && <AutoFixHighRoundedIcon/>}
                                    {page === "Back Test" && <ManageHistoryRoundedIcon/>}
                                    {page === "Signals" && <OnlinePredictionRoundedIcon/>}
                                    {page === "Exit" && <ExitToAppRoundedIcon/>}
                                </ListItemIcon>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <div className="flex-1 flex flex-col pt-16 bg-gray-100">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <CircularProgress size={60}/>
                    </div>
                ) : (
                    <div className="flex h-full bg-white">
                        {renderContent()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Panel;
