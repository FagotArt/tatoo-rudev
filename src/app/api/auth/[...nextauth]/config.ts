import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/lib/models/user";

export const authOptions: NextAuthOptions = {
    secret: process.env.JWTSECRET,
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {
          username: { label: "Username", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          //database auth
          if (!credentials?.username || !credentials.password) return null;
  
          const user = await User.findOne({ username: credentials.username });
  
          if (user && bcrypt.compareSync(credentials.password, user.password)) {
            return user.toObject();
          }
          return null;
        },
      }),
    ],
    callbacks: {
      async jwt({ token, trigger, user }: any) {
        if (token.user) {
          // fetch user from db and add to token
          const dbuser = await User.findById(token.user._id);
          token.user = dbuser.toObject();
        }
  
        if (user) {
          token.user = user;
        }
  
        return token;
      },
      async session({ session, trigger, token }: any) {
        if (token?.user) {
          session.user = token.user;
        }
  
        return session;
      },
    },
  };