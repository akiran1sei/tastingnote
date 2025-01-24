"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/Pages.module.css";

import { LoadingSkeleton } from "@/app/components/molecules/LoadingSkeleton/LoadingSkeleton";
import { Uncertified } from "@/app/components/molecules/Uncertified/Uncertified";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
export function ProfileComponent() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAccountDelete, setIsAccountDelete] = useState(false);
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const handleSubmit = async () => {};
  const handleAccountDelete = async () => {
    if (confirm("Account Delete？")) {
      if (confirm("作成したデータ全て削除しますがよろしいでしょうか？")) {
        setIsAccountDelete(true);
        try {
          const res = await fetch(`/api/auth/delete/${userEmail}`, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
            },
            body: JSON.stringify({ email: userEmail }),
          });
          const jsonData = await res.json();

          alert(jsonData.message);
          return signOut({ callbackUrl: "/" });
          // return router.push("/");
        } catch (error) {
          console.error("アカウント削除エラー:", error);
          // ユーザーにエラーメッセージを表示するなど
          alert("アカウント削除中にエラーが発生しました。");
        } finally {
          setIsAccountDelete(false);
        }
      }
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session) {
      setUserInfo(session.user);
      setUserName(session.user.name);
      setUserEmail(session.user.email);
      setIsLoading(false);
    } else if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [session, status]);
  if (isLoading) {
    return <LoadingSkeleton />;
  } else if (status === "unauthenticated") {
    return <Uncertified />;
  } else {
    return (
      <>
        <div className={styles.profile__contents}>
          <h1 className={styles.contents__title}>Profile</h1>
          {/* {session && ( */}
          <div className={styles.profile__card}>
            <ul
              className={`${styles.profile__user__list} ${styles.profile__list}`}
            >
              <li
                className={`${styles.profile__user__item} ${styles.profile__item}`}
              >
                <span
                  className={`${styles.profile__item__title} ${styles.profile__title}`}
                >
                  username
                </span>
                <span
                  className={`${styles.profile__item__value} ${styles.profile__value}`}
                >
                  {username}
                </span>
              </li>
              <li
                className={`${styles.profile__user__item} ${styles.profile__item}`}
              >
                <span
                  className={`${styles.profile__item__title} ${styles.profile__title}`}
                >
                  email
                </span>
                <span
                  className={`${styles.profile__item__value} ${styles.profile__value}`}
                >
                  {userEmail}
                </span>
              </li>
            </ul>
            <div className={styles.profile__setting}>
              <div className={styles.profile__wrap}>
                <form onSubmit={handleSubmit} className={styles.profile__form}>
                  <div
                    className={`${styles.profile__setting__item} ${styles.profile__item}`}
                  >
                    <label
                      htmlFor="profile__name"
                      className={`${styles.profile__setting__title} ${styles.profile__title}`}
                    >
                      usernameの編集
                    </label>

                    <input
                      type="text"
                      id="profile__name"
                      className={styles.profile__setting__input}
                      name="name"
                      placeholder="username"
                      value={username}
                      disabled
                    />
                  </div>
                  <div
                    className={`${styles.profile__setting__item} ${styles.profile__item}`}
                  >
                    <label
                      htmlFor="profile__email"
                      className={`${styles.profile__setting__title} ${styles.profile__title}`}
                    >
                      emailの編集
                    </label>

                    <input
                      type="email"
                      id="profile__email"
                      className={styles.profile__setting__input}
                      name="email"
                      placeholder="email"
                      value={userEmail}
                      disabled
                    />
                  </div>
                </form>
                <div className={styles.profile__btn__group}>
                  <ul className={styles.profile__btn__list}>
                    <li className={styles.profile__btn__item}>
                      <button type="submit" className={styles.profile__btn}>
                        保存
                      </button>
                    </li>

                    <li
                      className={`${styles.profile__btn__item} ${styles.profile__delete}`}
                    >
                      <span className={styles.caution__text}>
                        ～こちらの退会について～
                        <br />
                        退会されますとこのアカウントで
                        <br />
                        作成されたデータが全て削除されます。
                      </span>
                      <button
                        className={`${styles.profile__btn} ${styles.profile__delete__btn}`}
                        type="button"
                        onClick={handleAccountDelete}
                        disabled={isAccountDelete}
                      >
                        {isLoggingOut ? "アカウント削除中.." : "退会"}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* )} */}
        </div>
      </>
    );
  }
}
