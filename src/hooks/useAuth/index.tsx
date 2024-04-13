import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  userId: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useNavigate();

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('auth-token'); // Clear the JWT from storage
  }, []);

  const checkAuth = useCallback(async () => {
    console.log("Check auth")
    const token = localStorage.getItem('auth-token');
    if (token) {
      try {
        const response = await fetch('https://dakx4qcn5h.execute-api.us-east-1.amazonaws.com/dev/auth/login', {  // Adjust the URL to your endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Token validation failed');
        }

        const userData = await response.json();
        setUser({
          name: userData.userName, // Adjust according to the actual data structure
          email: userData.email,
          userId: userData.userId
        });
        router('/');
      } catch (error) {
        console.error("Token validation failed:", error);
        // logout();  // Clears user and token if validation fails
      }
    }
  }, [logout, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(async (userLogin: string, password: string) => {
    try {
      const response = await fetch('https://dakx4qcn5h.execute-api.us-east-1.amazonaws.com/dev/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userLogin, password })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      const { jwt, user } = data;
      localStorage.setItem('auth-token', jwt); // Store the JWT in localStorage
      setUser({
        name: user.userName,
        email: user.email,
        userId: user.userId
      });
      router('/')
    } catch (error: any) {
      console.error("Authentication failed:", error);
      alert('Authentication failed: ' + error.message);
    }
  }, [router]);


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
