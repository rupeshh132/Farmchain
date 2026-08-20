import { API_BASE_URL } from './config';
const API_BASE = `/farms`;

export interface CropRecommendation {
    cropId: string;
    cropName: string;
    varietyId: string;
    varietyName: string;
    suitabilityScore: number;
    matchReasons: string[];
}

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const getCropRecommendations = async (farmId: string): Promise<CropRecommendation[]> => {
    const response = await fetch(`${API_BASE}/${farmId}/recommendations`, {
        headers: getHeaders()
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to fetch recommendations');
    return result.data;
};
