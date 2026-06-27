import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import PopNewCard from "../PopNewCard/PopNewCard";
import PopBrowse from "../PopBrowse/PopBrowse";
import PopExit from "../PopExit/PopExit";
import { kanbanAPI } from "../../api/kanbanAPI";

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [popup, setPopup] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  // 🔥 ЗАГРУЗКА ЗАДАЧ С СЕРВЕРА
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const loadTasks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        
        const data = await kanbanAPI.getAll();
        
        
        setTasks(data);
      } catch (err) {
        
        setError(err.message || 'Не удалось загрузить задачи');
        setTasks([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();

    const savedTheme = localStorage.getItem("darkTheme");
    if (savedTheme === "true") {
      setIsDarkTheme(true);
      document.body.classList.add("dark-theme");
    }
  }, [user, navigate]);

  // Открытие просмотра задачи
  const openBrowse = (task) => {
    setActiveTask(task);
    setPopup("browse");
    navigate(`/task/${task.id}`);
  };

  // Закрытие модалки
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

  // 🔥 СОЗДАНИЕ ЗАДАЧИ
  const createTask = async (data) => {
    try {
      
      const newTask = await kanbanAPI.create(data);
      
      
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    } catch (err) {
      
      setError(err.message || 'Не удалось создать задачу');
      throw err;
    }
  };

  // 🔥 ОБНОВЛЕНИЕ ЗАДАЧИ
  const updateTask = async (updated) => {
  try {
    
    const updatedTask = await kanbanAPI.update(updated.id, updated);
    
    
    // Обновляем задачу в списке
    // setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    // setActiveTask(updatedTask);
  } catch (err) {
    
    setError(err.message || 'Не удалось обновить задачу');
    throw err; // пробрасываем ошибку в PopBrowse
  }
};

  // 🔥 УДАЛЕНИЕ ЗАДАЧИ
  const deleteTask = async (id) => {
    try {
      console.log('🗑 Удаление задачи...');
      await kanbanAPI.delete(id);
      console.log('✅ Задача удалена');
      
      setTasks((prev) => prev.filter((t) => t.id !== id));
      setPopup(null);
      setActiveTask(null);
      navigate("/");
    } catch (err) {
      console.error('❌ Ошибка удаления задачи:', err);
      setError(err.message || 'Не удалось удалить задачу');
    }
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

  // Если URL содержит /task/:id, но модалка не открыта - открываем
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

  // if (isLoading) {
  //   return <div className="loading">Загрузка задач...</div>;
  // }

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
          onClose={() => closePopup(null)}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />
      )}

      {popup === "exit" && (
        <PopExit onConfirm={confirmLogout} onCancel={() => closePopup(null)} />
      )}
    </div>
  );
};

export default Dashboard;