import api from './api';

export const loginUser = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
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

export const logoutUser = () => {
  localStorage.removeItem('token');
  // You might want to add some additional logout logic here
};