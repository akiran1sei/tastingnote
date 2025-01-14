import styles from "@/app/styles/Contents.module.css";
import { HomePage } from "@/app/components/molecules/Home/Home";

const Home = () => {
  return (
    <div className={styles.home}>
      <HomePage />
    </div>
  );
};

export default Home;
