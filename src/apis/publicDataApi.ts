import apiClient from "./apiClient";

export const findProductName = async (itemName: string) => {
    const res = await apiClient.post('/medicine/name', { itemName });
    return res.data;
};