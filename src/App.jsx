import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Signup from "./components/auth/Sign-up/Signup";
import Signin from "./components/auth/Sign-in/Signin";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.css";

const PrivateRoute = ({ children, isReady, user }) => {
  if (!isReady) return null;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadUser = () => {
      const stored = localStorage.getItem("currentUser");
      if (stored) {
        setUser(JSON.parse(stored));
      }
      setIsReady(true);
    };

    loadUser();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin onLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              <PrivateRoute isReady={isReady} user={user}>
                <Dashboard user={user} onLogout={handleLogout} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;