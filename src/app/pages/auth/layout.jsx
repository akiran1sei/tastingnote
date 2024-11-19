import { AuthHeader } from "@/app/components/header/AuthHeader";

export default function PagesLayout({ children }) {
  return (
    <>
      <AuthHeader />
      {children}
    </>
  );
}
