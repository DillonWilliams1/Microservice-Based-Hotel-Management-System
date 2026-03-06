import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ id: 'default', name: 'Admin User', email: 'admin@hotel.com' });
  const [token, setToken] = useState('default-token');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Keep default authentication active
    setUser({ id: 'default', name: 'Admin User', email: 'admin@hotel.com' });
    setToken('default-token');
  }, []);

  const login = (tokenData, userData) => {
    setToken(tokenData);
    setUser(userData);
  };

  const logout = () => {
    setToken('default-token');
    setUser({ id: 'default', name: 'Admin User', email: 'admin@hotel.com' });
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
