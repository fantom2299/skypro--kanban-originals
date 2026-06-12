import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopUser from "../PopUser/PopUser";
import "./Header.css";



export default function Header({ onNewCard, onExit }) {
  const [userOpen, setUserOpen] = useState(false);
  const navigate = useNavigate();

  // Читаем текущего пользователя из localStorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const userName = currentUser?.name || "Гость";
  const userEmail = currentUser?.email || "";

  const handleExit = () => {
    setUserOpen(false);
    localStorage.removeItem("currentUser"); // очищаем при выходе
    onExit?.();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__block">
          <div className="header__logo">
            <img src="../../../public/assets/logo.png" alt="logo" />
          </div>
          <nav className="header__nav">
            <button className="header__btn-main-new" onClick={onNewCard}>
              Создать новую задачу
            </button>
            <span
              className="header__user"
              onClick={() => setUserOpen((o) => !o)}
            >
              {userName}
            </span>
            <PopUser
              open={userOpen}
              name={userName}
              email={userEmail}
              onClose={() => setUserOpen(false)}
              onExit={handleExit}
            />
          </nav>
        </div>
      </div>
    </header>
  );
}
