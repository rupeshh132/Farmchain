export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';
export const AI_API_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/v1', '') : 'http://localhost:8080/api';
