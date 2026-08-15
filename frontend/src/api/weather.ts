const API_BASE = 'http://localhost:8080/api/v1/farms';

export interface WeatherSummary {
    forecastDate: string;
    temperatureC: number;
    humidityPct: number;
    rainfallMm: number;
    windKmph: number;
    source: string;
}

export interface AlertSummary {
    id: string;
    alertType: string;
    message: string;
    severity: string;
    triggeredAt: string;
}

export interface DashboardWeatherResponse {
    forecast: WeatherSummary[];
    activeAlerts: AlertSummary[];
}

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const getFarmWeather = async (farmId: string): Promise<DashboardWeatherResponse> => {
    const response = await fetch(`${API_BASE}/${farmId}/weather`, {
        headers: getHeaders()
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to fetch weather');
    return result.data;
};
