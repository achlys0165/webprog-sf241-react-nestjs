import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Profile
export const getProfile = () => api.get('/profile').then(r => r.data);
export const updateProfile = (data: any) => api.put('/profile', data).then(r => r.data);

// Guestbook
export const getEntries = () => api.get('/guestbook').then(r => r.data);
export const createEntry = (data: any) => api.post('/guestbook', data).then(r => r.data);
export const updateEntry = (id: string, data: any) => api.put(`/guestbook/${id}`, data).then(r => r.data);
export const deleteEntry = (id: string) => api.delete(`/guestbook/${id}`).then(r => r.data);
