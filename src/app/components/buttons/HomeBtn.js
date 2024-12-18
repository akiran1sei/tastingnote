"use client";
import { useRouter } from "next/navigation";
import Buttons from "@/app/styles/Btn.module.css";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
export function HomeBtn() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    if (status === "authenticated" && session) {
      setUserInfo(session.user);
    }
  }, [session, status]);
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
