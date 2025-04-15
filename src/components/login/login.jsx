import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Card, Input, message} from "antd";
import {EyeOutlined, EyeInvisibleOutlined} from "@ant-design/icons";
import {login} from "./api-login";

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (username === '' || password === '') {
            message.error(username === '' ? 'Username is required' : 'Password is required');
            return;
        }

        const response = await login(username, password);
        console.log(response?.status)

        if (response?.status !== 200) {
            message.error('Username or password is incorrect.');
        } else if (response?.status === 200) {
            sessionStorage.setItem("access-token", response?.data?.access);
            sessionStorage.setItem("refresher-token", response?.data?.refresh);
            navigate('/dashboard/user-balance');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-200 to-teal-200">
            <Card
                style={{
                    width: 400,
                    height: 300,
                    padding: "30px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff"
                }}
                bordered={false}
            >
                <div className="space-y-6">
                    <Input
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="off"
                        size="large"
                        className="rounded-md"
                    />
                    <Input.Password
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                        size="large"
                        iconRender={(visible) => visible ? <EyeOutlined/> : <EyeInvisibleOutlined/>}
                        className="rounded-md"
                    />
                    <Button
                        type="primary"
                        className="w-full text-lg py-5 rounded-md"
                        onClick={handleLogin}
                        style={{
                            backgroundColor: "#1D4ED8",
                            borderColor: "#1D4ED8",
                        }}
                    >
                        Login
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Login;
