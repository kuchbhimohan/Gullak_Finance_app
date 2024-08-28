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

// User Profile
export const createUserProfile = (profileData) => api.post('/user-profile', profileData);
export const updateUserProfile = (profileData) => api.put('/user-profile', profileData);
export const getUserProfile = () => api.get('/user-profile');

// Income
export const createIncome = (incomeData) => api.post('/income', incomeData);
export const getAllIncomes = () => api.get('/income');
export const getIncome = (id) => api.get(`/income/${id}`);
export const updateIncome = (id, incomeData) => api.put(`/income/${id}`, incomeData);
export const deleteIncome = (id) => api.delete(`/income/${id}`);

// Transfer
export const createTransfer = (transferData) => api.post('/transfer', transferData);
export const getAllTransfers = () => api.get('/transfer');
export const getTransfer = (id) => api.get(`/transfer/${id}`);
export const updateTransfer = (id, transferData) => api.put(`/transfer/${id}`, transferData);
export const deleteTransfer = (id) => api.delete(`/transfer/${id}`);

// Expense
export const createExpense = (expenseData) => api.post('/expense', expenseData);
export const getAllExpenses = () => api.get('/expense');
export const getExpense = (id) => api.get(`/expense/${id}`);
export const updateExpense = (id, expenseData) => api.put(`/expense/${id}`, expenseData);
export const deleteExpense = (id) => api.delete(`/expense/${id}`);

export default api;