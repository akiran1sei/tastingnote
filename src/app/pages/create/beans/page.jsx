import { BeansCreateTable } from "@/app/components/molecules/Create/Create_ver-2";
import styles from "@/app/styles/Contents.module.css";
import { GlobalHeader } from "@/app/components/header/GlobalHeader";
const BeansCreatePage = () => {
  return (
    <>
      <GlobalHeader />
      <section className={`${styles.create} ${styles.section}`}>
        <BeansCreateTable />
      </section>
    </>
  );
};

export default BeansCreatePage;
