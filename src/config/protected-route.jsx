import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {
    const isAuthenticated = Boolean(sessionStorage.getItem('Authorization'));

    if (!isAuthenticated) {
        return <Navigate to="/login" replace={false}/>;
    }

    return children;
};


export default ProtectedRoute;