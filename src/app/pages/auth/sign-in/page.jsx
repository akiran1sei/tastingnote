"use client";

import SignBtn from "@/app/components/buttons/SignBtn";
import styles from "@/app/styles/Contents.module.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dotenv from "dotenv";

import { AuthBtn } from "@/app/components/buttons/Auth/AuthBtn";
import { useSession, signIn } from "next-auth/react";
dotenv.config();
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // エラー状態の追加
  const [action, setAction] = useState(false);

  const router = useRouter();
  useEffect(() => {
    //  window.location.reload();
    console.log("router.refresh() が実行されました");
    router.refresh();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      // 認証成功時の処理
      // 例:
      router.push("/");
    } catch (error) {
      // 認証失敗時の処理
      console.error("サインインエラー:", error);
      setError("サインインに失敗しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };
  const handleClick = () => {
    setAction(!action);
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
                <Link href="/pages/auth/signup" className={styles.smallFont}>
                  <span>新規登録</span>はこちらをクリック！
                </Link>
              </li>
            </ul>
            <div className={styles.sign_btns}>
              <button type="submit" className={styles.sign_btn}>
                Submit
              </button>
            </div>
          </form>
          <hr className={styles.hr}></hr>
          <div className={styles.sign_btns}>
            <button
              onClick={() => signIn("google")}
              className={styles.sign_btn}
            >
              GoogleでSign In
            </button>
            <button
              onClick={() => signIn("github")}
              className={styles.sign_btn}
            >
              GitHubでSign In
            </button>
            <button
              onClick={() => signIn("discord")}
              className={styles.sign_btn}
            >
              DiscordでSign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
