"use client";
import home_styles from "@/app/styles/Home.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
export function HomePage() {
  const { data: session } = useSession();
  return (
    <>
      <div className={home_styles.home__bg}>
        <div className={home_styles.home__bg__wrap}>
          <Image
            className={home_styles.home__img}
            src="/images/tasting-img1540w.jpg"
            alt="テイスティング中の画像"
            width={1540}
            height={1027}
            priority
          />
        </div>
      </div>
      <div className={home_styles.home__bg__cover}></div>
      <h1 className={home_styles.home__title}>
        <span>Tasting Note</span>
      </h1>
      <nav className={home_styles.home__nav}>
        <ul className={home_styles.home__list}>
          {session ? (
            <li className={home_styles.home__list__item}>
              <button type="button" className={home_styles.home__btn}>
                <Link href={"/pages/user/profile"} passHref>
                  Start
                </Link>
              </button>
            </li>
          ) : (
            <li className={home_styles.home__list__item}>
              <button type="button" className={home_styles.home__btn}>
                <Link href={"/api/auth/signin"} passHref>
                  login
                </Link>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
