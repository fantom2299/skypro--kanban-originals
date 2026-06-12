import "./PopExit.css";

export default function PopExit({ onConfirm, onCancel }) {
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="pop pop-exit" onClick={e => e.stopPropagation()}>
        <h2>Выйти из аккаунта?</h2>
        <div className="pop-exit__form-group">
          <button className="btn-yes" onClick={onConfirm}>Да, выйти</button>
          <button className="btn-no"  onClick={onCancel}>Нет, остаться</button>
        </div>
      </div>
    </div>
  );
}
