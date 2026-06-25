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

  // 🔥 Ключ для хранения задач
  const getTasksKey = () => {
    return user?.id ? `tasks_${user.id}` : 'tasks';
  };

  // Загружаем задачи
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const loadTasks = () => {
      const key = getTasksKey();
      console.log('📂 Загружаем задачи по ключу:', key);
      
      const storedTasks = localStorage.getItem(key);
      console.log('📂 Найденные данные:', storedTasks);
      
      if (storedTasks && storedTasks !== "[]") {
        const parsedTasks = JSON.parse(storedTasks);
        setTasks(parsedTasks);
        const maxId = Math.max(...parsedTasks.map(t => Number(t.id)), 0);
        nextId.current = maxId + 1;
        console.log('✅ Загружено задач:', parsedTasks.length);
      } else {
        console.log('⚠️ Нет задач, создаём начальные');
        localStorage.setItem(key, JSON.stringify(INITIAL_TASKS));
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

  // 🔥 Сохраняем задачи при каждом изменении
  useEffect(() => {
    const key = getTasksKey();
    console.log('💾 Сохранение задач в ключ:', key);
    console.log('💾 Количество задач:', tasks.length);
    
    // Сохраняем ВСЕГДА (даже если задач нет)
    localStorage.setItem(key, JSON.stringify(tasks));
    console.log('💾 Задачи сохранены');
  }, [tasks]);

  const openBrowse = (task) => {
    setActiveTask(task);
    setPopup("browse");
    navigate(`/task/${task.id}`);
  };

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

  // 🔥 ИСПРАВЛЕНО: Создание задачи
  const createTask = (data) => {
    console.log('📝 Создание задачи с данными:', data);
    console.log('📝 Текущий nextId:', nextId.current);
    
    // Создаём задачу с ID первым
    const newTask = {
      id: nextId.current,
      ...data,
      userId: user.id,
      createdAt: new Date().toISOString(),
    };
    
    // Увеличиваем nextId
    nextId.current += 1;
    console.log('📝 Новый nextId:', nextId.current);
    
    // Обновляем состояние
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks, newTask];
      console.log('📋 Обновлённый список задач:', updatedTasks);
      
      // 🔥 Принудительно сохраняем в localStorage
      const key = getTasksKey();
      localStorage.setItem(key, JSON.stringify(updatedTasks));
      console.log('💾 Принудительно сохранено в localStorage');
      
      return updatedTasks;
    });
    
    console.log('✅ Задача создана:', newTask);
    return newTask;
  };

  // Обновление задачи
  const updateTask = (updated) => {
    console.log('✏️ Обновление задачи:', updated);
    setTasks((prev) => {
      const updatedTasks = prev.map((t) => (t.id === updated.id ? updated : t));
      
      // Принудительно сохраняем
      const key = getTasksKey();
      localStorage.setItem(key, JSON.stringify(updatedTasks));
      
      return updatedTasks;
    });
    setActiveTask(updated);
  };

  // Удаление задачи
  const deleteTask = (id) => {
    console.log('🗑 Удаление задачи с ID:', id);
    setTasks((prev) => {
      const updatedTasks = prev.filter((t) => t.id !== id);
      
      // Принудительно сохраняем
      const key = getTasksKey();
      localStorage.setItem(key, JSON.stringify(updatedTasks));
      
      return updatedTasks;
    });
    setPopup(null);
    setActiveTask(null);
    navigate("/");
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