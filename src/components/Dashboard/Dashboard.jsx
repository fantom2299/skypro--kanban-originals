import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTasks } from "../../Contexts/TaskContext";
import { useTheme } from "../../Contexts/ThemeContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import PopNewCard from "../PopNewCard/PopNewCard";
import PopBrowse from "../PopBrowse/PopBrowse";
import PopExit from "../PopExit/PopExit";

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tasks, isLoading, error, createTask, updateTask, deleteTask } = useTasks();
  const { isDarkTheme, toggleTheme } = useTheme();
  const [popup, setPopup] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  // 🔥 Следим за URL и открываем модалку если нужно
  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    if (pathSegments[1] === "task" && pathSegments[2]) {
      const taskId = pathSegments[2];
      const foundTask = tasks.find(t => String(t.id) === String(taskId));
      if (foundTask && popup !== "browse") {
        setActiveTask(foundTask);
        setPopup("browse");
      } else if (!foundTask && popup === "browse") {
        setPopup(null);
        setActiveTask(null);
        navigate("/");
      }
    }
  }, [location.pathname, tasks]);

  // 🔥 Открытие просмотра задачи
  const openBrowse = (task) => {
    setActiveTask(task);
    setPopup("browse");
    navigate(`/task/${task.id}`);
  };

  // 🔥 Закрытие модалки
  const closePopup = (newTask = null) => {
    setPopup(null);
    setActiveTask(null);
    if (newTask) {
      setActiveTask(newTask);
      setPopup("browse");
      navigate(`/task/${newTask.id}`);
    } else {
      navigate("/");
    }
  };

  // 🔥 Создание задачи
  const handleCreateTask = async (data) => {
    const result = await createTask(data);
    if (result.success) {
      closePopup(result.task);
    }
  };

  // 🔥 Обновление задачи
  const handleUpdateTask = async (updated) => {
    const result = await updateTask(updated.id, updated);
    if (result.success) {
      setActiveTask(result.task);
    }
  };

  // 🔥 Удаление задачи
  const handleDeleteTask = async (id) => {
    const result = await deleteTask(id);
    if (result.success) {
      setPopup(null);
      setActiveTask(null);
      navigate("/");
    }
  };

  // 🔥 Выход из системы
  const handleLogoutClick = () => {
    setPopup("exit");
  };

  if (isLoading) {
    return <div className="loading">Загрузка задач...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Попробовать снова</button>
      </div>
    );
  }

  return (
    <div className={`dashboard ${isDarkTheme ? "dark" : ""}`}>
      <Header
        user={user}
        onNewCard={() => setPopup("new")}
        onExit={handleLogoutClick}
        onToggleTheme={toggleTheme}
        isDarkTheme={isDarkTheme}
      />

      <Main tasks={tasks} onOpen={openBrowse} />

      {popup === "new" && (
        <PopNewCard onClose={closePopup} onCreate={handleCreateTask} />
      )}

      {popup === "browse" && activeTask && (
        <PopBrowse
          task={activeTask}
          onClose={() => closePopup(null)}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      )}

      {popup === "exit" && (
        <PopExit onConfirm={onLogout} onCancel={() => closePopup(null)} />
      )}
    </div>
  );
};

export default Dashboard;