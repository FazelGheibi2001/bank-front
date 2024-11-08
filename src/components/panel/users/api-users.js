import api from '../../../config/axios-interceptor';

export const allUsersApi = async () => {
    try {
        return await api.get(
            '/api/v1/user/find-all',
        );
    } catch (error) {
        console.error('Error during API call:', error);
    }
};