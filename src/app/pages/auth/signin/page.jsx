"use client";

import SignBtn from "@/app/components/buttons/SignBtn";
import styles from "@/app/styles/Contents.module.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dotenv from "dotenv";
import Image from "next/image";
dotenv.config();
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // エラー状態の追加
  const [action, setAction] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState("akira.application@gmail.com");
  const [copiedPassword, setCopiedPassword] = useState("1111");
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
        `${process.env.NEXT_PUBLIC_URL}/api/auth/signin`,
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
  const handleClick = () => {
    setAction(!action);
  };
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // 2秒後に表示を元に戻す
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("クリップボードへのコピーに失敗しました:", err);
    }
  };

  return (
    <div className={styles.sign_page}>
      <div className={styles.sign_wrapper}>
        <h1 className={styles.contents_title}>Sign In</h1>
        <div className={styles.sign_card}>
          <div className={styles.sign_pointBox}>
            <button
              className={styles.sign_pointImg}
              type="button"
              onClick={handleClick}
            >
              <Image
                src="/images/priority_high_img_white.svg"
                alt="エクスクラメーションボタン"
                width={24}
                height={24}
                priority
              />
            </button>

            {action && (
              <div className={styles.sign_point}>
                <span className={styles.sign_pointText}>
                  下記の”email”、”password”をクリックしますと
                  <br />
                  お試しで使用する”email”、”password”を
                  <br />
                  コピーできますので、ご使用下さい。
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(copiedEmail)}
                  className={styles.sign_point_button}
                >
                  email
                </button>

                <button
                  type="button"
                  onClick={() => handleCopy(copiedPassword)}
                  className={styles.sign_point_button}
                >
                  password
                </button>
              </div>
            )}
          </div>
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
            </ul>
            <div className={styles.sign_btn}>
              <SignBtn isLoading={isLoading} />
            </div>
          </form>
        </div>
        <p className={styles.sign_link}>
          <Link href="/pages/auth/signup" className={styles.smallFont}>
            <span>新規登録</span>はこちらをクリック！
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
