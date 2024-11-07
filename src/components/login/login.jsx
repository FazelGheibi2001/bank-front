import {Alert, Button, Card, IconButton, Snackbar, TextField} from "@mui/material";
import {useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {login} from "./api-login";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleLogin = async () => {
        if (username === '' || password === '') {
            setAlertMessage(username === '' ? 'Username is required' : 'Password is required');
            setAlertOpen(true);
            return;
        }

        const response = await login(username, password);

        if (response?.status !== 200) {
            setAlertMessage('Username or password is incorrect.');
            setAlertOpen(true);
        } else if (response?.status === 200) {
            sessionStorage.setItem("Authorization", response?.headers?.authorization);
            navigate('/panel')
        }
    };


    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') return;
        setAlertOpen(false);
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
            <Snackbar
                open={alertOpen}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            >
                <Alert onClose={handleCloseAlert} severity="warning" sx={{width: '100%'}}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Login;