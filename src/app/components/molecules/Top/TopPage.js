"use client";

import top from "@/app/styles/Top.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
export function TopComponent() {
  const { data: session } = useSession();
  return (
    <>
      <div className={top.top__bg}>
        <div className={top.top__bg__wrap}>
          <Image
            className={top.top__img}
            src="/images/tasting-img1540w.jpg"
            alt="テイスティング中の画像"
            width={1540}
            height={1027}
            priority
          />
        </div>
      </div>
      <div className={top.top__bg__cover}></div>
      <h1 className={top.top__title}>
        <span>Tasting Note</span>
      </h1>
      <nav className={top.top__nav}>
        <ul className={top.top__list}>
          {session ? (
            <li className={top.top__list__item}>
              <button type="button" className={top.top__btn}>
                <Link href={"/pages/user/profile"} passHref>
                  Start
                </Link>
              </button>
            </li>
          ) : (
            <li className={top.top__list__item}>
              <button type="button" className={top.top__btn}>
                <Link href={"/api/auth/signin"} passHref>
                  SignIn
                </Link>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
