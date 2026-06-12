import { useState } from "react";
import { CATEGORIES } from "../../data/constants";
import Calendar from "../Calendar/Calendar";
import "./PopNewCard.css";

export default function PopNewCard({ onClose, onCreate }) {
  const [title,    setTitle]    = useState("");
  const [desc,     setDesc]     = useState("");
  const [category, setCategory] = useState("orange");
  const [date,     setDate]     = useState(null);

  const handleCreate = () => {
    if (!title.trim()) return;
    onCreate({ title: title.trim(), desc, category, date: date || "—", status: "Без статуса" });
    onClose();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="pop pop-new-card" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="pop-new-card__top">
          <h3 className="pop-new-card__ttl">Создание задачи</h3>
          <button className="pop-new-card__close" onClick={onClose}>✕</button>
        </div>

        {/* Form + Calendar */}
        <div className="pop-new-card__wrap">
          <form className="form-new" onSubmit={e => e.preventDefault()}>
            <div>
              <label htmlFor="formTitle" className="subttl">Название задачи</label>
              <input
                className="form-new__input"
                type="text"
                id="formTitle"
                placeholder="Введите название задачи..."
                autoFocus
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="textArea" className="subttl">Описание задачи</label>
              <textarea
                className="form-new__area"
                id="textArea"
                placeholder="Введите описание задачи..."
                value={desc}
                onChange={e => setDesc(e.target.value)}
              />
            </div>
          </form>
          <Calendar selectedDate={date} onSelect={setDate} />
        </div>

        {/* Categories */}
        <div className="categories pop-new-card__categories">
          <p className="categories__p subttl">Категория</p>
          <div className="categories__themes">
            {CATEGORIES.map(c => (
              <div
                key={c.id}
                className={`categories__theme ${c.colorClass}${category === c.id ? " _active-category" : ""}`}
                onClick={() => setCategory(c.id)}
              >
                <p className={c.colorClass}>{c.label}</p>
              </div>
            ))}
          </div>
        </div>

        <button className="form-new__create" onClick={handleCreate}>
          Создать задачу
        </button>
      </div>
    </div>
  );
}
