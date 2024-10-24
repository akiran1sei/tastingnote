import Head from "next/head";

import { Select } from "@/app/components/molecules/Select/Select";

const SelectPage = (params, searchParams) => {
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
      <Select />
    </>
  );
};

export default SelectPage;
