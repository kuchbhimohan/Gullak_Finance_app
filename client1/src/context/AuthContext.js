import React, { createContext, useState, useEffect } from 'react';
import { loginUser, signupUser, logoutUser, deleteUserAccount } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await loginUser(email, password);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (name, username, email, password) => {
    const userData = await signupUser(name, username, email, password);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };


  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const deleteAccount = async () => {
    try {
      await deleteUserAccount();
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Delete account error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};