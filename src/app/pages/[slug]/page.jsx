"use client";
import Head from "next/head";
import { Browse } from "@/app/components/molecules/Browse/Browse";
import useSWR from "swr";
import { use } from "react";
import { GlobalHeader } from "@/app/components/header/GlobalHeader";
import styles from "@/app/styles/Contents.module.css";
const CoffeeSingleItem = ({ params }) => {
  const id = use(params);

  const { data, error } = useSWR(`/api/singleitem/${id.slug}`, fetcher, {
    initial: true, // 初回レンダリング時に必ず更新
    onBackgroundUpdate: true, // バックグラウンドで再読み込み
    revalidateOnMount: true, // マウント時に再検証
    revalidateOnReconnect: true, // 再接続時に再検証
  });

  if (error) return <div>エラーが発生しました: {error.message}</div>;
  if (!data) return <div>データを取得中...</div>;

  return (
    <>
      <Head>
        <title>個別ページ</title>
        <meta
          name="description"
          content="コーヒーをテイスティングするときに使用するアプリです。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalHeader />
      <section className={`${styles.browse} ${styles.section}`}>
        <Browse data={data} />
      </section>
    </>
  );
};

const fetcher = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export default CoffeeSingleItem;
