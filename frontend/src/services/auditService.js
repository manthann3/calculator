import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      error.response = {
        data: {
          success: false,
          message: 'Network error. Please check your connection.',
        },
      };
    }
    return Promise.reject(error);
  }
);

export const auditService = {
  async createLog(logData) {
    const response = await api.post('/api/audit', logData);
    return response.data;
  },

  async getLogs(limit = 50, skip = 0) {
    const response = await api.get('/api/audit', {
      params: { limit, skip },
    });
    return response.data;
  },

  // async getHealth() {
  //   const response = await api.get('/api/health');
  //   return response.data;
  // },
};

export default api;
