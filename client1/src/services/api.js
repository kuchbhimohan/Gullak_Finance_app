import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export const createUserProfile = (profileData) => {
  return api.post('/user-profile', profileData);
};

export const updateUserProfile = (profileData) => {
  return api.put('/user-profile', profileData);
};

export const getUserProfile = () => {
  return api.get('/user-profile');
};

export const createIncome = (incomeData) => {
  return api.post('/income', incomeData);
};

export default api;
