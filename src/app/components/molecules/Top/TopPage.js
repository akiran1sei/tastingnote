"use client";
import { LoadingSkeleton } from "@/app/components/molecules/LoadingSkeleton/LoadingSkeleton";
import { Uncertified } from "@/app/components/molecules/Uncertified/Uncertified";

import top from "@/app/styles/Top.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
export function TopComponent() {
  const { data: session, status } = useSession();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    if (status === "authenticated" && session) {
      setUserInfo(session.user);
      setUserName(session.user.name);
      setUserEmail(session.user.email);
      setIsLoading(false);
    } else if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [session, status]);
  const renderTopContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    } else if (status === "unauthenticated") {
      return (
        <>
          <nav className={top.top__nav}>
            <ul className={top.top__list}>
              <li className={top.top__list__item}>
                <button type="button" className={top.top__btn}>
                  <Link href={"/api/auth/signin"} passHref>
                    SignIn
                  </Link>
                </button>
              </li>
            </ul>
          </nav>
        </>
      );
    } else {
      return (
        <>
          <nav className={top.top__nav}>
            <ul className={top.top__list}>
              <li className={top.top__list__item}>
                <button type="button" className={top.top__btn}>
                  <Link href={`/pages/profile/${userInfo.id}`} passHref>
                    Start
                  </Link>
                </button>
              </li>
            </ul>
          </nav>
        </>
      );
    }
  };
  const topContent = renderTopContent();
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
      {topContent}
    </>
  );
}
