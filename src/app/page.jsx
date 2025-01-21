import styles from "@/app/styles/Pages.module.css";
import { TopComponent } from "@/app/components/molecules/Top/TopPage";

const Top = () => {
  return (
    <div className={styles.main_contents}>
      <section className={styles.section}>
        <TopComponent />
      </section>
    </div>
  );
};

export default Top;
