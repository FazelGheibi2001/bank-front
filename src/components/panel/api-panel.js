import api from '../../config/axios-interceptor';


export const testApi = async () => {
    try {
        return await api.get(
            '/api/v1/test',
        );
    } catch (error) {
        console.error('Error during API call:', error);
    }
};