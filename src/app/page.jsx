"use client";
import styles from "@/app/styles/Contents.module.css";
import Image from "next/image";
import { UserData } from "@/app/components/items/user";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthBtn } from "@/app/components/buttons/AuthBtn";

const Home = () => {
  const router = useRouter();
  const UserInfo = UserData().session;

  const navigateTo = (path) => {
    if (router.pathname !== path) {
      router.push(path);
    }
  };

  const startBtn = () => {
    navigateTo(`/pages/select/${UserInfo.email}`);
  };

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

      <h1 className={styles.header_title_txt}>
        <span>Tasting Note</span>
      </h1>

      <nav className={styles.home_nav}>
        <ul className={styles.home_nav_list}>
          <li className={styles.home_nav_item}>
            <button
              type="button"
              className={styles.home_start_btn}
              onClick={startBtn}
            >
              START
            </button>
          </li>
          <li>
            <AuthBtn />
          </li>
          {/* {isLoggedIn ? (
            <li className={styles.home_nav_item}>
              <button
                type="button"
                className={styles.home_start_btn}
                onClick={startBtn}
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
          )} */}
        </ul>
      </nav>
    </div>
  );
};

export default Home;
