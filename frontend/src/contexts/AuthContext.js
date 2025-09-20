import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedUser = localStorage.getItem('casinoUser');
    const savedTheme = localStorage.getItem('casinoTheme') || 'dark';
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setTheme(savedTheme);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('casinoTheme', theme);
  }, [theme]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('casinoUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('casinoUser');
  };

  const register = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now(),
      balance: 1000,
      joinedAt: new Date().toISOString()
    };
    setUser(newUser);
    localStorage.setItem('casinoUser', JSON.stringify(newUser));
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const value = {
    user,
    isLoading,
    theme,
    login,
    logout,
    register,
    toggleTheme,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};