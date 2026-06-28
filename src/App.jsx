import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";
import { TaskProvider } from "./Contexts/TaskContext";
import { ThemeProvider } from "./Contexts/ThemeContext";
import AppRoute from "./AppRoute";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <ThemeProvider>
            <AppRoute />
          </ThemeProvider>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;