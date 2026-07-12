// // src/AppRoute.jsx
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Signup from "./components/auth/Sign-up/Signup";
// import Signin from "./components/auth/Sign-in/Signin";
// import Dashboard from "./components/Dashboard/Dashboard";
// import NotFound from "./components/NotFound/NotFound";

// const PrivateRoute = ({ children }) => {
//   const currentUser = localStorage.getItem("currentUser");
//   return currentUser ? children : <Navigate to="/login" />;
// };

// const PublicRoute = ({ children }) => {
//   const currentUser = localStorage.getItem("currentUser");
//   return !currentUser ? children : <Navigate to="/" />;
// };

// const AppRoute = ({ user, onLogin, onLogout }) => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
//         <Route path="/login" element={<PublicRoute><Signin onLogin={onLogin} /></PublicRoute>} />
        
//         {/* Главная */}
//         <Route path="/" element={
//           <PrivateRoute>
//             <Dashboard user={user} onLogout={onLogout} />
//           </PrivateRoute>
//         } />


        
//         {/* 🔥 Просмотр задачи */}
//         <Route path="/task/:id" element={
//           <PrivateRoute>
//             <Dashboard user={user} onLogout={onLogout} />
//           </PrivateRoute>
//         } />
        
//         {/* 🔥🔥🔥 ДОБАВЬ ЭТОТ МАРШРУТ - редактирование задачи */}
//         <Route path="/task/:id/edit" element={
//           <PrivateRoute>
//             <Dashboard user={user} onLogout={onLogout} />
//           </PrivateRoute>
//         } />
        
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default AppRoute;





// src/AppRoute.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/auth/Sign-up/Signup";
import Signin from "./components/auth/Sign-in/Signin";
import Dashboard from "./components/Dashboard/Dashboard";
import NotFound from "./components/NotFound/NotFound";

// Модалки
import PopNewCard from "./components/PopNewCard/PopNewCard";
import PopBrowse from "./components/PopBrowse/PopBrowse";
import PopExit from "./components/PopExit/PopExit";

const PrivateRoute = ({ children }) => {
  const currentUser = localStorage.getItem("currentUser");
  return currentUser ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const currentUser = localStorage.getItem("currentUser");
  return !currentUser ? children : <Navigate to="/" />;
};

const AppRoute = ({ user, onLogin, onLogout }) => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Публичные маршруты */}
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Signin onLogin={onLogin} /></PublicRoute>} />

        {/* 🔒 Приватные маршруты */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard user={user} onLogout={onLogout} />
            </PrivateRoute>
          }
        />

        {/* 🔥 Модалка создания задачи */}
        <Route
          path="/new"
          element={
            <PrivateRoute>
              <Dashboard user={user} onLogout={onLogout}>
                <PopNewCard />
              </Dashboard>
            </PrivateRoute>
          }
        />

        {/* 🔥 Модалка просмотра задачи */}
        <Route
          path="/task/:id"
          element={
            <PrivateRoute>
              <Dashboard user={user} onLogout={onLogout}>
                <PopBrowse />
              </Dashboard>
            </PrivateRoute>
          }
        />

        {/* 🔥 Модалка редактирования задачи */}
        <Route
          path="/task/:id/edit"
          element={
            <PrivateRoute>
              <Dashboard user={user} onLogout={onLogout}>
              </Dashboard>
            </PrivateRoute>
          }
        />

        {/* 🔥 Модалка выхода */}
        <Route
          path="/exit"
          element={
            <PrivateRoute>
              <Dashboard user={user} onLogout={onLogout}>
                <PopExit />
              </Dashboard>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;