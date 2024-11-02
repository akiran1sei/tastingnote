"use client"; // Error components must be Client Components
import styles from "@/app/styles/Error_404.module.css";

import { useRouter } from "next/navigation";
export default function Error({ error, reset }) {
  const router = useRouter();

  const ClickLink = () => {
    router.replace("/");
  };
  return (
    <div className={styles.error_404_page}>
      <h1 className={styles.error_404_title}>
        Something
        <br className={styles.error_404_break} /> went
        <br className={styles.error_404_break} /> wrong!
      </h1>
      <div className={styles.error_404_BtnBox}>
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className={styles.error_404_button}
        >
          Try again
        </button>
        <button
          type="button"
          className={styles.error_404_button}
          onClick={ClickLink}
        >
          Home へ
        </button>
      </div>
    </div>
  );
}
