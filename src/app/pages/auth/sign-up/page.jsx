import { SignUpComponent } from "@/app/components/molecules/Auth/Sign/Up";
import Head from "next/head";
const SignUp = () => {
  return (
    <>
      <Head>
        <title>SignUpページ</title>
        <meta name="description" content="アカウント登録するページです。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SignUpComponent />
    </>
  );
};
export default SignUp;
