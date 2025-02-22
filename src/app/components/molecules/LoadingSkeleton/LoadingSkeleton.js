import styles from "@/app/styles/Pages.module.css";
import { LoadingAnimation } from "../../items/loading-animation";
export function LoadingSkeleton() {
  return (
    <div className={styles.loading_page}>
      <LoadingAnimation />
    </div>
  );
}
