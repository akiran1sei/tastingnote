import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // スコープの明示的な指定
      authorization: {
        params: {
          scope: "openid profile email",
          prompt: "consent", // 初回認証時に同意画面を必ず表示
          access_type: "offline", // リフレッシュトークンを取得
        },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  // デバッグモードを有効化
  // debug: true,

  // セッション設定
  session: {
    strategy: "jwt", // JWTストラテジーを明示的に指定
  },

  // コールバック設定
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },

  // ログ設定
  events: {
    async signIn(message) {
      console.log("Sign in", message);
    },
    async signOut(message) {
      console.log("Sign out", message);
    },
  },
});

export { handler as GET, handler as POST };
