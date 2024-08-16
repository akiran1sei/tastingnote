"use client";
import { useRouter } from "next/navigation";
import Buttons from "@/app/styles/Btn.module.css";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
export function HomeBtn() {
  const router = useRouter();

  const [isUser, setIsUser] = useState("");
  useEffect(() => {
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
    const UserInformation = getUser();
    setIsUser(UserInformation.id);
  }, []);

  return (
    <button
      type="button"
      className={Buttons.icon_btn}
      onClick={() => router.replace(`/pages/select/${isUser}?user=`)}
    >
      <Image
        src="/images/home_img.svg"
        alt="Homeボタン"
        width={24}
        height={24}
        priority
      />
    </button>
  );
}
