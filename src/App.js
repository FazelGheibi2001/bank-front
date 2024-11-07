import './App.css';
import Login from "./components/login/login";
import {Route, Routes} from "react-router-dom";
import Panel from "./components/panel/panel";
import ProtectedRoute from "./config/protected-route";

const App = () => {
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
        </Routes>
    );
}

export default App;
