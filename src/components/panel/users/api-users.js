import api from '../../../config/axios-interceptor';

export const allUsersApi = async ({page, pageSize}) => {
    try {
        return await api.get(
            `/api/v1/user/find-all?page=${page}&size=${pageSize}`,
        );
    } catch (error) {
        console.error('Error during API call:', error);
    }
};