"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import * as AuthService from "./services/auth-service";
import { User } from "./services/user-service";

// Define authentication context interface
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  error: null,
  login: async () => {},
  logout: async () => {},
  isAuthenticated: false,
  isAdmin: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if the user is authenticated on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("accessToken");
      
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const { user } = await AuthService.getProfile(token);
        setUser(user);
      } catch (err) {
        console.error("Error checking auth status:", err);
        // If token is invalid, clear it
        localStorage.removeItem("accessToken");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await AuthService.login({ email, password });
      
      // Validate the response data structure
      if (!data || !data.tokens || !data.tokens.accessToken) {
        throw new Error("Invalid response from server. Missing authentication token.");
      }
      
      // Save token to local storage
      localStorage.setItem("accessToken", data.tokens.accessToken);
      
      // Set user in context
      setUser(data.user);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("accessToken");

    try {
      if (token) {
        await AuthService.logout(token);
      }
    } catch (err) {
      console.error("Error during logout:", err);
    } finally {
      localStorage.removeItem("accessToken");
      setUser(null);
      setIsLoading(false);
      router.push("/login");
    }
  };

  // Derived state
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);