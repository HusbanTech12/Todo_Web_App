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
    if (token) {
      // We could verify the token here if needed
      // For now, we'll just set the loading state appropriately
    }
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await apiClient.login(credentials);

      if (response.success && response.data) {
        const responseData = response.data as { token: string; user?: User };
        // Store the token in localStorage
        localStorage.setItem('auth_token', responseData.token);

        // Set the user if available in response
        if (responseData.user) {
          setUser(responseData.user);
        }

        return true;
      } else {
        console.error('Login failed:', response.error);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<boolean> => {
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

        // Set the user if available in response
        if (responseData.user) {
          setUser(responseData.user);
        }

        return true;
      } else {
        console.error('Registration failed:', response.error);
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      return false;
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
      setLoading(false);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      session: null, // Will be populated when we have more session data
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