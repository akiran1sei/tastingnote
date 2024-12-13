"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import styles from "@/app/styles/Contents.module.css";

const Signout = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  useEffect(() => {
    async function handleSignout() {
      setError(null);
      try {
        const res = await fetch("/api/auth/signout", {
          // API ルートの修正
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("サインアウトに失敗しました");
        }

        // トークンのみ削除
        localStorage.removeItem("token");

        // サインインページへリダイレクト

        router.replace("/pages/auth/signin");
      } catch (error) {
        console.error("サインアウトエラー:", error);
        setError(error.message);
      }
    }

    handleSignout();
  }, []);

  const signInReplace = () => {
    router.replace("/pages/auth/signin");
  };

  return (
    <div className={styles.sign_page}>
      <div className={styles.sign_wrapper}>
        <h2 className={styles.sign_title}>サインアウト</h2>
        <p>
          一定時間が経ちましたのでサインアウトしました。サインインしてください。
        </p>
        {error && <p className={styles.error_message}>{error}</p>}
        <div className={styles.sign_btn}>
          <button className={styles.sign_out_btn} onClick={signInReplace}>
            サインイン
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signout;
