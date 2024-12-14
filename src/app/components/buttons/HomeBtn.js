"use client";
import { useRouter } from "next/navigation";
import Buttons from "@/app/styles/Btn.module.css";
import Image from "next/image";
import React, { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
export function HomeBtn() {
  const router = useRouter();
  const [isUserId, setIsUserId] = useState("");
  const [isUserEmail, setIsUserEmail] = useState("");
  const [isUserName, setIsUserName] = useState("");
  // useEffect(() => {
  //   const getUser = () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       if (token) {
  //         const decodedToken = jwtDecode(token);
  //         // デコードされたトークンから必要な情報を取得
  //         const userData = {
  //           id: decodedToken.id,
  //           username: decodedToken.user,
  //           email: decodedToken.email,
  //           // その他の必要な情報
  //         };
  //         setIsUserId(userData.id);
  //         setIsUserEmail(userData.email);
  //         setIsUserName(userData.username);
  //       } else {
  //         console.log("トークンが見つかりません");
  //         return null;
  //       }
  //     } catch (error) {
  //       console.error("トークンのデコードに失敗しました:", error);
  //       return null;
  //     }
  //   };

  //   getUser();
  // }, []);
  const navigateTo = (path) => {
    if (router.pathname !== path) {
      router.push(path);
    }
  };

  return (
    <button
      type="button"
      className={Buttons.icon_btn}
      onClick={() => navigateTo(`/pages/select/${isUserId}`)}
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
