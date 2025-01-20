"use client";
import styles from "@/app/styles/Contents.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
export function HomePage() {
  const { data: session } = useSession();
  return (
    <>
      <div className={styles.home__bg}>
        <div className={styles.home__bg__wrap}>
          <Image
            className={styles.home__img}
            src="/images/tasting-img1540w.jpg"
            alt="テイスティング中の画像"
            width={1540}
            height={1027}
            priority
          />
        </div>
      </div>
      <div className={styles.home__bg__cover}></div>
      <h1 className={styles.home__title}>
        <span>Tasting Note</span>
      </h1>
      <nav className={styles.home__nav}>
        <ul className={styles.home__list}>
          {session ? (
            <li className={styles.home__list__item}>
              <button type="button" className={styles.home__btn}>
                <Link href={"/pages/user/profile"} passHref>
                  Start
                </Link>
              </button>
            </li>
          ) : (
            <li className={styles.home__list__item}>
              <button type="button" className={styles.home__btn}>
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
