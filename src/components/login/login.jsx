import {Button, Card, IconButton, TextField} from "@mui/material";
import {useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {loginApi} from "./api-login";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        const response = await loginApi(username, password);
        if (response) {
            sessionStorage.setItem("Token", response.Token);
            navigate('/panel')
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="p-8 w-96 shadow-lg" style={{backgroundColor: '#fff'}}>
                <img className="p-6" src="/logo1.png" alt="FAT8184"/>
                <div className="space-y-4">
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="off"
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            ),
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Login;