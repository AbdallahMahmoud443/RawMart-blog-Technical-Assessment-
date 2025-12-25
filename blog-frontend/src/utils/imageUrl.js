export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';
export const API_ORIGIN = new URL(API_URL).origin;
const getImageUrl = (path) => {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;

    return `${API_ORIGIN}/${path}`;
};

export default getImageUrl;