import styles from "@/app/styles/Pages.module.css";
import { GlobalHeader } from "@/app/components/header/GlobalHeader";
export default function PagesLayout({ children }) {
  return (
    <>
      <GlobalHeader />
      <section className={styles.section}>{children}</section>
    </>
  );
}
