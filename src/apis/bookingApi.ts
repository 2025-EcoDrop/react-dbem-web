import { Booking } from "../types/Booking";
import apiClient from "./apiClient";

export const createBooking = async (booking: Booking) => {
    console.log(booking);
    const res = await apiClient.post('/booking', booking);
    return res.data;
};