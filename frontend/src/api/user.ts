import { API_BASE_URL } from './config';
const API_BASE = `/users`;

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: string;
  preferredLanguage: string;
  profilePhotoUrl: string | null;
}

export const getMe = async (): Promise<UserProfile> => {
  const response = await fetch(`${API_BASE}/me`, {
    headers: getHeaders()
  });
  const result = await response.json();
  if (!result.success) throw new Error(result.error?.message || 'Failed to fetch user profile');
  return result.data;
};

export const uploadProfilePhoto = async (base64Image: string): Promise<UserProfile> => {
  const response = await fetch(`${API_BASE}/me/photo`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ base64Image })
  });
  const result = await response.json();
  if (!result.success) throw new Error(result.error?.message || 'Failed to upload photo');
  return result.data;
};
