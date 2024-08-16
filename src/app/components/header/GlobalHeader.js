"use client";
import header from "@/app/styles/Header.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
export function GlobalHeader() {
  const [isActive, setIsActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUser, setIsUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    if (isLoggedIn) {
      const getUser = () => {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("トークンが見つかりません");
          return null;
        }

        try {
          const decodedToken = jwtDecode(token);
          // デコードされたトークンから必要な情報を取得
          const userData = {
            id: decodedToken.id,
            username: decodedToken.user,
            email: decodedToken.email,
            // その他の必要な情報
          };

          return userData;
        } catch (error) {
          console.error("トークンのデコードに失敗しました:", error);
          return null;
        }
      };
      const UserInformation = getUser();
      setIsUser(UserInformation.id);
    }
  }, []);

  const toggleMenu = () => setIsActive(!isActive);

  const navigateTo = (path) => {
    if (router.pathname !== path) {
      router.push(path);
      setIsActive(false);
    }
  };

  const headerClass = `${header.header} ${isActive ? header.active : ""}`;

  return (
    <header className={headerClass}>
      <div className={header.header_title}>
        <h1 className={header.header_title_txt}>Tasting Note</h1>
      </div>

      <div className={header.header_button}>
        <button type="button" className={header.button} onClick={toggleMenu}>
          <span className={header.menu_bar}></span>
          <span className={header.menu_bar}></span>
          <span className={header.menu_bar}></span>
          <span className={header.visuallyHidden}>メニュー</span>
        </button>
      </div>

      {isActive && (
        <nav className={header.menu}>
          <ul className={header.menu_list}>
            {isLoggedIn ? (
              <>
                <li className={header.menu_item}>
                  <button
                    onClick={() => navigateTo(`/pages/select/${isUser}?user=`)}
                  >
                    Select
                  </button>
                </li>
                <li className={header.menu_item}>
                  <button onClick={() => navigateTo("/pages/create/group")}>
                    Create Group
                  </button>
                </li>
                <li className={header.menu_item}>
                  <button onClick={() => navigateTo("/pages/create/beans")}>
                    Create NewPage
                  </button>
                </li>

                <li className={header.menu_item}>
                  <button
                    type="button"
                    onClick={() => navigateTo("/pages/auth/profile")}
                  >
                    User Profile
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className={header.menu_item}>
                  <Link href="/pages/auth/signin" scroll={false}>
                    <button onClick={toggleMenu}>SignIn</button>
                  </Link>
                </li>
                <li className={header.menu_item}>
                  <Link href="/pages/auth/signup" scroll={false}>
                    <button onClick={toggleMenu}>SignUp</button>
                  </Link>
                </li>
              </>
            )}
            <li className={header.menu_item}>
              <button
                type="button"
                onClick={() => location.reload()}
                className={header.reload_btn}
              >
                <span className={header.reload_img}>
                  <Image
                    src="/images/refresh_img.svg"
                    alt="リロードボタン"
                    width={48}
                    height={48}
                    priority
                  />
                </span>
                <span className={header.reload_txt}>Refresh</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
