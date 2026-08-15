const API_BASE = 'http://localhost:8080/api/v1/farms';

export interface CalculatorRequirement {
    knowledgeType: string;
    perHectareValue: number;
    totalRequiredValue: number;
    unit: string;
    sourceName: string;
    sourceUrl: string;
}

export interface CalculatorResponse {
    farmId: string;
    cropId: string;
    cropName: string;
    farmAreaHectare: number;
    requirements: CalculatorRequirement[];
}

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const calculateRequirements = async (farmId: string, cropId: string): Promise<CalculatorResponse> => {
    const response = await fetch(`${API_BASE}/${farmId}/calculator?cropId=${cropId}`, {
        headers: getHeaders()
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to calculate requirements');
    return result.data;
};
