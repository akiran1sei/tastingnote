"use client";
import styles from "@/app/styles/Contents.module.css";
import Image from "next/image";

import Link from "next/link";

const Home = () => {
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

      <h1 className={styles.header_title_txt}>
        <span>Tasting Note</span>
      </h1>

      <nav className={styles.home_nav}>
        <button type="button" className={styles.home_login_btn}>
          <Link href={"/api/auth/signin"} passHref>
            loginページへ
          </Link>
        </button>
      </nav>
    </div>
  );
};

export default Home;
