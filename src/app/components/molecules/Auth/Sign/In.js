"use client";

import styles from "@/app/styles/Pages.module.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dotenv from "dotenv";

import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
dotenv.config();
export function SignInComponent() {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // エラー状態の追加
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated" && session) {
      setUserInfo(session.user);

      setIsLoading(false);
    } else if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [session, status]);
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
        return router.push(`/`);
        // return router.push(`/pages/profile/${userInfo}`);
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
  // const signInWithGoogle = async () => {
  //   try {
  //     await signIn("google", { callbackUrl: "/" });
  //   } catch (error) {
  //     setError("サインインに失敗しました。");
  //     return alert(error);
  //   }
  // };

  return (
    <div className={styles.sign__contents}>
      <div className={styles.sign__wrapper}>
        <h1 className={styles.contents__title}>Sign In</h1>
        <div className={styles.sign__card}>
          <form onSubmit={handleSubmit} className={styles.sign__form}>
            {error && <div className={styles.error__message}>{error}</div>}
            <ul className={styles.sign__list}>
              <li className={styles.sign__item}>
                <label htmlFor="email">メールアドレス</label>
                <br className={styles.line__break} />
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
              <li className={styles.sign__item}>
                <label htmlFor="password">パスワード</label>
                <br className={styles.line__break} />
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
              <li className={styles.sign__link}>
                <Link href="/pages/auth/sign-up" className={styles.small__font}>
                  <span>新規登録</span>はこちらをクリック！
                </Link>
              </li>
            </ul>
            <div className={styles.sign__btns}>
              <button type="submit" className={styles.sign__submit}>
                Submit
              </button>
            </div>
          </form>
          {/* <hr className={styles.hr}></hr>
          <div className={styles.sign__btns}>
            <button onClick={signInWithGoogle} className={styles.sign__btn}>
              <Image
                src={"../../images/svg/web_light_sq_SI.svg"}
                alt="googleでログイン"
                width={200}
                height={50}
              />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
