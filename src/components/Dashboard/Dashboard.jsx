import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import PopNewCard from "../PopNewCard/PopNewCard";
import PopBrowse from "../PopBrowse/PopBrowse";
import PopExit from "../PopExit/PopExit";
import SkeletonBoard from "../SkeletonBoard/SkeletonBoard";
import { INITIAL_TASKS } from "../../data/constants";

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [popup, setPopup] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const nextId = useRef(Math.max(...INITIAL_TASKS.map((t) => t.id), 0) + 1);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const savedTheme = localStorage.getItem("darkTheme");
    if (savedTheme === "true") {
      setIsDarkTheme(true);
      document.body.classList.add("dark-theme");
    }

    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [user, navigate]);

  const openBrowse = (task) => {
    setActiveTask(task);
    setPopup("browse");
  };
  const closePopup = () => {
    setPopup(null);
    setActiveTask(null);
  };
  const createTask = (data) => {
    setTasks((prev) => [...prev, { ...data, id: nextId.current++ }]);
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
    localStorage.setItem("darkTheme", String(newTheme));
    document.body.classList.toggle("dark-theme", newTheme);
  };

  const confirmLogout = () => {
    onLogout();
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="wrapper">
        <Header
          user={user}
          onNewCard={() => {}}
          onExit={() => {}}
          onToggleTheme={() => {}}
          isDarkTheme={isDarkTheme}
        />
        <SkeletonBoard />
      </div>
    );
  }

  return (
    <div className={`wrapper ${isDarkTheme ? "dark" : ""}`}>
      <Header
        user={user}
        onNewCard={() => setPopup("new")}
        onExit={() => setPopup("exit")}
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