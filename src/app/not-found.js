//not-found.js
"use client";
import styles from "@/app/styles/Error_404.module.css";
import { useRouter } from "next/navigation";
export default function NotFound() {
  const router = useRouter();
  const navigateTo = (path) => {
    if (router.pathname !== path) {
      router.push(path);
    }
  };

  return (
    <>
      <div className={styles.error_404_page}>
        <h1 className={styles.error_404_title}> 404: Not Found </h1>
        <p className={styles.error_404_txt}> ページ が見つかりません。 </p>
        <div className={styles.error_404_BtnBox}>
          <button
            type="button"
            className={styles.error_404_button}
            onClick={() => navigateTo("/")}
          >
            Home へ
          </button>
        </div>
      </div>
    </>
  );
}
