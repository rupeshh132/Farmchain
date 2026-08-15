const API_BASE = 'http://localhost:8080/api/v1/farms';

export interface Farm {
    id: string;
    farmName: string;
    state: string;
    district: string;
    village?: string;
    latitude?: number;
    longitude?: number;
    measurements?: {
        id: string;
        lengthValue: number;
        widthValue: number;
        inputUnit: string;
        areaSqft: number;
        areaSqm: number;
        areaAcre: number;
        areaHectare: number;
        areaBigha?: number;
        bighaStateVariant?: string;
    };
    soilProfile?: {
        id: string;
        soilType: string;
        phValue: number;
        nitrogenLevel: string;
        phosphorusLevel: string;
        potassiumLevel: string;
        irrigationAvailable: boolean;
        waterSource: string;
    };
}

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const createFarm = async (data: any): Promise<Farm> => {
    const response = await fetch(API_BASE, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to create farm');
    return result.data;
};

export const getFarms = async (): Promise<Farm[]> => {
    const response = await fetch(API_BASE, {
        headers: getHeaders()
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to fetch farms');
    return result.data;
};

export const submitMeasurement = async (farmId: string, data: any): Promise<Farm> => {
    const response = await fetch(`${API_BASE}/${farmId}/measurements`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to submit measurement');
    return result.data;
};

export const submitSoilProfile = async (farmId: string, data: any): Promise<Farm> => {
    const response = await fetch(`${API_BASE}/${farmId}/soil`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to submit soil profile');
    return result.data;
};
