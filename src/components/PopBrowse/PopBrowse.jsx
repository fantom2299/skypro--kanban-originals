import { useState } from "react";
import { CATEGORIES, STATUSES } from "../../data/constants";
import Calendar from "../Calendar/Calendar";
import "./PopBrowse.css";

export default function PopBrowse({ task, onClose, onUpdate, onDelete }) {
  const [editMode, setEditMode] = useState(false);
  const [desc, setDesc] = useState(task.desc || "");
  const [status, setStatus] = useState(task.status);
  const [date, setDate] = useState(task.date === "—" ? null : task.date);
  const [isLoading, setIsLoading] = useState(false);

  const cat = CATEGORIES.find((c) => c.id === task.category) || CATEGORIES[0];

  //  СОХРАНЕНИЕ ИЗМЕНЕНИЙ
  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      const updatedTask = {
        ...task,
        desc,
        status,
        date: date || "—",
      };
      
      
      
      // Вызываем onUpdate из Dashboard
      await onUpdate(updatedTask);
      
      
      setEditMode(false);
    } catch (error) {
      
      alert('Не удалось сохранить изменения. Попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  // 🗑 УДАЛЕНИЕ ЗАДАЧИ
  const handleDelete = () => {
    onDelete(task.id);
  };

  // Отмена редактирования
  const handleCancel = () => {
    setDesc(task.desc || "");
    setStatus(task.status);
    setDate(task.date === "—" ? null : task.date);
    setEditMode(false);
  };

  // Получаем название категории
  const getCategoryLabel = (category) => {
    const found = CATEGORIES.find(c => c.id === category);
    return found ? found.label : category;
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="pop pop-browse" onClick={(e) => e.stopPropagation()}>
        {/* Title + Category + ID */}
        <div className="pop-browse__top-block">
          <h3 className="pop-browse__ttl">
            {task.title}
            {/* <span className="task-id-badge">ID: {task.id}</span> */}
          </h3>
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
                onClick={() => editMode && setStatus(s)}
                style={{ cursor: editMode ? 'pointer' : 'default' }}
              >
                <p>{s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Description + Calendar */}
        <div className="pop-browse__wrap">
          <form className="pop-browse__form form-browse" onSubmit={(e) => e.preventDefault()}>
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
                disabled={isLoading}
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
              <button className="_btn-bg" onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Сохранение..." : "Сохранить"}
              </button>
              <button className="_btn-bor" onClick={handleCancel} disabled={isLoading}>
                Отменить
              </button>
              <button className="_btn-bor" onClick={handleDelete}>
                Удалить задачу
              </button>
            </div>
            <button className="_btn-bg" onClick={onClose} disabled={isLoading}>
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
}