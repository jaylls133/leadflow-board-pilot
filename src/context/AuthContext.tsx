
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('leadflow-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

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
        localStorage.setItem('leadflow-user', JSON.stringify(userData));
        
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
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
      localStorage.setItem('leadflow-user', JSON.stringify(userData));
      
      toast({
        title: "Registration successful",
        description: "Welcome to LeadFlow!",
      });
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('leadflow-user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
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
