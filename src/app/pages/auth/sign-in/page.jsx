"use client";

import styles from "@/app/styles/Contents.module.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dotenv from "dotenv";

import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
dotenv.config();
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // エラー状態の追加
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const sign_in = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (sign_in.ok) {
        return router.push("/");
      }
      await setError("サインインに失敗しました。もう一度お試しください。");

      return;
    } catch (error) {
      // 認証失敗時の処理
      console.error("サインインエラー:", error);
      setError("サインインに失敗しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      setError("サインインに失敗しました。");
      return alert(error);
    }
  };

  return (
    <div className={styles.sign_page}>
      <div className={styles.sign_wrapper}>
        <h1 className={styles.contents_title}>Sign In</h1>
        <div className={styles.sign_card}>
          <form onSubmit={handleSubmit} className={styles.sign_form}>
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
                  placeholder="email"
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
                  placeholder="password"
                  required
                  disabled={isLoading}
                />
              </li>
              <li className={styles.sign_link}>
                <Link href="/pages/auth/sign-up" className={styles.smallFont}>
                  <span>新規登録</span>はこちらをクリック！
                </Link>
              </li>
            </ul>
            <div className={styles.sign_btns}>
              <button type="submit" className={styles.sign_submit}>
                Submit
              </button>
            </div>
          </form>
          <hr className={styles.hr}></hr>
          <div className={styles.sign_btns}>
            <button onClick={signInWithGoogle} className={styles.sign_btn}>
              <Image
                src={"../../images/web_light_sq_SI.svg"}
                alt="googleでログイン"
                width={200}
                height={50}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
