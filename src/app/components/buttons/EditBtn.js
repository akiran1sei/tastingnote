"use client";
import { useRouter } from "next/navigation";
import Buttons from "@/app/styles/Btn.module.css";
import Image from "next/image";
import Link from "next/link";
export function EditBtn(context) {
  const router = useRouter();

  return (
    <button type="button" className={Buttons.icon_btn}>
      <Link href={`/pages/update/${context.data}`} scroll={false} passHref>
        <Image
          src="/images/edit_img.svg"
          alt="編集ボタン"
          width={48}
          height={48}
          priority
        />
      </Link>
    </button>
  );
}
