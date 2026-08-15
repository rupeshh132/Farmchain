import api from './axios';

export interface Notification {
    id: string;
    type: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export const getNotifications = async (): Promise<Notification[]> => {
    const response = await api.get('/api/v1/notifications');
    return response.data.data;
};

export const markNotificationAsRead = async (id: string): Promise<void> => {
    await api.put(`/api/v1/notifications/${id}/read`);
};
