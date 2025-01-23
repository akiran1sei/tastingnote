"use client";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/Error_404.module.css";
export function TopBtn() {
  const router = useRouter();
  const ClickLink = () => {
    router.replace("/");
  };
  return (
    <button
      type="button"
      className={styles.error_404_button}
      onClick={ClickLink}
    >
      Topページへ
    </button>
  );
}
