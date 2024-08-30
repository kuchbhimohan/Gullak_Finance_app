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
export const getAllIncomes = () => api.get('/income/all');
export const getRecentIncomes = () => api.get('/income/recent');

// Transfer
export const createTransfer = (transferData) => api.post('/transfer', transferData);
export const getAllTransfers = () => api.get('/transfer/all');
export const getRecentTransfers = () => api.get('/transfer/recent');

// Expense
export const createExpense = (expenseData) => api.post('/expense', expenseData);
export const getAllExpenses = () => api.get('/expense/all');
export const getRecentExpenses = () => api.get('/expense/recent');

// User Info
export const getUserInfo = () => api.get('/user/info');
export const getTransactionCounts = () => api.get('/user/transaction-counts');

// Combined Transactions
export const getRecentTransactions = (page = 1, limit = 5) => 
  api.get(`/transactions/recent?page=${page}&limit=${limit}`)
    .then(response => {
      // Check if the response has the expected structure
      if (response.data && response.data.transactions) {
        return response.data;
      } else if (Array.isArray(response.data)) {
        // If it's just an array, assume it's the transactions
        return { transactions: response.data, hasMore: false };
      } else {
        // If it's neither, throw an error
        throw new Error('Unexpected response format');
      }
    });
export const getAllTransactions = () => api.get('/transactions/all');

export default api;