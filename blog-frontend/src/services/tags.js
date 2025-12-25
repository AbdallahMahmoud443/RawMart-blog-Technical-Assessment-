import { api } from '../config/axis.config';

export const tagsApi = {
  getAll: () => api.get('/tags/'),
};

