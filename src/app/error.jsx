"use client"; // Error components must be Client Components
import styles from "@/app/styles/Error_404.module.css";
import { useEffect } from "react";
import Link from "next/link";
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

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
        <button type="button" className={styles.error_404_button}>
          <Link href={"/"} scroll={false} passHref>
            Home へ
          </Link>
        </button>
      </div>
    </div>
  );
}
