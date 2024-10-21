"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/app/styles/Contents.module.css";

const Signout = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  useEffect(() => {
    // サインインページを事前に読み込む
    router.prefetch("/pages/auth/signin");
  }, [router]);
  const signInBtn = router.replace("/pages/auth/signin");
  useEffect(() => {
    async function handleSignout() {
      setError(null);
      try {
        const res = await fetch("/pages/api/auth/signout", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("サインアウトに失敗しました");
        }

        localStorage.removeItem("token");
        // 必要に応じて他のローカルストレージのデータも削除
      } catch (error) {
        console.error("サインアウトエラー:", error);
        setError(error.message);
      }
    }

    handleSignout();
  }, []);

  return (
    <div className={styles.sign_page}>
      <div className={styles.sign_wrapper}>
        <h2 className={styles.sign_title}>サインアウト</h2>
        <p>
          一定時間が経ちましたのでサインアウトしました。サインインしてください。
        </p>
        {error && <p className={styles.error_message}>{error}</p>}
        <div className={styles.sign_btn}>
          <button className={styles.sign_out_btn}>
            <Link href={signInBtn} scroll={false} passHref>
              サインインへ
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signout;
