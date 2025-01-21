import { SignInComponent } from "@/app/components/molecules/Auth/Sign/In";
import Head from "next/head";

const SingIn = () => {
  return (
    <>
      <Head>
        <title>SignInページ</title>
        <meta name="description" content="アプリにSignInするページです。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SignInComponent />
    </>
  );
};

export default SingIn;
