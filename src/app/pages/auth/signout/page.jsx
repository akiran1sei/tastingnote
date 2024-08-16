"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/Contents.module.css";
import Link from "next/link";

const Signout = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  useEffect(() => {
    async function handleSignout() {
      setError(null);
      try {
        const res = await fetch("/pages/api/auth/signout", {
          cache: "no-store",
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        await res.json();
        return localStorage.removeItem("token");
        // router.push("/pages/auth/signin");
      } catch (error) {
        setError(error.message);
      }
    }
    handleSignout();
  }, []);

  return (
    <div className={styles.sign_page}>
      <div className={styles.sign_wrapper}>
        <p>
          一定時間が経ちましたのでサインアウトしました。サインインしてください。
        </p>
        <div className={styles.sign_btn}>
          {/* <button onClick={handleSignout} className={styles.sign_out_btn}>*/}
          <button className={styles.sign_out_btn}>
            <Link href={"/pages/auth/signin"} scroll={false} passHref>
              Sign Inへ
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signout;
