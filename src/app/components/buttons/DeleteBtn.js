import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Buttons from "@/app/styles/Btn.module.css";
import dotenv from "dotenv";
import { useSession } from "next-auth/react";
export function DeleteBtn(context) {
  const router = useRouter();
  dotenv.config();
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session) {
      setUserInfo(session.user);
    }
  }, [session, status]);
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (confirm("削除しますか？")) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/delete/` + `${context.data}`,
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
        return router.replace(
          `${process.env.NEXT_PUBLIC_URL}/pages/select/` + `${userInfo.email}`
        );
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
