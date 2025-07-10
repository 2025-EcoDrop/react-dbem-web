import apiClient from './apiClient';

export interface ReviewRequest {
    productName: string;
    review: string;
    rating: number;
}

export const createReview = async (request: ReviewRequest) => {
    const res = await apiClient.post('/review', request);
    return res.data;
};

export const getReviews = async (
    search?: string,
    page: number = 0,
    size: number = 10,
    sortBy: string = "createdAt",
    sortDir: string = "desc",
) => {
    const params = new URLSearchParams();
    if (search) params.append('kw', search);
    params.append('page', page.toString());
    params.append('size', size.toString());
    params.append('sortBy', sortBy.toString());
    params.append('sortDir', sortDir.toString());

    const res = await apiClient.get(`/review?${params.toString()}`);
    return res.data.content;
};

export const getReviewById = async (id: string) => {
    const res = await apiClient.get(`/review/${id}`);
    return res.data;
};

export const editReviewById = async (id: string, request: ReviewRequest) => {
    const res = await apiClient.put(`/review/${id}`, request);
    return res.data;
};

export const deleteReviewById = async (id: string) => {
    const res = await apiClient.delete(`/review/${id}`);
    return res.data;
};