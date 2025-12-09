import apiClient from "./apiClient";

export const recommendation = async (symptom: string) => {
    const res = await apiClient.post('/recommend/rag', { symptom });
    console.log(res.data);
    return res.data;
};