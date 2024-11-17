"use client";

import SignBtn from "@/app/components/buttons/SignBtn";
import styles from "@/app/styles/Contents.module.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dotenv from "dotenv";
dotenv.config();
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // エラー状態の追加

  const router = useRouter();
  useEffect(() => {
    //  window.location.reload();
    console.log("router.refresh() が実行されました");
    router.refresh();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // エラー状態をリセット

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/pages/api/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert(`${data.user.user}  ${data.message}`);
        router.push("/"); // replace の代わりに push を使用
      } else {
        setError(data.message || "サインインに失敗しました。");
        alert(data.message || "サインインに失敗しました。");
      }
    } catch (error) {
      console.error("サインインエラー:", error);
      setError("サインインに失敗しました。もう一度お試しください。");
      alert("サインインに失敗しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.sign_page}>
      <div className={styles.sign_wrapper}>
        <h1 className={styles.contents_title}>Sign In</h1>
        <div className={styles.sign_card}>
          <form onSubmit={handleSubmit}>
            {error && <div className={styles.error_message}>{error}</div>}
            <ul className={styles.sign_list}>
              <li className={styles.sign_item}>
                <label htmlFor="email">メールアドレス</label>
                <br className={styles.line_break} />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  disabled={isLoading}
                />
              </li>
              <li className={styles.sign_item}>
                <label htmlFor="password">パスワード</label>
                <br className={styles.line_break} />
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  disabled={isLoading}
                />
              </li>
            </ul>
            <div className={styles.sign_btn}>
              <SignBtn isLoading={isLoading} />
            </div>
          </form>
        </div>
        <p className={styles.sign_link}>
          <Link href="/pages/auth/signup" className={styles.smallFont}>
            新規登録はこちらをクリック！
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
