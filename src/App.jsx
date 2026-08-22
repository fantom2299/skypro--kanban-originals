import { useState, useEffect } from "react";
import AppRoute from "./AppRoute";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // 🔥 Проверяем, есть ли пользователь в localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsReady(true);
  }, []);

  // 🔥 Вход в систему
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

  // 🔥 Выход из системы
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AppRoute
      user={user}
      isReady={isReady}
      onLogin={handleLogin}
      onLogout={handleLogout}
    />
  );
}

export default App;
