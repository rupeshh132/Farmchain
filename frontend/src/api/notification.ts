import { API_BASE_URL } from './config';
const API_BASE = `${API_BASE_URL}/notifications`;

export interface Notification {
    id: string;
    type: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const getNotifications = async (): Promise<Notification[]> => {
    const response = await fetch(API_BASE, { headers: getHeaders() });
    if (!response.ok) throw new Error('Failed to fetch notifications');
    const data = await response.json();
    return data.data || [];
};

export const markNotificationAsRead = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE}/${id}/read`, {
        method: 'PUT',
        headers: getHeaders()
    });
    if (!response.ok) throw new Error('Failed to mark notification as read');
};
