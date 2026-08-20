import { API_BASE_URL } from './config';
const API_BASE = `/farms`;

export interface AnalyticsData {
    financials: {
        totalRevenue: number;
        totalExpenses: number;
        expectedProfit: number;
        expensesByCategory: Record<string, number>;
    };
    tasks: {
        totalTasks: number;
        completedTasks: number;
        pendingTasks: number;
        delayedTasks: number;
        completionRate: number;
    };
    yield: {
        expectedYieldKg: number;
        actualYieldKg: number;
    };
}

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const getFarmAnalytics = async (farmId: string): Promise<AnalyticsData> => {
    const response = await fetch(`${API_BASE}/${farmId}/analytics`, {
        headers: getHeaders()
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch analytics');
    }
    
    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to fetch analytics');
    
    return result.data;
};
