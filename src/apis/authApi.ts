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

export const sendEmail = async (email: string) => {
    const response = await apiClient.post('/send/send-verification', { email });
    return response.data;
}

export const checkVerification = async (email: string) => {
    const response = await apiClient.post('/send/get-verification', { email });
    return response.data;
}

export const checkUsername = async (username: string) => {
    const response = await apiClient.post(`/user/check-username`, { username });
    return response.data;
};

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