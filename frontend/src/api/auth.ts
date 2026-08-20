import { API_BASE_URL } from './config';
const API_BASE = `/auth`;

export const login = async (data: any) => {
    const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || 'Login failed');
    }
    return result;
};

export const register = async (data: any) => {
    const response = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
    }
    return result;
};

export const firebaseLogin = async (firebaseToken: string, fullName?: string, phone?: string, role?: string) => {
    const response = await fetch(`${API_BASE}/firebase-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firebaseToken, fullName, phone, role })
    });
    
    const result = await response.json();
    if (!response.ok) {
        throw new Error(result.message || 'Firebase login failed');
    }
    return result;
};

// Deprecated: Keeping just in case something breaks while migrating, but we shouldn't use it.
export const demoLogin = async () => {
    try {
        await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'demo@farmchain.com',
                password: 'password123',
                fullName: 'Demo Farmer',
                role: 'FARMER',
                phone: '9999999999'
            })
        });

        const loginRes = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'demo@farmchain.com',
                password: 'password123'
            })
        });

        const data = await loginRes.json();
        if (data.success && data.data.accessToken) {
            localStorage.setItem('token', data.data.accessToken);
            return true;
        }
        return false;
    } catch (e) {
        console.error('Demo login failed', e);
        return false;
    }
};
