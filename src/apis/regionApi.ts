import apiClient from "./apiClient";

export const getCities = async () => {
    const res = await apiClient.get('/region/city');
    return res.data;
};

export const getDistrict = async (city: string) => {
    const res = await apiClient.get(`/region/${city}/district`);
    return res.data;
};

export const getTown = async (city: string, district: string) => {
    const res = await apiClient.get(`/region/${city}/${district}/town`);
    return res.data;
};