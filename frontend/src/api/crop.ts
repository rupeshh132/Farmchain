import { API_BASE_URL } from './config';
const API_BASE = `/crops`;

export interface Crop {
    id: string;
    name: string;
    scientificName: string;
    category: string;
}

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const getCrops = async (): Promise<Crop[]> => {
    const response = await fetch(API_BASE, {
        headers: getHeaders()
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to fetch crops');
    return result.data;
};
