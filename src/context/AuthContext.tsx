
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'leadflow-user';
const USER_EXPIRY_KEY = 'leadflow-user-expiry';
const RETENTION_DAYS = 30;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is logged in from localStorage and if session is still valid
    const loadUserData = () => {
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      const expiryDate = localStorage.getItem(USER_EXPIRY_KEY);
      
      if (storedUser && expiryDate) {
        // Check if the user data has expired
        const now = new Date();
        const expiry = new Date(expiryDate);
        
        if (now < expiry) {
          // User session is still valid
          setUser(JSON.parse(storedUser));
        } else {
          // User session has expired, log out
          setUser(null);
          localStorage.removeItem(USER_STORAGE_KEY);
          localStorage.removeItem(USER_EXPIRY_KEY);
        }
      }
      setLoading(false);
    };

    loadUserData();
  }, []);

  // Helper to set a new expiry date (30 days from now)
  const setNewExpiry = () => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + RETENTION_DAYS);
    localStorage.setItem(USER_EXPIRY_KEY, expiryDate.toISOString());
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, you'd make an API call here
    try {
      setLoading(true);
      
      // Mock authentication - in a real app this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation (in a real app, the server would validate)
      if (email === 'user@example.com' && password === 'password') {
        const userData: User = {
          id: '1',
          name: 'Demo User',
          email: 'user@example.com',
        };
        
        setUser(userData);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        setNewExpiry();
        
        toast.success("Login successful", {
          description: "Welcome back!"
        });
        
        return true;
      } else {
        toast.error("Login failed", {
          description: "Invalid email or password"
        });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login error", {
        description: "An unexpected error occurred"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // In a real app, you'd make an API call here
    try {
      setLoading(true);
      
      // Mock registration - in a real app this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, the server would validate and store the user
      const userData: User = {
        id: Date.now().toString(),
        name,
        email,
      };
      
      setUser(userData);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      setNewExpiry();
      
      toast.success("Registration successful", {
        description: "Welcome to LeadFlow!"
      });
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error("Registration failed", {
        description: "An unexpected error occurred"
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(USER_EXPIRY_KEY);
    toast.success("Logged out", {
      description: "You have been logged out successfully"
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
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
