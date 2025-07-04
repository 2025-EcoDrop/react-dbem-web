import apiClient from './apiClient';

export interface SignupRequest {
    username: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export const signup = async (data: SignupRequest) => {
    const response = await apiClient.post('/user/signup', data);
    return response.data;
};

export const login = async (data: LoginRequest) => {
    const response = await apiClient.post('/user/login', data);
    return response.data;
};

export const logout = async () => {
    await apiClient.post('/user/logout');
};
