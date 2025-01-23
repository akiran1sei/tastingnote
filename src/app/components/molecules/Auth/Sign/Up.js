"use client";
import styles from "@/app/styles/Pages.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import dotenv from "dotenv";
export function SignUpComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  dotenv.config();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/auth/sign-up`,
        {
          method: "POST",
          headers: { "Cache-Control": "no-store" },
          body: JSON.stringify({
            username: name,
            email: email,
            password: password,
          }),
        }
      );

      const data = await res.json();
      alert(data.message);
      router.replace("/");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className={styles.sign__contents}>
      <div className={styles.sign__wrapper}>
        <h1 className={styles.contents__title}>Sign Up</h1>
        <div className={styles.sign__card}>
          <form onSubmit={handleSubmit} className={styles.sign__form}>
            <ul className={styles.sign__list}>
              <li className={styles.sign__item}>
                <label htmlFor="name">user name</label>
                <br className={styles.line__break} />
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  required
                />
              </li>
              <li className={styles.sign__item}>
                <label htmlFor="email">user email</label>
                <br className={styles.line__break} />
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
              <li className={styles.sign__item}>
                <label htmlFor="password">user password</label>
                <br className={styles.line__break} />
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
            {/* <div className={styles.sign__btn}> */}
            <button type="submit" className={styles.sign__submit}>
              Submit
            </button>
            {/* </div> */}
          </form>
        </div>
        <p className={styles.sign__link}>
          <Link href={"/pages/auth/sign-in"} className={styles.small__font}>
            <span>Sing In</span>は、こちらをクリック！
          </Link>
        </p>
      </div>
    </div>
  );
}
