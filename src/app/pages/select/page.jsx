import Head from "next/head";
import { use } from "react";
import { SelectComponent } from "@/app/components/molecules/Select/Select";
const SelectPage = ({ params }) => {
  const id = use(params);
  return (
    <>
      <Head>
        <title>Selectページ</title>
        <meta
          name="description"
          content="作成したデータを全て閲覧できるページです。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SelectComponent data={id.user} />
    </>
  );
};

export default SelectPage;
