"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/styles/Pages.module.css";
import { maskEmail } from "@/app/components/items/concealEmail";
import { LoadingSkeleton } from "@/app/components/molecules/LoadingSkeleton/LoadingSkeleton";
import { Uncertified } from "@/app/components/molecules/Uncertified/Uncertified";
import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ProfileComponent() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAccount, setIsAccount] = useState(false);
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [editUserName, setEditUserName] = useState("");
  const [editUserEmail, setEditUserEmail] = useState("");
  const router = useRouter();
  const navigateTo = (path) => {
    if (router.pathname !== path) {
      router.push(path);
    }
  };

  // 使用例
  const concealEmail = maskEmail(userEmail);
  const concealName = maskEmail(username);

  // async function handleSubmit(e) {
  const handleSubmit = async (e) => {
    if (confirm("保存してもよろしいでしょうか？")) {
      e.preventDefault();
      setIsAccount(true);
      try {
        const response = await fetch(`/api/profile/${[userInfo.id]}`, {
          method: "PUT",
          cache: "no-store",
          body: JSON.stringify({
            _id: userInfo.id,
            name: editUserName,
            email: editUserEmail,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
        });
        const jsonData = await response.json();
        alert(jsonData.message);
        return signIn();
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsAccount(false);
      }
    }
  };

  const handleAccountDelete = async () => {
    if (confirm("Account Delete？")) {
      if (confirm("作成したデータ全て削除しますがよろしいでしょうか？")) {
        setIsAccount(true);
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
          setIsAccount(false);
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
          {session.user.email === "akira.application@gmail.com" ? (
            <div className={styles.profile__card}>
              <div className={styles.profile__wrap}>
                <p className={styles.profile__guestText}>
                  ゲストモードでは、
                  <br />
                  プロフィールページは、
                  <br />
                  ご利用できません。
                </p>
              </div>
            </div>
          ) : (
            <div className={styles.profile__card}>
              <div
                className={`${styles.profile__card__wrap} ${styles.profile__wrap}`}
              >
                <div
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
                    {concealName}
                  </span>
                </div>
                <div
                  className={`${styles.profile__user__list} ${styles.profile__list}`}
                >
                  <span
                    className={`${styles.profile__item__title} ${styles.profile__title}`}
                  >
                    email
                  </span>
                  <span
                    className={`${styles.profile__item__value} ${styles.profile__value}`}
                  >
                    {concealEmail}
                  </span>
                </div>
              </div>

              <div className={styles.profile__setting}>
                <div
                  className={`${styles.profile__setting__wrap} ${styles.profile__wrap}`}
                >
                  <form
                    onSubmit={handleSubmit}
                    className={styles.profile__form}
                  >
                    <div
                      className={`${styles.profile__setting__item} ${styles.profile__item}`}
                    >
                      <label
                        htmlFor="profile_name"
                        className={`${styles.profile__setting__title} ${styles.profile__title}`}
                      >
                        usernameの編集
                      </label>
                      <span
                        className={`${styles.profile__setting__value} ${styles.profile__value}`}
                      >
                        {concealName}
                      </span>
                      <span
                        className={`${styles.profile__setting__value} ${styles.profile__value}`}
                      >
                        <input
                          type="text"
                          id="profile_name"
                          className={styles.profile__setting__input}
                          name="profile_name"
                          placeholder="username"
                          value={editUserName}
                          onChange={(e) => setEditUserName(e.target.value)}
                        />
                      </span>
                    </div>
                    <div
                      className={`${styles.profile__setting__item} ${styles.profile__item}`}
                    >
                      <label
                        htmlFor="profile_email"
                        className={`${styles.profile__setting__title} ${styles.profile__title}`}
                      >
                        emailの編集
                      </label>
                      <span
                        className={`${styles.profile__setting__value} ${styles.profile__value}`}
                      >
                        {concealEmail}
                      </span>
                      <span
                        className={`${styles.profile__setting__value} ${styles.profile__value}`}
                      >
                        <input
                          type="email"
                          id="profile_email"
                          className={styles.profile__setting__input}
                          name="profile_email"
                          placeholder="email"
                          value={editUserEmail}
                          onChange={(e) => setEditUserEmail(e.target.value)}
                        />
                      </span>
                    </div>
                    <div className={styles.profile__btn__item}>
                      <button
                        type="submit"
                        className={`${styles.profile__btn} ${styles.profile__save__btn}`}
                      >
                        保存
                      </button>
                    </div>
                  </form>
                  <div className={styles.profile__btn__group}>
                    <div
                      className={`${styles.profile__btn__item} ${styles.profile__feedback}`}
                    >
                      <button
                        className={`${styles.profile__btn} ${styles.profile__link__btn}`}
                        type="button"
                      >
                        <Link
                          href={
                            "https://nakamoriakira-portfolio.vercel.app/pages/contact"
                          }
                          passHref
                        >
                          お問い合わせページへ
                        </Link>
                      </button>
                    </div>
                    <div
                      className={`${styles.profile__btn__item} ${styles.profile__manual}`}
                    >
                      <p className={styles.profile__manualText}>
                        初めての方は、こちらをご覧ください。
                        <span className={styles.profile__manualArrow}>↓</span>
                      </p>
                      <button
                        className={`${styles.profile__btn} ${styles.profile__link__btn}`}
                        type="button"
                        onClick={() => navigateTo(`/pages/manual`)}
                      >
                        Manual
                      </button>
                    </div>
                    <div
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
                        disabled={isAccount}
                      >
                        {isLoggingOut ? "アカウント削除中.." : "退会"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}
