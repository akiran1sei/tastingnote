import styles from "@/app/styles/Contents.module.css";
import { HomePage } from "@/app/components/molecules/Home/Home";

const Home = () => {
  return (
    <div className={styles.main_contents}>
      <section className={`${styles.home} ${styles.section}`}>
        <HomePage />
      </section>
    </div>
  );
};

export default Home;
