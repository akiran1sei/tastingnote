"use client";
import { useRouter } from "next/navigation";
import Buttons from "@/app/styles/Btn.module.css";
import Image from "next/image";

export function EditBtn(context) {
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
      onClick={() => navigateTo(`/pages/update/${context.data}`)}
    >
      <Image
        src="/images/svg/edit_img.svg"
        alt="編集ボタン"
        width={48}
        height={48}
        priority
      />
    </button>
  );
}
