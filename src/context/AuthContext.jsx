import { createContext, useContext, useEffect, useState } from "react";
import {
  getUserRole,
  getCurrentUser,
  getAuthToken,
  logout as authLogout,
} from "../servicesUsuarios/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getCurrentUser());
  const [token, setToken] = useState(getAuthToken());
  const [role, setRole] = useState(getUserRole());

  useEffect(() => {
    const storedUser = getCurrentUser();
    const storedToken = getAuthToken();
    const storedRole = getUserRole();

    setUser(storedUser);
    setToken(storedToken);
    setRole(storedRole);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(userData));

    setUser(userData);
    setToken(token);
    setRole(getUserRole());
  };

  const logout = () => {
    authLogout();
    setUser(null);
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
