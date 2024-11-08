import api from '../../config/axios-interceptor';

export const currentUserApi = async () => {
    try {
        return await api.get(
            '/api/v1/user/current',
        );
    } catch (error) {
        console.error('Error during API call:', error);
    }
};