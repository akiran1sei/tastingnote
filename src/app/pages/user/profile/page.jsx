"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/Contents.module.css";
import { useSession } from "next-auth/react";
import { GlobalHeader } from "@/app/components/header/GlobalHeader";
const Profile = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAccountDelete, setIsAccountDelete] = useState(false);
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    if (status === "authenticated" && session) {
      setUserInfo(session.user);
    }
  }, [session, status]);

  const handleTokenRemove = async () => {
    if (confirm("Sign Out？")) {
      setIsLoggingOut(true);
      try {
        const res = await fetch("/api/auth/signout", {
          cache: "no-store",
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const jsonData = await res.json();
        localStorage.removeItem("token");

        alert(jsonData.message);
        return router.push("/");
      } catch (error) {
        console.error("ログアウトエラー:", error);
        // ユーザーにエラーメッセージを表示するなど
        alert("ログアウト中にエラーが発生しました。");
      } finally {
        setIsLoggingOut(false);
      }
    }
  };
  const handleAccountDelete = async () => {
    if (confirm("Account Delete？")) {
      if (confirm("作成したデータ全て削除しますがよろしいでしょうか？")) {
        setIsAccountDelete(true);
        try {
          const res = await fetch(`/api/auth/delete/${userInfo.email}`, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
            },
            body: JSON.stringify({ email: userInfo.email }),
          });
          const jsonData = await res.json();
          localStorage.removeItem("token");

          alert(jsonData.message);

          router.push("/");
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

  return (
    <>
      <GlobalHeader />
      <div className={styles.profile_page}>
        {/* {session && ( */}
        <div className={styles.profile_card}>
          <ul className={styles.profile_user_list}>
            <li className={styles.profile_user_item}>
              <span className={styles.profile_item_title}>username</span>
              <span className={styles.profile_item_value}>{userInfo.name}</span>
            </li>
            <li className={styles.profile_user_item}>
              <span className={styles.profile_item_title}>email</span>
              <span className={styles.profile_item_value}>
                {userInfo.email}
              </span>
            </li>
          </ul>
        </div>
        {/* )} */}
        <div className={styles.profile_btn_box}>
          <ul className={styles.profile_btn_list}>
            <li className={styles.profile_btn_item}>
              <button
                className={`${styles.profile_btn} ${styles.profile_signout_btn}`}
                type="button"
                onClick={handleTokenRemove}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? "ログアウト中..." : "SignOut"}
              </button>
            </li>
            <li className={styles.profile_btn_item}>
              <button
                className={`${styles.profile_btn} ${styles.profile_delete_btn}`}
                type="button"
                onClick={handleAccountDelete}
                disabled={isAccountDelete}
              >
                {isLoggingOut ? "アカウント 削除中.." : "Account Delete"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Profile;
