// https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/

import { db } from "@/libs/db";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      
      async authorize(credentials) { // <-- authorize has known typescript issue! https://github.com/nextauthjs/next-auth/issues/2709
        if (!credentials?.username || !credentials.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: {
            name: credentials.username,
          },
        });

        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        return {
          id: user.id,
          username: user.name,
          password: user.password
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  }
};