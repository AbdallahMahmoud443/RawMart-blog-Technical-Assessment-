import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: false,
});
api.interceptors.request.use(
    (config) => {
        const url = config.url || '';
        const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/signup');
        const token = localStorage.getItem('token');
        if (token && !isAuthEndpoint) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const method = (error.config?.method || '').toLowerCase();
        if (status === 401) {
            const currentPath = window.location.pathname;
            if (!currentPath.includes("/login") && !currentPath.includes("/register")) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
            }
        }
        if (status === 404 && method === 'get') {
            const currentPath = window.location.pathname;
            if (!currentPath.includes("/404")) {
                window.location.href = "/404";
            }
        }
        if (status >= 500 && status < 600) {
            const currentPath = window.location.pathname;
            if (!currentPath.includes("/500")) {
                window.location.href = "/500";
            }
        }
        return Promise.reject(error);
    }
);

