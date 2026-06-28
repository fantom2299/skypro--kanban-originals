import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./Сontexts/AuthContext";
import { useTheme } from "./Сontexts/ThemeContext";
import Signup from "./components/auth/Sign-up/Signup";
import Signin from "./components/auth/Sign-in/Signin";
import Dashboard from "./components/Dashboard/Dashboard";
import NotFound from "./components/NotFound/NotFound";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/" />;
};

const AppRoute = () => {
  const { user, logout } = useAuth();
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <Routes>
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Signin /></PublicRoute>} />
      
      <Route path="/" element={
        <PrivateRoute>
          <Dashboard 
            user={user} 
            onLogout={logout}
            isDarkTheme={isDarkTheme}
            onToggleTheme={toggleTheme}
          />
        </PrivateRoute>
      } />
      
      <Route path="/task/:id" element={
        <PrivateRoute>
          <Dashboard 
            user={user} 
            onLogout={logout}
            isDarkTheme={isDarkTheme}
            onToggleTheme={toggleTheme}
          />
        </PrivateRoute>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoute;