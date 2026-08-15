const API_BASE = 'http://localhost:8080/api/v1';

export interface FarmingTask {
    id: string;
    taskType: string;
    title: string;
    dueDate: string;
    isCompleted: boolean;
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
