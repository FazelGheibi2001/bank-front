import React, {useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {Outlet, useNavigate} from "react-router-dom";
import Header from "../../layout/header";
import Menu from "../../layout/menu";

const Panel = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const handleMenuClick = (page) => {
        if (page === 'Exit') {
            sessionStorage.clear();
            navigate('/login');
        } else {
            navigate(`/panel/${page.toLowerCase().replace(' ', '-')}`);
        }
    };

    return (
        <div className="flex h-screen">
            <Header
                toggleDrawer={toggleDrawer}
                setLoading={setLoading}
                handleMenuClick={handleMenuClick}
            />
            <Menu
                toggleDrawer={toggleDrawer}
                setDrawerOpen={setDrawerOpen}
                handleMenuClick={handleMenuClick}
                drawerOpen={drawerOpen}
            />

            <div className="flex-1 flex flex-col pt-16 bg-gray-100">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <CircularProgress size={60}/>
                    </div>
                ) : (
                    <div className="flex h-full bg-white">
                        <Outlet/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Panel;
