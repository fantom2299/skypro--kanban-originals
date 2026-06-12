// src/AppRoute.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/auth/Sign-up/Signup";
import Signin from "./components/auth/Sign-in/Signin";
import Dashboard from "./components/Dashboard/Dashboard";
import TaskDetail from "./components/TaskDetail/TaskDetail"; // ← импорт
import NotFound from "./components/NotFound/NotFound";

const PrivateRoute = ({ children }) => {
  const currentUser = localStorage.getItem("currentUser");
  return currentUser ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const currentUser = localStorage.getItem("currentUser");
  return !currentUser ? children : <Navigate to="/" />;
};

const AppRoute = ({ user,  onLogin, onLogout }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Signin onLogin={onLogin} />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard user={user} onLogout={onLogout} />
            </PrivateRoute>
          }
        />

        {/* ← Маршрут для детальной страницы задачи */}
        <Route
          path="/task/:id"
          element={
            <PrivateRoute>
              <TaskDetail />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
