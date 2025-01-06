"use client";
import styles from "@/app/styles/Contents.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Home = () => {
  const { data: session } = useSession();
  return (
    <div className={styles.home}>
      <div className={styles.home_bg}>
        <div className={styles.home_bg_wrap}>
          <Image
            className={styles.home_img}
            src="/images/tasting-img1540w.jpg"
            alt="テイスティング中の画像"
            width={1540}
            height={1027}
            priority
          />
        </div>
      </div>
      <div className={styles.home_bg_cover}></div>
      <h1 className={styles.home_title_txt}>
        <span>Tasting Note</span>
      </h1>

      <nav className={styles.home_nav}>
        {session ? (
          <button type="button" className={styles.home_login_btn}>
            <Link href={"/pages/user/profile"} passHref>
              Start
            </Link>
          </button>
        ) : (
          <button type="button" className={styles.home_login_btn}>
            <Link href={"/api/auth/signin"} passHref>
              login
            </Link>
          </button>
        )}
      </nav>
    </div>
  );
};

export default Home;
