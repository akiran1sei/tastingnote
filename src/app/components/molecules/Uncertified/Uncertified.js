import styles from "@/app/styles/Contents.module.css";
import Link from "next/link";
export function Uncertified() {
  return (
    <div className={styles.uncertified_page}>
      <p className={styles.uncertified_txt}>未認証です。</p>
      <button type="button" className={styles.uncertified_btn}>
        <Link href={"/"} scroll={false} passHref>
          Homeへ
        </Link>
      </button>
    </div>
  );
}
