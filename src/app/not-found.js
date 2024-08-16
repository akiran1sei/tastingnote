//not-found.js
import styles from "@/app/styles/Error_404.module.css";
import Link from "next/link";
export default function NotFound() {
  return (
    <>
      <div className={styles.error_404_page}>
        <h1 className={styles.error_404_title}> 404: Not Found </h1>
        <p className={styles.error_404_txt}> ページ が見つかりません。 </p>
        <div className={styles.error_404_BtnBox}>
          <button type="button" className={styles.error_404_button}>
            <Link href={"/"} scroll={false} passHref>
              Home へ
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
