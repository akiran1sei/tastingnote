"use client";
import SignBtn from "@/app/components/buttons/SignBtn";
import styles from "@/app/styles/Contents.module.css";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dotenv from "dotenv";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  dotenv.config();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
        return router.replace("/"); // ログイン成功後の遷移
      } else {
        alert(data.message || "サインインに失敗しました。");
        return router.replace("/");
      }
    } catch (error) {
      const errorData = await res.json();
      return setError(errorData.message || "サインインに失敗しました。");
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
            <ul className={styles.sign_list}>
              <li className={styles.sign_item}>
                <label htmlFor="email">user email</label>
                <br className={styles.line_break} />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </li>
              <li className={styles.sign_item}>
                <label htmlFor="password">user password</label>
                <br className={styles.line_break} />
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </li>
            </ul>
            <div className={styles.sign_btn}>
              <SignBtn />
            </div>
          </form>
        </div>
        <p className={styles.sign_link}>
          <Link href={"./signup"} className={styles.smallFont}>
            Sing Upは、こちらをクリック！
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignIn;
