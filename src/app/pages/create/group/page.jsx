"use client";
import { GroupCreate } from "@/app/components/molecules/Group/Group";
import Head from "next/head";
import useSWR from "swr";
import { useState, useEffect } from "react";
import styles from "@/app/styles/Contents.module.css";
import { jwtDecode } from "jwt-decode";

const GroupPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
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
      setIsUser(userData);
    } catch (error) {
      console.error("トークンのデコードに失敗しました:", error);
      return null;
    }

    setIsLoggedIn(!!token);
  }, []);
  console.log(isUser);
  const { data, error } = useSWR(`/pages/api/group/chioce`, fetcher, {
    initial: true, // 初回レンダリング時に必ず更新
    onBackgroundUpdate: true, // バックグラウンドで再読み込み
    revalidateOnMount: true, // マウント時に再検証
    revalidateOnReconnect: true, // 再接続時に再検証
  });

  if (error) return <div>エラーが発生しました: {error.message}</div>;
  if (!data) return <div>データを取得中...</div>;

  return isLoggedIn ? (
    <>
      <Head>
        <title>グループ作成ページ</title>
        <meta
          name="description"
          content="グループ作成、または、選択するページです。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GroupCreate data={data} user={isUser} />
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

export default GroupPage;
