import { apiClient } from './client';
import type { RegisterRequest, User } from '../types/user';

export const authApi = {
    register: async (data: RegisterRequest): Promise<User> => {
        const response = await apiClient.post<User>('/api/auth/register', data);
        return response.data;
    },
};