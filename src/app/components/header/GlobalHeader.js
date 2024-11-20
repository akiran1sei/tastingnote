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
  const [isUserId, setIsUserId] = useState("");
  const [isUserEmail, setIsUserEmail] = useState("");
  const [isUserName, setIsUserName] = useState("");
  const router = useRouter();
  useEffect(() => {
    const getUser = () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token);
          const userData = {
            id: decodedToken.id,
            username: decodedToken.user,
            email: decodedToken.email,
            // その他の必要な情報
          };
          setIsUserId(userData.id);
          setIsUserEmail(userData.email);
          setIsUserName(userData.username);
          setIsLoggedIn(!!localStorage.getItem("token"));
        } else {
          console.log("トークンが見つかりません");
          return null;
        }
      } catch (error) {
        console.error("トークンのデコードに失敗しました:", error);
        return null;
      }
    };
    getUser();
  }, []);

  const toggleMenu = () => setIsActive(!isActive);
  const reload = () => {
    window.location.reload();
  };
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
                    onClick={() => navigateTo(`/pages/select/${isUserId}`)}
                  >
                    Select
                  </button>
                </li>
                <li className={header.menu_item}>
                  <button onClick={() => navigateTo("/pages/create/group")}>
                    Group
                  </button>
                </li>
                <li className={header.menu_item}>
                  <button onClick={() => navigateTo("/pages/create/beans")}>
                    NewPage
                  </button>
                </li>

                <li className={header.menu_item}>
                  <button
                    type="button"
                    onClick={() => navigateTo("/pages/user/profile")}
                  >
                    User Profile
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className={header.menu_item}>
                  <button onClick={() => navigateTo("/pages/auth/signin")}>
                    サインイン
                  </button>
                </li>
                <li className={header.menu_item}>
                  <button onClick={() => navigateTo("/pages/auth/signup")}>
                    サインアップ
                  </button>
                </li>
              </>
            )}
            <li className={header.menu_item}>
              <button
                type="button"
                onClick={reload}
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
