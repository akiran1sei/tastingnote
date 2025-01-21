"use client";
import header from "@/app/styles/Header.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

export function GlobalHeader() {
  const [isActive, setIsActive] = useState(false);
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    if (status === "authenticated" && session) {
      setUserInfo(session.user);
    }
  }, [session, status]);

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

  return session ? (
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
            <li className={header.menu_item}>
              <button onClick={() => navigateTo(`/pages/select`)}>
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
                <span className={header.reload_txt}>再読み込み</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  ) : (
    <header className={headerClass}>
      <div className={header.header_title}>
        <h1 className={header.header_title_txt}>Tasting Note</h1>
      </div>
    </header>
  );
}
