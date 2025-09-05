import apiClient from "./apiClient";

export const getMyPointInfo = async () => {
    const res = await apiClient.get('/point/my');
    console.log(res.data);
    return res.data;
};

export const getMyPointRecords = async () => {
    const res = await apiClient.get('/point/record');
    console.log(res.data);
    return res.data;
};