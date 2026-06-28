// src/contexts/TaskContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { kanbanAPI } from "../api/kanbanAPI";
import { useAuth } from "./AuthContext";

// 🔥 Создаём контекст
const TaskContext = createContext(null);

// 🔥 Хук для использования контекста
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within TaskProvider");
  }
  return context;
};

// 🔥 Провайдер
export const TaskProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔥 Загружаем задачи с сервера
  const loadTasks = async () => {
    if (!isAuthenticated || !user) {
      setTasks([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await kanbanAPI.getAll();
      setTasks(data);
    } catch (err) {
      console.error("Ошибка загрузки задач:", err);
      setError(err.message || "Не удалось загрузить задачи");
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔥 Загружаем задачи при монтировании и изменении пользователя
  useEffect(() => {
    loadTasks();
  }, [isAuthenticated, user]);

  // 🔥 Создание задачи
  const createTask = async (taskData) => {
    try {
      setError(null);
      const newTask = await kanbanAPI.create(taskData);
      setTasks((prev) => [...prev, newTask]);
      return { success: true, task: newTask };
    } catch (err) {
      console.error("Ошибка создания задачи:", err);
      setError(err.message || "Не удалось создать задачу");
      return { success: false, error: err.message };
    }
  };

  // 🔥 Обновление задачи
  const updateTask = async (id, taskData) => {
    try {
      setError(null);
      const updatedTask = await kanbanAPI.update(id, taskData);
      setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      return { success: true, task: updatedTask };
    } catch (err) {
      console.error("Ошибка обновления задачи:", err);
      setError(err.message || "Не удалось обновить задачу");
      return { success: false, error: err.message };
    }
  };

  // 🔥 Удаление задачи
  const deleteTask = async (id) => {
    try {
      setError(null);
      await kanbanAPI.delete(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      return { success: true };
    } catch (err) {
      console.error("Ошибка удаления задачи:", err);
      setError(err.message || "Не удалось удалить задачу");
      return { success: false, error: err.message };
    }
  };

  const value = {
    tasks,
    isLoading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    setTasks,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;