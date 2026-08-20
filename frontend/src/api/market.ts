import { API_BASE_URL } from './config';
const API_BASE = `${API_BASE_URL}/markets`;

export interface MarketPrice {
    marketName: string;
    state: string;
    district: string;
    cropName: string;
    minPrice: number;
    maxPrice: number;
    modalPrice: number;
    priceDate: string;
    source: string;
}

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const getLatestMarketPrice = async (cropId: string, state: string): Promise<MarketPrice | null> => {
    const response = await fetch(`${API_BASE}/prices/latest?cropId=${cropId}&state=${state}`, {
        headers: getHeaders()
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to fetch market price');
    return result.data; // Can be null if no data
};

export const triggerIngestion = async (): Promise<void> => {
    const response = await fetch(`${API_BASE}/ingest`, {
        method: 'POST',
        headers: getHeaders()
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to trigger ingestion');
};
