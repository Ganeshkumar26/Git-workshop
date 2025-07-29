import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token on app load
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call with demo users
    const demoUsers: User[] = [
      {
        id: '1',
        username: 'admin',
        email: 'admin@vehiclecomm.com',
        role: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        username: 'operator',
        email: 'operator@vehiclecomm.com',
        role: 'operator',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        username: 'driver',
        email: 'driver@vehiclecomm.com',
        role: 'driver',
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        username: 'supervisor',
        email: 'supervisor@vehiclecomm.com',
        role: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: '5',
        username: 'technician',
        email: 'technician@vehiclecomm.com',
        role: 'operator',
        createdAt: new Date().toISOString()
      }
    ];

    const user = demoUsers.find(u => u.username === username);
    
    if (user && password === 'password123') {
      const token = `token_${user.id}_${Date.now()}`;
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(user));
      localStorage.setItem('loginTime', new Date().toISOString());
      setUser(user);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('loginTime');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};