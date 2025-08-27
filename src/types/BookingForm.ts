export interface BookingForm {
    content: string;
    address: string;
    region_1depth: string;
    region_2depth: string;
    region_3depth: string;
    latitude: number;
    longitude: number;
}

export interface Location {
    latitude: number;
    longitude: number;
}

export interface Region {
    address: string;
    region_1depth: string;
    region_2depth: string;
    region_3depth: string;
}