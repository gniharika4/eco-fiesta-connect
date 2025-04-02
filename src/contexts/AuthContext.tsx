
import React, { createContext, useContext, useState, useEffect } from "react";

type UserType = 'customer' | 'vendor' | null;

interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userType: UserType;
  login: (email: string, password: string, userType: UserType) => Promise<void>;
  register: (name: string, email: string, password: string, userType: UserType) => Promise<void>;
  logout: () => void;
  setUserType: (type: UserType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  
  // Check for existing session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('ecoFiestaUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setUserType(parsedUser.userType);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem('ecoFiestaUser');
      }
    }
  }, []);

  // Mock login function (replace with real auth later)
  const login = async (email: string, password: string, type: UserType) => {
    // This would be an API call in a real app
    console.log(`Logging in as ${type} with email: ${email}`);
    
    // Simulate successful login after validation
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    
    const mockUser = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email,
      userType: type,
      profileImage: type === 'vendor' ? '/avatars/vendor-avatar.jpg' : '/avatars/customer-avatar.jpg',
    };
    
    setUser(mockUser);
    setUserType(type);
    localStorage.setItem('ecoFiestaUser', JSON.stringify(mockUser));
  };
  
  // Mock registration function
  const register = async (name: string, email: string, password: string, type: UserType) => {
    // This would be an API call in a real app
    console.log(`Registering as ${type}: ${name}, ${email}`);
    
    // Validate input
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    
    // Simulate successful registration and login
    const mockUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      userType: type,
      profileImage: type === 'vendor' ? '/avatars/vendor-avatar.jpg' : '/avatars/customer-avatar.jpg',
    };
    
    setUser(mockUser);
    setUserType(type);
    localStorage.setItem('ecoFiestaUser', JSON.stringify(mockUser));
  };
  
  const logout = () => {
    setUser(null);
    setUserType(null);
    localStorage.removeItem('ecoFiestaUser');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      userType,
      login, 
      register, 
      logout,
      setUserType
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
