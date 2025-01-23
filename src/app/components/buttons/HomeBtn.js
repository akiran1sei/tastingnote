"use client";
import { useRouter } from "next/navigation";
import Buttons from "@/app/styles/Btn.module.css";
import Image from "next/image";
import React from "react";
import { useSession } from "next-auth/react";

export function HomeBtn() {
  const router = useRouter();

  const navigateTo = (path) => {
    if (router.pathname !== path) {
      router.push(path);
    }
  };

  return (
    <button
      type="button"
      className={Buttons.icon_btn}
      onClick={() => navigateTo(`/pages/select`)}
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
