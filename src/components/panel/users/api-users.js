import api from '../../../config/axios-interceptor';

export const getAllUsers = async ({page, pageSize, filter}) => {
    const queryParams = new URLSearchParams({page: page - 1, size: pageSize, ...filter});
    return await api.get(
        `/api/v1/user/find-all?${queryParams}`,
    );
};

export const getUserById = async ({id}) => {
    return await api.get(
        `/api/v1/user/find/${id}`,
    );

};

export const createUser = async ({username, password, role, fullName}) => {
    return await api.post(
        `/api/v1/user/create`,
        {
            username: username,
            password: password,
            role: role,
            fullName: fullName
        }
    );
};

export const deleteUser = async (id) => {
    return await api.delete(
        `/api/v1/user/delete/${id}`,
    );
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