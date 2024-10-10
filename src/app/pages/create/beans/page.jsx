"use client";
import Head from "next/head";
import styles from "@/app/styles/Contents.module.css";
import { BeansCreate } from "@/app/components/molecules/Create/Create";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { BeansCreateTable } from "@/app/components/molecules/Create/Create_table";
const tags = ["group-choice"]; // データソースのタグ
const BeansCreatePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);
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
        <title>新規作成ページ</title>
        <meta
          name="description"
          content="コーヒーをテイスティングするときに使用するアプリです。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* <BeansCreate data={data} /> */}
      <BeansCreateTable data={data} />
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

export default BeansCreatePage;
