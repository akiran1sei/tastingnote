//utils/useAuth.js
import { useRouter } from "next/navigation";
import { jwtVerify } from "jose";
import { useState, useEffect } from "react";
import dotenv from "dotenv";

dotenv.config();
const useAuth = () => {
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      // '/pages/auth/signin'以外のURLでの処理
      if (!token) {
        router.push("/pages/auth/signin");
      }
      try {
        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);
        const decodedJwt = await jwtVerify(token, secretKey);
        setLoginUserEmail(decodedJwt.payload.email);
      } catch (error) {
        router.push("/pages/auth/signin");
      }
    };
    checkToken();
  }, [router]);
  return loginUserEmail;
};
export default useAuth;
