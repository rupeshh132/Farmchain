import { API_BASE_URL } from './config';
const API_BASE = ``;

export interface DiseaseScan {
    id: string;
    cropName: string;
    imageUrl: string;
    predictedDisease: string;
    confidenceScore: number;
    recommendedAction: string;
    scannedAt: string;
}

const getHeaders = (isMultipart = false) => {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {
        'Authorization': token ? `Bearer ${token}` : ''
    };
    if (!isMultipart) {
        headers['Content-Type'] = 'application/json';
    }
    return headers;
};

export const scanDisease = async (farmId: string, cropId: string, file: File): Promise<DiseaseScan> => {
    const formData = new FormData();
    formData.append('farmId', farmId);
    formData.append('cropId', cropId);
    formData.append('file', file);

    const response = await fetch(`${API_BASE}/disease/scan`, {
        method: 'POST',
        headers: getHeaders(true),
        body: formData
    });

    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to scan image');
    return result.data;
};

export const getDiseaseScans = async (farmId: string): Promise<DiseaseScan[]> => {
    const response = await fetch(`${API_BASE}/disease/farms/${farmId}/scans`, {
        headers: getHeaders()
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to fetch scans');
    return result.data;
};
