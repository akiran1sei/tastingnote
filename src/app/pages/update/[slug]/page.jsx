import Head from "next/head";
import styles from "@/app/styles/Contents.module.css";
import { Update } from "@/app/components/molecules/Update/Update";
import useSWR from "swr";
import { useState, useEffect } from "react";

const UpdatePage = ({ params }) => {
  const { slug } = params;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = async () => {
      setIsLoggedIn(!!token);
    };
    checkToken();
  }, [token]);

  const { data, error } = useSWR(`/pages/api/singleitem/${slug}`, fetcher, {
    // revalidateOnFocus: false,
    // revalidateOnReconnect: false,
  });

  if (error) return <div>エラーが発生しました: {error.message}</div>;
  if (!data) return <div>データを取得中...</div>;

  const singleData = data.singleItem;

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
      <Update data={singleData} />
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

export default UpdatePage;
