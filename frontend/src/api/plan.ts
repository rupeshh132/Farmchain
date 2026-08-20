import { API_BASE_URL } from './config';
const API_BASE = ``;

export interface FarmingTask {
    id: string;
    taskType: string;
    title: string;
    dueDate: string;
    isCompleted: boolean;
    notes?: string;
}

export interface FarmingPlan {
    id: string;
    cropId: string;
    cropName: string;
    varietyName: string;
    sowingDate: string;
    expectedHarvestDate: string;
    status: string;
    tasks: FarmingTask[];
}

export interface YieldPredictionDto {
  id: string;
  planId: string;
  predictedMinKg: number;
  predictedMaxKg: number;
  modelVersion: string;
  predictedAt: string;
}

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const createFarmingPlan = async (farmId: string, cropId: string, varietyId: string, sowingDate: string): Promise<FarmingPlan> => {
    const response = await fetch(`${API_BASE}/farms/${farmId}/plans`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ cropId, varietyId, sowingDate })
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to create plan');
    return result.data;
};

export const getActivePlan = async (farmId: string): Promise<FarmingPlan | null> => {
    const response = await fetch(`${API_BASE}/farms/${farmId}/active-plan`, {
        headers: getHeaders()
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to fetch active plan');
    return result.data;
};

export const completeTask = async (taskId: string): Promise<void> => {
    const response = await fetch(`${API_BASE}/tasks/${taskId}/complete`, {
        method: 'PUT',
        headers: getHeaders()
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to complete task');
};

export const createCustomTask = async (farmId: string, title: string, dueDate: string, notes?: string): Promise<FarmingTask> => {
    const response = await fetch(`${API_BASE}/farms/${farmId}/tasks`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ title, dueDate, notes })
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to create task');
    return result.data;
};

export const getYieldPrediction = async (planId: string): Promise<YieldPredictionDto> => {
    const response = await fetch(`${API_BASE}/plans/${planId}/yield`, {
        headers: getHeaders()
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to fetch yield prediction');
    return result.data;
};
