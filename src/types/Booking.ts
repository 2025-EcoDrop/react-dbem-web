type BookingStatus = 'REQUESTED' | 'IN_PROGRESS' | 'COMPLETED';

export interface Booking {
    id: number;
    content: string;
    address: string;
    region_1depth: string;
    region_2depth: string;
    region_3depth: string;
    latitude: number;
    longitude: number;
    bookerName: string;
    status: BookingStatus;
    collectorName: string;
    createdAt: Date;
    updatedAt: Date;
}