const API_BASE = 'http://localhost:8080/api/v1/auth';

export const demoLogin = async () => {
    try {
        // Try registering the demo user
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

        // Always try to login, whether register succeeded or failed (due to already exists)
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
