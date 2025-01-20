"use client";
import { GroupCreate } from "@/app/components/molecules/Group/Group";
import Head from "next/head";
import useSWR from "swr";
import styles from "@/app/styles/Contents.module.css";
import { GlobalHeader } from "@/app/components/header/GlobalHeader";

const GroupPage = () => {
  const { data, error } = useSWR(`/api/group/choice`, fetcher, {
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
        <title>グループ作成ページ</title>
        <meta
          name="description"
          content="グループ作成、または、選択するページです。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalHeader />
      <section className={`${styles.group} ${styles.section}`}>
        <GroupCreate data={data} />
      </section>
    </>
  );
  // return isLoggedIn ? (
  //   <>
  //     <Head>
  //       <title>グループ作成ページ</title>
  //       <meta
  //         name="description"
  //         content="グループ作成、または、選択するページです。"
  //       />
  //       <meta name="viewport" content="width=device-width, initial-scale=1" />
  //     </Head>
  //     <GlobalHeader />
  //     <GroupCreate data={data} user={isUserId} />
  //   </>
  // ) : (
  //   <>
  //     <GlobalHeader />
  //     <div className={styles.sign_off_page}>
  //       <p className={styles.sign_off_text}>ログインしてください。</p>
  //     </div>
  //   </>
  // );
};

const fetcher = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export default GroupPage;
