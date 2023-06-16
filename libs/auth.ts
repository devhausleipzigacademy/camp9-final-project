// https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/

import { db } from "@/libs/db";
import { compare } from "bcryptjs";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      
      async authorize(credentials) { // <-- authorize has known typescript issue! https://github.com/nextauthjs/next-auth/issues/2709
        // credentials object has no username, password, etc
        if (!credentials?.username || !credentials.password) {
          return null;
        }
        
        const user = await db.user.findUnique({ // <-- get user object for username
          where: {
            name: credentials.username,
          },
        });
        
        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }
        console.log("OK until here");
        console.log({
          id: user.id,
          username: user.name,
          password: user.password
        });

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