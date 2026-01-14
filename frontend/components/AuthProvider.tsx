'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getSession, signIn, signUp, signOut } from '@/lib/better-auth-client';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize auth state from Better Auth session
    const initializeAuth = async () => {
      try {
        const session = await getSession();
        if (session?.user) {
          const userData = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name || session.user.email.split('@')[0]
          };

          setUser(userData);
          // Better Auth provides the token, but we need to get it
          // For now, we'll use the session token if available
          if (session.accessToken) {
            setToken(session.accessToken);
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth session:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth-error events from the API client
    const handleAuthError = () => {
      logout();
    };

    window.addEventListener('auth-error', handleAuthError);

    // Cleanup event listener
    return () => {
      window.removeEventListener('auth-error', handleAuthError);
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await signIn.email({
        email,
        password,
        callbackURL: '/tasks', // Redirect to tasks page after login
      });

      if (response?.user) {
        const userData = {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name || email.split('@')[0]
        };

        setUser(userData);
        if (response.accessToken) {
          setToken(response.accessToken);
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      const response = await signUp.email({
        email,
        password,
        name,
        callbackURL: '/tasks', // Redirect to tasks page after signup
      });

      if (response?.user) {
        const userData = {
          id: response.user.id,
          email: response.user.email,
          name: response.user.name || name
        };

        setUser(userData);
        if (response.accessToken) {
          setToken(response.accessToken);
        }
      }
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut();

      // Clear user and token from state and storage
      setUser(null);
      setToken(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear local state even if backend logout fails
      setUser(null);
      setToken(null);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  };

  const isAuthenticated = !!user;

  const value = {
    user,
    token,
    login,
    signup,
    logout,
    isAuthenticated
  };

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  return (
    <AuthContext.Provider value={value}>
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