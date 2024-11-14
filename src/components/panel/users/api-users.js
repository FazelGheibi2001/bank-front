import api from '../../../config/axios-interceptor';

export const getAllUsers = async ({page, pageSize}) => {
    try {
        return await api.get(
            `/api/v1/user/find-all?page=${page}&size=${pageSize}`,
        );
    } catch (error) {
        console.error('Error during API call:', error);
    }
};

export const getUserById = async ({id}) => {
    try {
        return await api.get(
            `/api/v1/user/find/${id}`,
        );
    } catch (error) {
        console.error('Error during API call:', error);
    }
};

export const createUser = async ({username, password, role, fullName}) => {
    try {
        return await api.post(
            `/api/v1/user/create`,
            {
                username: username,
                password: password,
                role: role,
                fullName: fullName
            }
        );
    } catch (error) {
        console.error('Error during API call:', error);
    }
};

export const deleteUser = async (id) => {
    try {
        return await api.delete(
            `/api/v1/user/delete/${id}`,
        );
    } catch (error) {
        console.error('Error during API call:', error);
    }
};

export const updateUser = async ({id, username, password, role, fullName}) => {
    return await api.put(
        `/api/v1/user/update`,
        {
            id: id,
            username: username,
            password: password,
            role: role,
            fullName: fullName
        }
    );
};