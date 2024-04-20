import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SnackBar from "../../components/Snackbar";
import { AuthContextType, User } from "../../template/a/interfaces";

// Define user and context types
const AUTH_ENDPOINT =
  "https://dakx4qcn5h.execute-api.us-east-1.amazonaws.com/dev/auth/login";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const location = useLocation();
  const clearError = useCallback(() => {
    setErrorMessage("");
    setErrorOpen(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("auth-token"); // Clear the JWT from storage
    clearError();
  }, [clearError]);

  const router = useNavigate();
  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      try {
        const response = await fetch(AUTH_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Token validation failed");
        }

        const userData = await response.json();
        setUser({
          name: userData.userName,
          email: userData.email,
          userId: userData.userId,
        });
        if (location.pathname === "/login")
          router(location.state?.from?.pathname || "/");
      } catch (error) {
        console.error("Token validation failed:", error);
        setErrorMessage("Session has expired. Please log in again.");
        logout();
      }
    }
  }, [location.pathname, location.state?.from?.pathname, logout, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(
    async (userLogin: string, password: string) => {
      try {
        const response = await fetch(AUTH_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userLogin, password }),
        });

        if (!response.ok) {
          throw new Error("Login failed. Check your credentials.");
        }

        const data = await response.json();
        localStorage.setItem("auth-token", data.jwt);
        setUser({
          name: data.user.userName,
          email: data.user.email,
          userId: data.user.userId,
        });
        router("/");
      } catch (error: any) {
        console.error("Authentication failed:", error);
        setErrorMessage(error.message);
      }
    },
    [router]
  );

  return (
    <AuthContext.Provider
      value={{ user, login, logout, errorMessage, clearError }}
    >
      <SnackBar
        type={errorMessage ? "error" : "success"}
        open={errorOpen}
        message={errorMessage}
        handleClose={clearError}
      />
      {children}
    </AuthContext.Provider>
  );
};
