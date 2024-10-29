"use client";
import styles from "@/app/styles/Contents.module.css";
import Image from "next/image";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUser, setIsUser] = useState(null);
  const router = useRouter();

  const navigateTo = (path) => {
    if (router.pathname !== path) {
      router.push(path);
    }
  };

  // useEffect(() => {
  //   // サインインページを事前に読み込む
  //   router.prefetch("/pages/auth/signin");
  //   router.prefetch("/pages/auth/signup");
  // }, [router]);
  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            console.log("トークンが見つかりません");
            setIsLoggedIn(false);
            return;
          }

          const decodedToken = jwtDecode(token);
          setIsLoggedIn(true);
          setIsUser(decodedToken.id);
        } catch (error) {
          console.error("認証エラー:", error);
          setIsLoggedIn(false);
        }
      }
    };

    checkAuth();
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.home_bg}>
        <div className={styles.home_bg_wrap}>
          <Image
            className={styles.home_img}
            src="/images/tasting-img1540w.jpg"
            alt="テイスティング中の画像"
            width={1540}
            height={1027}
            priority
          />
        </div>
      </div>
      <nav className={styles.home_nav}>
        <h1 className={styles.header_title_txt}>
          <span>Tasting Note</span>
        </h1>
        <ul className={styles.home_nav_list}>
          {isLoggedIn ? (
            <li className={styles.home_nav_item}>
              <button
                type="button"
                className={styles.home_start_btn}
                onClick={() => navigateTo(`/pages/select/${isUser}`)}
              >
                START
              </button>
            </li>
          ) : (
            <>
              <li className={styles.home_nav_item}>
                <button
                  type="button"
                  className={styles.home_log_btn}
                  onClick={() => navigateTo("/pages/auth/signin")}
                >
                  SignIn
                </button>
              </li>
              <li className={styles.home_nav_item}>
                <button
                  type="button"
                  className={styles.home_log_btn}
                  onClick={() => navigateTo("/pages/auth/signup")}
                >
                  SignUp
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Home;
