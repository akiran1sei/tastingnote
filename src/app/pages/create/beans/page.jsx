import { BeansComponent } from "@/app/components/molecules/Create/Create";
import Head from "next/head";
const BeansCreatePage = () => {
  return (
    <>
      <Head>
        <title>Createページ</title>
        <meta
          name="description"
          content="焙煎した珈琲豆の品質を記述するページです。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <BeansComponent />
    </>
  );
};

export default BeansCreatePage;
