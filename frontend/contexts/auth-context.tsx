'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, LoginCredentials, RegisterCredentials, User } from '@/types/auth';
import { apiClient } from '@/lib/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in on initial load
    const token = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user:', e);
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      const response = await apiClient.login(credentials);

      if (response.success && response.data) {
        const responseData = response.data as { token: string; user?: User };
        // Store the token in localStorage
        localStorage.setItem('auth_token', responseData.token);

        // Store user in localStorage and state
        if (responseData.user) {
          localStorage.setItem('user', JSON.stringify(responseData.user));
          setUser(responseData.user);
        }

        return { success: true };
      } else {
        console.error('Login failed:', response.error);
        return { success: false, error: response.error || 'Login failed' };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      const response = await apiClient.register({
        email: credentials.email,
        password: credentials.password
      });

      if (response.success && response.data) {
        const responseData = response.data as { token: string; user?: User };
        // Store the token in localStorage
        localStorage.setItem('auth_token', responseData.token);

        // Store user in localStorage and state
        if (responseData.user) {
          localStorage.setItem('user', JSON.stringify(responseData.user));
          setUser(responseData.user);
        }

        return { success: true };
      } else {
        console.error('Registration failed:', response.error);
        return { success: false, error: response.error || 'Registration failed' };
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      return { success: false, error: error.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear user and token regardless of API call success
      setUser(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      setLoading(false);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      session: null,
      loading,
      login,
      register,
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};