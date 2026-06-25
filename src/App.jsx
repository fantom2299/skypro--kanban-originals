import { useState, useEffect } from "react";
import AppRoute from "./AppRoute";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsReady(true);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
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
