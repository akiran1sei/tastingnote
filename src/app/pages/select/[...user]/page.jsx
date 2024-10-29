"use client";
import Head from "next/head";
import { Search } from "@/app/components/molecules/Select/Search";
import { use } from "react";
const SelectPage = ({ params }) => {
  const id = use(params);
  console.log(id.user);
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
      <Search data={id.user} />
    </>
  );
};

export default SelectPage;
