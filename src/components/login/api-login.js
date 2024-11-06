import api from '../../config/axios-interceptor';

export const loginApi = async (username, password) => {
    try {
        return await api.post(
            '/login', {
                username: username,
                password: password
            }
        );
    } catch (error) {
        console.error('Error during API call:', error);
    }
};
