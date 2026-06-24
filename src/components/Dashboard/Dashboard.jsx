import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import PopNewCard from "../PopNewCard/PopNewCard";
import PopBrowse from "../PopBrowse/PopBrowse";
import PopExit from "../PopExit/PopExit";
import { INITIAL_TASKS } from "../../data/constants";

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [popup, setPopup] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const nextId = useRef(1);

  // Загружаем задачи из localStorage
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const loadTasks = () => {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks && storedTasks !== "[]") {
        const parsedTasks = JSON.parse(storedTasks);
        setTasks(parsedTasks);
        const maxId = Math.max(...parsedTasks.map(t => Number(t.id)), 0);
        nextId.current = maxId + 1;
      } else {
        localStorage.setItem("tasks", JSON.stringify(INITIAL_TASKS));
        setTasks(INITIAL_TASKS);
        const maxId = Math.max(...INITIAL_TASKS.map(t => t.id), 0);
        nextId.current = maxId + 1;
      }
    };

    loadTasks();

    const savedTheme = localStorage.getItem("darkTheme");
    if (savedTheme === "true") {
      setIsDarkTheme(true);
      document.body.classList.add("dark-theme");
    }

    setIsLoading(false);
  }, [user, navigate]);

  // Сохраняем задачи при каждом изменении
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // 🟢 Открытие просмотра задачи с ID в URL
  const openBrowse = (task) => {
    setActiveTask(task);
    setPopup("browse");
    navigate(`/task/${task.id}`); // ← ID в URL
  };

  // 🔴 Закрытие модалки - возвращаемся на главную
  const closePopup = () => {
    setPopup(null);
    setActiveTask(null);
    navigate("/"); // ← возврат на главную
  };

  const createTask = (data) => {
    const newTask = {
      ...data,
      id: nextId.current,
    };
    nextId.current += 1;
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (updated) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    setActiveTask(updated);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem("darkTheme", newTheme);
    if (newTheme) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  };

  const handleLogoutClick = () => {
    setPopup("exit");
  };

  const confirmLogout = () => {
    onLogout();
    navigate("/login");
  };

  // 🔄 Если URL содержит /task/:id, но модалка не открыта - открываем
  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    if (pathSegments[1] === "task" && pathSegments[2]) {
      const taskId = pathSegments[2];
      const foundTask = tasks.find(t => String(t.id) === String(taskId));
      if (foundTask && popup !== "browse") {
        setActiveTask(foundTask);
        setPopup("browse");
      }
    }
  }, [location.pathname, tasks]);

  if (isLoading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className={`dashboard ${isDarkTheme ? "dark" : ""}`}>
      <Header
        user={user}
        onNewCard={() => setPopup("new")}
        onExit={handleLogoutClick}
        onToggleTheme={handleToggleTheme}
        isDarkTheme={isDarkTheme}
      />

      <Main tasks={tasks} onOpen={openBrowse} />

      {popup === "new" && (
        <PopNewCard onClose={closePopup} onCreate={createTask} />
      )}

      {popup === "browse" && activeTask && (
        <PopBrowse
          task={activeTask}
          onClose={closePopup}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />
      )}

      {popup === "exit" && (
        <PopExit onConfirm={confirmLogout} onCancel={closePopup} />
      )}
    </div>
  );
};

export default Dashboard;
