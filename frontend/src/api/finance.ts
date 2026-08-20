import { API_BASE_URL } from './config';
const API_BASE = `${API_BASE_URL}/plans`;

export interface Expense {
    id: string;
    category: string;
    amount: number;
    incurredAt: string;
}

export interface Harvest {
    id: string;
    actualQuantityKg: number;
    harvestDate: string;
    qualityGrade?: string;
}

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const addExpense = async (planId: string, category: string, amount: number, incurredAt: string): Promise<Expense> => {
    const response = await fetch(`${API_BASE}/${planId}/expenses`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ category, amount, incurredAt })
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to add expense');
    return result.data;
};

export const getExpenses = async (planId: string): Promise<Expense[]> => {
    const response = await fetch(`${API_BASE}/${planId}/expenses`, {
        headers: getHeaders()
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to fetch expenses');
    return result.data;
};

export const logHarvest = async (planId: string, actualQuantityKg: number, harvestDate: string, qualityGrade?: string): Promise<Harvest> => {
    const response = await fetch(`${API_BASE}/${planId}/harvests`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ actualQuantityKg, harvestDate, qualityGrade })
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to log harvest');
    return result.data;
};
