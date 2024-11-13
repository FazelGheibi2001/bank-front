import {Route, Routes} from "react-router-dom";
import Login from "../components/login/login";
import ProtectedRoute from "../config/protected-route";
import Panel from "../components/panel/panel";
import Users from "../components/panel/users/users";

const ModuleRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Login/>
                }
            />
            <Route
                path="/login"
                element={
                    <Login/>
                }
            />
            <Route
                path="/panel"
                element={
                    <ProtectedRoute>
                        <Panel/>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/panel/users"
                element={
                    <ProtectedRoute>
                        <Users/>
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default ModuleRoutes;