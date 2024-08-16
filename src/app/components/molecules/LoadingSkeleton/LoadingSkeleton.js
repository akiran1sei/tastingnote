import styles from "@/app/styles/Contents.module.css";
export function LoadingSkeleton() {
  return (
    <div className={styles.loading_page}>
      <p className={styles.loading_txt}>
        Loading<span className={styles.loading_point}>...</span>
      </p>
    </div>
  );
}
