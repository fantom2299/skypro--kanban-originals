import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Сontexts/AuthContext";
import { TaskProvider } from "./Сontexts/TaskContext";
import { ThemeProvider } from "./Сontexts/ThemeContext";
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