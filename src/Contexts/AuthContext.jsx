// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../api/authAPI";

// 🔥 Создаём контекст
const AuthContext = createContext(null);

// 🔥 Хук для использования контекста
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// 🔥 Провайдер
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔥 Проверяем, есть ли пользователь в localStorage
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("currentUser");

        if (token && storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Ошибка проверки авторизации:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 🔥 Вход в систему
  const login = async (credentials) => {
    try {
      const result = await authAPI.login(credentials);
      
      if (result.user) {
        const userData = result.user;
        localStorage.setItem("token", userData.token);
        localStorage.setItem("currentUser", JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true, user: userData };
      }
      
      return { success: false, error: "Неверный логин или пароль" };
    } catch (error) {
      console.error("Ошибка входа:", error);
      return { success: false, error: error.message };
    }
  };

  // 🔥 Регистрация
  const register = async (userData) => {
    try {
      const result = await authAPI.register(userData);
      return { success: true, data: result };
    } catch (error) {
      console.error("Ошибка регистрации:", error);
      return { success: false, error: error.message };
    }
  };

  // 🔥 Выход из системы
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;