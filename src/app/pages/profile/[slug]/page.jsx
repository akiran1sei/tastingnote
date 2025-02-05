import { ProfileComponent } from "@/app/components/molecules/Profile/Profile";
import Head from "next/head";
const Profile = () => {
  return (
    <>
      <Head>
        <title>Profileページ</title>
        <meta
          name="description"
          content="アカウントユーザーのプロフィールページです。"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ProfileComponent />
    </>
  );
};

export default Profile;
