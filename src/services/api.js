import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

// JWT interceptor
api.interceptors.request.use((config) => {
    const stored = localStorage.getItem('krishisaathi_user');
    if (stored) {
        try {
            const { token } = JSON.parse(stored);
            if (token) config.headers.Authorization = `Bearer ${token}`;
        } catch { /* ignore */ }
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response?.status === 401) {
            localStorage.removeItem('krishisaathi_user');
            window.location.href = '/login';
        }
        return Promise.reject(err);
    }
);

export const authAPI = {
    login: (data) => api.post('/auth/login', data),
    signup: (data) => api.post('/auth/signup', data),
    me: () => api.get('/auth/me'),
};

export const cropAPI = {
    list: (params) => api.get('/crops', { params }),
    get: (id) => api.get(`/crops/${id}`),
    create: (data) => api.post('/crops', data),
    update: (id, data) => api.put(`/crops/${id}`, data),
    delete: (id) => api.delete(`/crops/${id}`),
};

export const marketAPI = {
    search: (params) => api.get('/market/search', { params }),
    bid: (data) => api.post('/market/bid', data),
    bids: (cropId) => api.get(`/market/bids/${cropId}`),
};

export const storeAPI = {
    products: (params) => api.get('/store/products', { params }),
    order: (data) => api.post('/store/order', data),
};

export const insuranceAPI = {
    plans: () => api.get('/insurance/plans'),
    apply: (data) => api.post('/insurance/apply', data),
};

export const chatAPI = {
    send: (data) => api.post('/chat/send', data),
    history: () => api.get('/chat/history'),
};

export default api;
