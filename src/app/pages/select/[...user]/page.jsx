"use client";
import Head from "next/head";
import { Search } from "@/app/components/molecules/Select/Search";

const SelectPage = ({ params }) => {
  console.log(params.user);
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
      <Search data={params.user} />
    </>
  );
};

export default SelectPage;
