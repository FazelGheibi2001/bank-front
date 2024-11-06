import './App.css';
import Login from "./components/login/login";
import {Route, Routes} from "react-router-dom";
import Panel from "./components/panel/panel";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/panel" element={<Panel />} />
        </Routes>
    );
}

export default App;
