"use client";
import { use } from "react";

import Head from "next/head";
import styles from "@/app/styles/Contents.module.css";
import { Update } from "@/app/components/molecules/Update/Update";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { GlobalHeader } from "@/app/components/header/GlobalHeader";
import { jwtDecode } from "jwt-decode";
const UpdatePage = ({ params }) => {
  const id = use(params);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isUserId, setIsUserId] = useState("");
  const [isUserEmail, setIsUserEmail] = useState("");
  const [isUserName, setIsUserName] = useState("");

  useEffect(() => {
    const getUser = () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const token = localStorage.getItem("token");

          const decodedToken = jwtDecode(token);
          // デコードされたトークンから必要な情報を取得
          const userData = {
            id: decodedToken.id,
            username: decodedToken.user,
            email: decodedToken.email,
            // その他の必要な情報
          };
          setIsUserId(userData.id);
          setIsUserEmail(userData.email);
          setIsUserName(userData.username);
          setIsLoggedIn(!!token);
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
  });

  const { data: itemData, error: itemError } = useSWR(
    `/api/singleitem/${id.slug}`,
    fetcher,
    {
      initial: true, // 初回レンダリング時に必ず更新
      onBackgroundUpdate: true, // バックグラウンドで再読み込み
      revalidateOnMount: true, // マウント時に再検証
      revalidateOnReconnect: true, // 再接続時に再検証
    }
  );

  // 2つ目のuseSWR - グループ情報の取得
  const { data: groupsData, error: groupsError } = useSWR(
    `/api/group/choice`,
    fetcher,
    {
      initial: true, // 初回レンダリング時に必ず更新
      onBackgroundUpdate: true, // バックグラウンドで再読み込み
      revalidateOnMount: true, // マウント時に再検証
      revalidateOnReconnect: true, // 再接続時に再検証
    }
  );

  // エラーハンドリング
  if (itemError || groupsError) return <div>エラーが発生しました</div>;
  if (!itemData || !groupsData) return <div>データを取得中...</div>;
  const singleData = itemData.singleItem;
  const GroupData = groupsData.groups;

  return isLoggedIn ? (
    <>
      <Head>
        <title>編集ページ</title>
        <meta
          name="description"
          content="コーヒーをテイスティングするときに使用するアプリです。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalHeader />
      <Update data={singleData} groups={GroupData} item={singleData} />
    </>
  ) : (
    <>
      <GlobalHeader />
      <div className={styles.sign_off_page}>
        <p className={styles.sign_off_text}>ログインしてください。</p>
      </div>
    </>
  );
};

const fetcher = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export default UpdatePage;
