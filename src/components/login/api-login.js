import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const loginApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (username, password) => {
    try {
        return await loginApi.post(
            '/api/login/', {
                username: username,
                password: password
            }
        );
    } catch (error) {
        console.error('Error during API call:', error);
        return {
            status: 401
        }
    }
};