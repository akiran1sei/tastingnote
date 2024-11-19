"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "@/app/styles/Contents.module.css";
import { jwtDecode } from "jwt-decode";
import { GlobalHeader } from "@/app/components/header/GlobalHeader";
const Profile = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAccountDelete, setIsAccountDelete] = useState(false);

  const [isUserId, setIsUserId] = useState("");
  const [isUserEmail, setIsUserEmail] = useState("");
  const [isUserName, setIsUserName] = useState("");
  const [isToken, setIsToken] = useState("");
  useEffect(() => {
    const getUser = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsToken(token);
        const decodedToken = jwtDecode(token);
        // デコードされたトークンから必要な情報を取得
        console.log(decodedToken);
        const userData = {
          id: decodedToken.id,
          username: decodedToken.user,
          email: decodedToken.email,
        };

        setIsUserId(userData.id);
        setIsUserEmail(userData.email);
        setIsUserName(userData.username);
      }
    };
    getUser();
  }, []);

  const handleTokenRemove = async () => {
    if (confirm("Sign Out？")) {
      setIsLoggingOut(true);
      try {
        const res = await fetch("/pages/api/auth/signout", {
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
          const res = await fetch(`/pages/api/auth/delete/${isUserId}`, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
            },
            body: JSON.stringify({ id: isUserId }),
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
        {isToken && (
          <div className={styles.profile_card}>
            <ul className={styles.profile_user_list}>
              <li className={styles.profile_user_item}>
                <span className={styles.profile_item_title}>username</span>
                <span className={styles.profile_item_value}>{isUserName}</span>
              </li>
              <li className={styles.profile_user_item}>
                <span className={styles.profile_item_title}>email</span>
                <span className={styles.profile_item_value}>{isUserEmail}</span>
              </li>
            </ul>
          </div>
        )}
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
