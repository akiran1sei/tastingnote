import Head from "next/head";

import { GlobalHeader } from "@/app/components/header/GlobalHeader";
import styles from "@/app/styles/Contents.module.css";

import { use } from "react";
import { Select } from "@/app/components/molecules/Select/Select";
const SelectPage = ({ params }) => {
  const id = use(params);
  return (
    <>
      <Head>
        <title>セレクションページ</title>
        <meta
          name="description"
          content="コーヒーをテイスティングするときに使用するアプリです。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <GlobalHeader />
      <section className={`${styles.select} ${styles.section}`}>
        <Select data={id.user} />
      </section>
    </>
  );
};

export default SelectPage;
