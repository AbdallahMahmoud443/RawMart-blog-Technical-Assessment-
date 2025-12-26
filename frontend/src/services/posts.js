import { api } from '../config/axis.config';

export const postsApi = {
  getAll: () => api.get('/posts/'),
  getOne: (id) => api.get(`/posts/${id}`),
  create: (data) => api.post('/posts/create', data),
  update: (id, data) => api.put(`/posts/update/${id}`, data),
  delete: (id) => api.delete(`/posts/delete/${id}`),
};

