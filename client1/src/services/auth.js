import api from './api';

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const signupUser = async (name, username, email, password) => {
  try {
    const response = await api.post('/auth/signup', { name, username, email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Signup error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error.response ? error.response.data : error.message);
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
};

export const deleteUserAccount = async () => {
  try {
    await api.delete('/auth/delete-account');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  } catch (error) {
    console.error('Delete account error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/current-user');
    return response.data;
  } catch (error) {
    console.error('Get current user error:', error.response ? error.response.data : error.message);
    throw error;
  }
};