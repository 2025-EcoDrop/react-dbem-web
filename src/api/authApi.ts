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

export const checkUsername = async (username: string) => {
    const response = await apiClient.post(`/user/check-username`, { username });
    return response.data;
};

export const checkEmail = async (email: string) => {
    const response = await apiClient.post('/user/send-verification', { email });
    return response.data;
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

export const checkAuth = async () => {
    const response = await apiClient.get("/user/check");
    return response;
};