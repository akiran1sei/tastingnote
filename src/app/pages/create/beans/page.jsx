"use client";

import { useState, useEffect } from "react";
import styles from "@/app/styles/Contents.module.css";
import { BeansCreateTable } from "@/app/components/molecules/Create/Create_ver-2";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { GlobalHeader } from "@/app/components/header/GlobalHeader";
const BeansCreatePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/signin");
          return;
        }
        setIsLoggedIn(true);
      } catch (error) {
        console.error("認証チェックエラー:", error);
        router.push("/signin");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const fetcher = async (url) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-store",
        },
      });

      if (!response.ok) {
        throw new Error("データの取得に失敗しました");
      }

      return response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };

  const { data, error } = useSWR(
    `/api/group/choice`,
    // isLoggedIn ? `/api/group/choice` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        データの取得に失敗しました。再度お試しください。
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className={styles.sign_off_page}>
        <p className={styles.sign_off_text}>ログインが必要です。</p>
      </div>
    );
  }

  if (!data) {
    return <div className={styles.loading}>データを取得中です...</div>;
  }

  return (
    <>
      <GlobalHeader />
      <BeansCreateTable data={data} />
    </>
  );
};

export default BeansCreatePage;
