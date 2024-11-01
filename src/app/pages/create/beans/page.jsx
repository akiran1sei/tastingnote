"use client";

import Head from "next/head";
import styles from "@/app/styles/Contents.module.css";
import { BeansCreateTable } from "@/app/components/molecules/Create/Create_ver-2";
import useSWR from "swr";
import { useState, useEffect } from "react";

const tags = ["group-choice"]; // データソースのタグ
const BeansCreatePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = async () => {
      // トークンの有効性検証（必要であれば追加）
      setIsLoggedIn(!!token);
    };
    checkToken();
  }, [token]);

  const { data, error } = useSWR(`/pages/api/group/choice`, fetcher, {
    // initialData: null, // 初期データをnullにする
    revalidateOnFocus: false, // フォーカス時に再検証しない
    revalidateOnReconnect: false, // 再接続時に再検証しない
  });

  if (error) return <div>データの取得に失敗しました。再度お試しください。</div>;
  if (!data) return <div>データを取得中です...</div>;

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
