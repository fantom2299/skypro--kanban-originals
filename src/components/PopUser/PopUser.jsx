import { useRef, useEffect } from "react";
import "./PopUser.css";

export default function PopUser({ open, name, email, onClose, onExit }) {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="pop-user-set" ref={ref}>
      <p className="pop-user-set__name">{name}</p>
      <p className="pop-user-set__mail">{email}</p>
      <div className="pop-user-set__theme">
        <p>Темная тема</p>
        <input type="checkbox" className="checkbox" name="checkbox" />
      </div>
      <button type="button" onClick={onExit}>
        Выйти
      </button>
    </div>
  );
}
