import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

interface User {
  id: string;
  email: string;
  role: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    avatarUrl?: string;
  };
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  logout: () => Promise<void>;
  setAuth: (user: User, accessToken: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const token = await SecureStore.getItemAsync('accessToken');
      const userStr = await SecureStore.getItemAsync('user');
      if (token && userStr) {
        const user = JSON.parse(userStr);
        setState({ user, accessToken: token, isLoading: false, isAuthenticated: true });
      } else {
        setState({ user: null, accessToken: null, isLoading: false, isAuthenticated: false });
      }
    } catch {
      setState({ user: null, accessToken: null, isLoading: false, isAuthenticated: false });
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    
    await SecureStore.setItemAsync('accessToken', data.accessToken);
    await SecureStore.setItemAsync('refreshToken', data.refreshToken);
    await SecureStore.setItemAsync('user', JSON.stringify(data.user));
    
    setState({ user: data.user, accessToken: data.accessToken, isLoading: false, isAuthenticated: true });
  };

  const register = async (email: string, password: string, firstName?: string, lastName?: string) => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Registration failed');
    
    await SecureStore.setItemAsync('accessToken', data.accessToken);
    await SecureStore.setItemAsync('refreshToken', data.refreshToken);
    await SecureStore.setItemAsync('user', JSON.stringify(data.user));
    
    setState({ user: data.user, accessToken: data.accessToken, isLoading: false, isAuthenticated: true });
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    await SecureStore.deleteItemAsync('user');
    setState({ user: null, accessToken: null, isLoading: false, isAuthenticated: false });
  };

  const setAuth = (user: User, accessToken: string) => {
    setState({ user, accessToken, isLoading: false, isAuthenticated: true });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
