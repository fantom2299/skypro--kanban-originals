import styles from "./SkeletonCard.module.css";

export default function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.badge} />
        <div className={styles.dots} />
      </div>
      <div className={styles.line} />
      <div className={`${styles.line} ${styles.lineShort}`} />
      <div className={`${styles.line} ${styles.lineTiny}`} />
    </div>
  );
}
