import apiClient from "./apiClient";

export const findProductName = async (itemName: string) => {
    console.log(itemName);
    const res = await apiClient.post('/medicine/name', { itemName });
    return res.data;
};