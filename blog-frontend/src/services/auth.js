import { api } from '../config/axis.config';

export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => {
    const config = data instanceof FormData
      ? { headers: { 'Content-Type': 'multipart/form-data' } }
      : {};
    return api.post('/auth/signup', data, config);
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

