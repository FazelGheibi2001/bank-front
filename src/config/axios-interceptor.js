import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('Authorization');
        if (token) {
            config.headers['Authorization'] = `${token}`;
        }

        console.log('Request:', config);

        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log('Response:', response);
        return response.data;
    },
    (error) => {
        console.error('Response Error:', error);

        if (error.response && error.response.status === 403) {
            window.location.href = '/login';
        }

        if (error.response && error.response.status === 401) { // TODO : FILL ME
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export default api;