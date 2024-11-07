import React, {useEffect, useState} from "react";
import {testApi} from "./api-panel";
import CircularProgress from '@mui/material/CircularProgress';


const Panel = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCurrentUser();
    }, []);

    const getCurrentUser = async () => {
        setLoading(true);
        const response = await testApi();
        setCurrentUser(response);
        setLoading(false);
    }

    return (
        loading ? (
            <div className="flex justify-center items-center h-screen text-5xl">
                <CircularProgress size={60}/>
            </div>
        ) : (
            <div>
                <span className="text-black flex justify-center items-center h-screen text-5xl">
                    {currentUser ? currentUser?.fullName : "no user"} / {currentUser ? currentUser?.phoneNumber : "no user"}
                </span>
            </div>
        )
    );
}

export default Panel;