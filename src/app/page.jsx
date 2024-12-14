"use client";
import styles from "@/app/styles/Contents.module.css";
import Image from "next/image";
import { UserData } from "@/app/components/items/user";
import { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { AuthBtn } from "@/app/components/buttons/AuthBtn";

const Home = () => {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isUserId, setIsUserId] = useState("");
  // const [isUserEmail, setIsUserEmail] = useState("");
  // const [isUserName, setIsUserName] = useState("");

  const router = useRouter();
  const UserInfo = UserData().session;

  const navigateTo = (path) => {
    if (router.pathname !== path) {
      router.push(path);
    }
  };

  // useEffect(() => {
  //   const checkAuth = () => {
  //     if (typeof window !== "undefined") {
  //       try {
  //         const token = localStorage.getItem("token");
  //         if (!token) {
  //           console.log("トークンが見つかりません");
  //           setIsLoggedIn(false);
  //           return;
  //         }

  //         const decodedToken = jwtDecode(token);
  //         const userData = {
  //           id: decodedToken.id,
  //           username: decodedToken.user,
  //           email: decodedToken.email,
  //           // その他の必要な情報
  //         };
  //         setIsUserId(userData.id);
  //         setIsUserEmail(userData.email);
  //         setIsUserName(userData.username);
  //         setIsLoggedIn(true);
  //       } catch (error) {
  //         console.error("認証エラー:", error);
  //         setIsLoggedIn(false);
  //       }
  //     }
  //   };

  //   checkAuth();
  // }, []);
  const startBtn = () => {
    navigateTo(`/pages/select/${UserInfo.id}`);
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
