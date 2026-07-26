import axios, { AxiosError } from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const refreshToken = await SecureStore.getItemAsync('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
          const { accessToken, refreshToken: newRefresh } = response.data;
          await SecureStore.setItemAsync('accessToken', accessToken);
          await SecureStore.setItemAsync('refreshToken', newRefresh);
          
          // Retry original request
          error.config!.headers.Authorization = `Bearer ${accessToken}`;
          return api(error.config!);
        } catch {
          await SecureStore.deleteItemAsync('accessToken');
          await SecureStore.deleteItemAsync('refreshToken');
        }
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  register: (data: { email: string; password: string; firstName?: string; lastName?: string }) => api.post('/auth/register', data),
  refresh: (refreshToken: string) => api.post('/auth/refresh', { refreshToken }),
  logout: () => api.post('/auth/logout'),
};

export const userApi = {
  getMe: () => api.get('/users/me'),
  updateMe: (data: any) => api.patch('/users/me', data),
  getStats: () => api.get('/users/me/stats'),
};

export const clothingApi = {
  getAll: (params?: { page?: number; limit?: number; search?: string; categoryId?: string }) => api.get('/clothing', { params }),
  getOne: (id: string) => api.get(`/clothing/${id}`),
  create: (data: any) => api.post('/clothing', data),
  update: (id: string, data: any) => api.patch(`/clothing/${id}`, data),
  delete: (id: string) => api.delete(`/clothing/${id}`),
  getCategories: () => api.get('/clothing/categories'),
  getColors: () => api.get('/clothing/colors'),
  getBrands: (search?: string) => api.get('/clothing/brands', { params: { search } }),
};

export const outfitApi = {
  getAll: (params?: { page?: number; occasion?: string }) => api.get('/outfits', { params }),
  getOne: (id: string) => api.get(`/outfits/${id}`),
  create: (data: any) => api.post('/outfits', data),
  delete: (id: string) => api.delete(`/outfits/${id}`),
  markAsWorn: (id: string) => api.post(`/outfits/${id}/wear`),
};

export const aiApi = {
  recommendOutfit: (data: { occasion?: string; weather?: string; season?: string }) => api.post('/ai/recommend-outfit', data),
  chat: (message: string) => api.post('/ai/chat', { message }),
};

export default api;
