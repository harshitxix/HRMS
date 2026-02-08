import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employee APIs
export const employeeAPI = {
  getAll: () => api.get('/api/employees'),
  create: (data) => api.post('/api/employees', data),
  delete: (employeeId) => api.delete(`/api/employees/${employeeId}`),
};

// Attendance APIs
export const attendanceAPI = {
  getAll: (params = {}) => api.get('/api/attendance', { params }),
  create: (data) => api.post('/api/attendance', data),
  getStats: (employeeId) => api.get(`/api/attendance/stats/${employeeId}`),
};

// Dashboard APIs
export const dashboardAPI = {
  getStats: () => api.get('/api/dashboard'),
};

export default api;
