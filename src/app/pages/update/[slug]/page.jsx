"use client";
import { use } from "react";

import Head from "next/head";
import { UpdateComponent } from "@/app/components/molecules/Update/Update";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
const UpdatePage = ({ params }) => {
  const id = use(params);

  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    if (status === "authenticated" && session) {
      setUserInfo(session.user);
    }
  }, [session, status]);

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
  return (
    <>
      <Head>
        <title>編集ページ</title>
        <meta
          name="description"
          content="コーヒーをテイスティングするときに使用するアプリです。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <UpdateComponent data={singleData} groups={GroupData} item={singleData} />
    </>
  );
};

const fetcher = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export default UpdatePage;
