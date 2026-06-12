import { useState } from "react";
import { CATEGORIES, STATUSES } from "../../data/constants";
import Calendar from "../Calendar/Calendar";
import "./PopBrowse.css";

export default function PopBrowse({ task, onClose, onUpdate, onDelete }) {
  const [editMode, setEditMode] = useState(false);
  const [desc, setDesc] = useState(task.desc || "");
  const [status, setStatus] = useState(task.status);
  const [date, setDate] = useState(task.date === "—" ? null : task.date);

  const cat = CATEGORIES.find((c) => c.id === task.category) || CATEGORIES[0];

  const handleSave = () => {
    const updatedTask = {
      ...task,
      desc,
      status,
      date: date || "—",
    };
    onUpdate(updatedTask); // ← обновляем через пропс
    setEditMode(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
    onClose();
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="pop pop-browse" onClick={(e) => e.stopPropagation()}>
        {/* Title + Category */}
        <div className="pop-browse__top-block">
          <h3 className="pop-browse__ttl">{task.title}</h3>
          <div
            className={`categories__theme ${cat.colorClass} _active-category theme-top`}
          >
            <p className={cat.colorClass}>{cat.label}</p>
          </div>
        </div>

        {/* Status */}
        <div className="pop-browse__status status">
          <p className="status__p subttl">Статус</p>
          <div className="status__themes">
            {STATUSES.map((s) => (
              <div
                key={s}
                className={`status__theme${status === s ? " _gray" : ""}`}
                onClick={() => setStatus(s)}
              >
                <p>{s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Description + Calendar */}
        <div className="pop-browse__wrap">
          <form
            className="pop-browse__form form-browse"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label htmlFor="textArea01" className="subttl">
                Описание задачи
              </label>
              <textarea
                className="form-browse__area"
                id="textArea01"
                readOnly={!editMode}
                placeholder="Введите описание задачи..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </form>
          <Calendar
            selectedDate={date}
            onSelect={editMode ? setDate : undefined}
          />
        </div>

        {/* Category (bottom) */}
        <div className="theme-down__categories theme-down">
          <p className="categories__p subttl">Категория</p>
          <div
            className={`categories__theme ${cat.colorClass} _active-category`}
          >
            <p className={cat.colorClass}>{cat.label}</p>
          </div>
        </div>

        {/* Buttons */}
        {!editMode ? (
          <div className="pop-browse__btn-browse">
            <div className="btn-group">
              <button className="_btn-bor" onClick={() => setEditMode(true)}>
                Редактировать задачу
              </button>
              <button className="_btn-bor" onClick={handleDelete}>
                Удалить задачу
              </button>
            </div>
            <button className="_btn-bg" onClick={onClose}>
              Закрыть
            </button>
          </div>
        ) : (
          <div className="pop-browse__btn-browse">
            <div className="btn-group">
              <button className="_btn-bg" onClick={handleSave}>
                Сохранить
              </button>
              <button className="_btn-bor" onClick={() => setEditMode(false)}>
                Отменить
              </button>
              <button className="_btn-bor" onClick={handleDelete}>
                Удалить задачу
              </button>
            </div>
            <button className="_btn-bg" onClick={onClose}>
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
