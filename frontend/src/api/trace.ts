const API_BASE = 'http://localhost:8080/api/v1';

export interface TraceabilityEvent {
    eventType: string;
    notes: string;
    occurredAt: string;
    actorName?: string;
}

export interface ProduceBatch {
    id: string;
    cropName: string;
    quantityKg: number;
    qrCode: string;
    status: string;
    createdAt: string;
}

export interface TraceResponse {
    qrCode: string;
    cropName: string;
    quantityKg: number;
    farmState: string;
    farmDistrict: string;
    batchCreatedAt: string;
    events: TraceabilityEvent[];
}

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const getFarmBatches = async (farmId: string): Promise<ProduceBatch[]> => {
    const response = await fetch(`${API_BASE}/farms/${farmId}/batches`, {
        headers: getHeaders()
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to fetch batches');
    return result.data;
};

export const getTraceByQrCode = async (qrCode: string): Promise<TraceResponse> => {
    const response = await fetch(`${API_BASE}/batches/${qrCode}/trace`, {
        // Public endpoint, no auth header needed
        headers: { 'Content-Type': 'application/json' }
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error?.message || 'Failed to fetch trace data');
    return result.data;
};
