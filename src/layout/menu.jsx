import {Box, Drawer, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import LocalConvenienceStoreRoundedIcon from "@mui/icons-material/LocalConvenienceStoreRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import DonutSmallRoundedIcon from "@mui/icons-material/DonutSmallRounded";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ManageHistoryRoundedIcon from "@mui/icons-material/ManageHistoryRounded";
import OnlinePredictionRoundedIcon from "@mui/icons-material/OnlinePredictionRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import React from "react";

const Menu = ({toggleDrawer, drawerOpen, handleMenuClick, selectedPage}) => {

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


    return (
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
    )
}

export default Menu;