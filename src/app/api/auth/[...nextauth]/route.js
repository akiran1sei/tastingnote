import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import LineProvider from "next-auth/providers/line";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // スコープの明示的な指定
      authorization: {
        params: {
          scope: "openid profile email",
          prompt: "select_account",
          access_type: "offline", // リフレッシュトークンを取得
        },
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID,
      clientSecret: process.env.LINE_CLIENT_SECRET,
    }),
  ],
  // デバッグモードを有効化
  debug: true,

  // セッション設定
  session: {
    strategy: "jwt", // JWTストラテジーを明示的に指定
  },
  secret: process.env.NEXTAUTH_SECRET,
  // コールバック設定
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  // ログ設定
  events: {
    async signIn(message) {
      console.log("Sign in", message);
    },
    async signOut(message) {
      console.log("Sign out event:", message);
      // 必要に応じて、セッション情報などをログに出力
    },
  },
});

export { handler as GET, handler as POST };
