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
      window.location.href = '/login';
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
      if (response.data && response.data.transactions) {
        return response.data;
      } else if (Array.isArray(response.data)) {
        return { transactions: response.data, hasMore: false };
      } else {
        throw new Error('Unexpected response format');
      }
    });
export const getAllTransactions = () => api.get('/transactions/all');

// Dashboard
export const getMonthlyFinancialData = (year) => api.get(`/dashboard/monthly-financial-data?year=${year}`);
export const getFinancialDistribution = (year, month) => api.get(`/dashboard/financial-distribution?year=${year}&month=${month}`);
export const getIncomeVsExpenditure = (startDate, endDate) => 
  api.get(`/dashboard/income-vs-expenditure?startDate=${startDate}&endDate=${endDate}`);
// Add this line to your existing api.js file
export const logoutUser = () => api.post('/auth/logout');
export default api;