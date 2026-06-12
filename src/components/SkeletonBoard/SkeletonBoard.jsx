import SkeletonCard from "../SkeletonCard/SkeletonCard";
import styles from "./SkeletonBoard.module.css";

const COLUMNS = [
  { title: "Без статуса", cards: 5 },
  { title: "Нужно сделать", cards: 1 },
  { title: "В работе", cards: 3 },
  { title: "Тестирование", cards: 1 },
  { title: "Готово", cards: 1 },
];

export default function SkeletonBoard() {
  return (
    <div className={styles.board}>
      {COLUMNS.map((col) => (
        <div key={col.title} className={styles.column}>
          <p className={styles.columnTitle}>{col.title}</p>
          {Array.from({ length: col.cards }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ))}
    </div>
  );
}
