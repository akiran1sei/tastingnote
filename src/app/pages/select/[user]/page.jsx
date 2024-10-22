"use client";
import Head from "next/head";
import { useState, useEffect } from "react";
import { Select } from "@/app/components/molecules/Select/Select";
import useSWR from "swr";
import styles from "@/app/styles/Contents.module.css";
import { jwtDecode } from "jwt-decode";
import dotenv from "dotenv";
const SelectPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUser, setIsUser] = useState("");
  const [isItem, setIsItem] = useState("");
  dotenv.config();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
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
      const urlParams = new URLSearchParams(window.location.search);
      const ItemId = urlParams.get("user");
      setIsItem(ItemId);
      const UserInformation = getUser();
      setIsUser(UserInformation.id);
    }
  }, []);

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/pages/api/readall/${isUser}?user=${isItem}`,
    // `/pages/api/readall/${isUser}?user=${search}`,
    fetcher,
    {
      initial: true, // 初回レンダリング時に必ず更新
      onBackgroundUpdate: true, // バックグラウンドで再読み込み
      revalidateOnMount: true, // マウント時に再検証
      revalidateOnReconnect: true, // 再接続時に再検証
    }
  );

  if (error) return <div>エラーが発生しました: {error.message}</div>;
  if (!data) return <div>データを取得中...</div>;

  return isLoggedIn ? (
    <>
      <Head>
        <title>セレクションページ</title>
        <meta
          name="description"
          content="コーヒーをテイスティングするときに使用するアプリです。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Select data={data} />
    </>
  ) : (
    <div className={styles.sign_off_page}>
      <p className={styles.sign_off_text}>ログインしてください。</p>
    </div>
  );
};

const fetcher = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export default SelectPage;
