import { api } from '../config/axis.config';

export const commentsApi = {
    create: (data) => api.post('/comments/', data),
    update: (id, data) => api.put(`/comments/update/${id}`, data),
    delete: (id) => api.delete(`/comments/delete/${id}`),
};

