import { BookingForm } from "../types/BookingForm";
import apiClient from "./apiClient";

export const createBooking = async (booking: BookingForm) => {
    const res = await apiClient.post('/booking', booking);
    return res.data;
};

export const getBookingById = async (id: string) => {
    const res = await apiClient.get(`/booking/${id}`);
    return res.data;
};

export const updateBookingById = async (id: string, booking: BookingForm) => {
    const res = await apiClient.put(`/booking/${id}`, booking);
    return res.data;
};

export const deleteBookingById = async (id: string) => {
    const res = await apiClient.delete(`/booking/${id}`);
    return res.data;
};

export const acceptBookingById = async (id: string) => {
    const res = await apiClient.post(`/booking/${id}/accept`);
    return res.data;
};

export const completeBookingById = async (id: string) => {
    const res = await apiClient.post(`/booking/${id}/complete`);
    return res.data;
};

// category = {0:"내가 신청한 것 & 신청중", 
//             1:"내가 신청한 것 & 남이 수락(완료X)", 
//             2:"내가 신청한 것 & 남이 완료", 
//             3:"남이 신청한 것 & 내가 수락", 
//             4:"남이 신청한 것 & 내가 완료"}
// category가 3이나 4이면 sortBy는 createdA가 아닌 updatedAt으로 정렬 해야함으로 updatedAt을 값으로 받도록 설계 해야함
export const getMyBookings = async (
    category: string,
    page: number = 0,
    size: number = 10,
    sortBy: string = "createdAt",
    sortDir: string = "desc",
) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('size', size.toString());
    params.append('sortBy', sortBy.toString());
    params.append('sortDir', sortDir.toString());

    const res = await apiClient.get(`/booking/mine/${category}?${params.toString()}`);
    return res.data.content;
};