import axios, { AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export class ApiClientError extends Error {
    public status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.name = 'ApiClientError';
    }
}

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string }>) => {
        const status = error.response?.status ?? 0;
        const message = error.response?.data?.message ?? 'An unexpected error occurred';
        return Promise.reject(new ApiClientError(status, message));
    }
);