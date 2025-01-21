import styles from "@/app/styles/Pages.module.css";
import { TopPage } from "@/app/components/molecules/Top/TopPage";

const Top = () => {
  return (
    <div className={styles.main_contents}>
      <section className={`${styles.top} ${styles.section}`}>
        <TopPage />
      </section>
    </div>
  );
};

export default Top;
