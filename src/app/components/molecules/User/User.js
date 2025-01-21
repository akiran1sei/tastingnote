"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/Pages.module.css";

import { LoadingSkeleton } from "@/app/components/molecules/LoadingSkeleton/LoadingSkeleton";
import { Uncertified } from "@/app/components/molecules/Uncertified/Uncertified";
import { useSession, signOut } from "next-auth/react";
import { GlobalHeader } from "@/app/components/header/GlobalHeader";
import Link from "next/link";
export function ProfileComponent() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAccountDelete, setIsAccountDelete] = useState(false);
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUserName] = useState("");
  const [isUserEmail, setIsUserEmail] = useState("");

  const handleAccountDelete = async () => {
    if (confirm("Account Delete？")) {
      if (confirm("作成したデータ全て削除しますがよろしいでしょうか？")) {
        setIsAccountDelete(true);
        try {
          const res = await fetch(`/api/auth/delete/${isUserEmail}`, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
            },
            body: JSON.stringify({ email: isUserEmail }),
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
      setIsUserEmail(session.user.email);
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
            <ul className={styles.profile__user__list}>
              <li className={styles.profile__user__item}>
                <span className={styles.profile__item__title}>username</span>
                <span className={styles.profile__item__value}>{username}</span>
              </li>
              <li className={styles.profile__user__item}>
                <span className={styles.profile__item__title}>email</span>
                <span className={styles.profile__item__value}>
                  {isUserEmail}
                </span>
              </li>
            </ul>
          </div>
          {/* )} */}
          <div className={styles.profile__btn__box}>
            <ul className={styles.profile__btn__list}>
              <li className={styles.profile__btn__item}>
                <button
                  className={`${styles.profile__btn} ${styles.profile__signout__btn}`}
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? "ログアウト中..." : "SignOut"}
                </button>
              </li>
              <li className={styles.profile__btn__item}>
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
              </li>
              <li className={styles.profile__btn__item}>
                <button
                  className={`${styles.profile__btn} ${styles.profile__delete__btn}`}
                  type="button"
                  onClick={handleAccountDelete}
                  disabled={isAccountDelete}
                >
                  {isLoggingOut ? "データ 削除中.." : "全データ 削除"}
                </button>
              </li>
            </ul>
          </div>
          <p className={styles.caution__text}>
            こちらの全データ削除について、
            <br />
            アカウントを含む全データを削除するのは、emailとpasswordを利用したユーザーのみになります。SNS認証のアカウントの方は、ユーザーデータ以外のデータが削除されます。
          </p>
        </div>
      </>
    );
  }
}
