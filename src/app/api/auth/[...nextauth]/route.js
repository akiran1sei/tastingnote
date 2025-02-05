// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
// import GithubProvider from "next-auth/providers/github";
// import DiscordProvider from "next-auth/providers/discord";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { clientPromise } from "@/app/utils/database";
import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import bcrypt from "bcrypt";
const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectDB();

        const user = await UserModel.findOne({ email: credentials.email });
        const user_boolean = await bcrypt.compare(
          credentials.password,
          user.password
        );

        // If no error and we have user data, return it
        if (user_boolean) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid profile email",
          prompt: "select_account",
          access_type: "offline",
        },
      },
    }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),
    // DiscordProvider({
    //   clientId: process.env.DISCORD_CLIENT_ID,
    //   clientSecret: process.env.DISCORD_CLIENT_SECRET,
    // }),
  ],
  debug: true,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/pages/auth/sign-in",

    signOut: "/api/auth/signout",
    error: "/api/auth/error",
  },
  events: {
    async signIn(message) {
      console.log("Sign in", message);
    },
    async signOut(message) {
      console.log("Sign out event:", message);
    },
  },
});

export { handler as GET, handler as POST };
