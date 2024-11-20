import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Buttons from "@/app/styles/Btn.module.css";
import dotenv from "dotenv";
import { jwtDecode } from "jwt-decode";
export function DeleteBtn(context) {
  const router = useRouter();
  dotenv.config();
  const [isUserId, setIsUserId] = useState("");
  const [isUserEmail, setIsUserEmail] = useState("");
  const [isUserName, setIsUserName] = useState("");
  useEffect(() => {
    const getUser = () => {
      try {
        const token = localStorage.getItem("token");

        if (token) {
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
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (confirm("削除しますか？")) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/pages/api/delete/` +
            `${context.data}`,
          {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
            },
          }
        );
        const jsonData = await response.json();

        alert(jsonData.message);
       return window.location.reload()
     
      }
    } catch (err) {
      return alert("アイテム削除失敗/DeleteBtn");
    }
  }
  return (
    <>
      <button type="submit" onClick={handleSubmit} className={Buttons.icon_btn}>
        <Image
          src="/images/delete_img.svg"
          alt="削除ボタン"
          width={48}
          height={48}
          priority
        />
      </button>
    </>
  );
}
