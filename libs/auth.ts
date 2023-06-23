// https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/

import { db } from '@/libs/db';
import { compare } from 'bcrypt';
import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt', // <-- JWT used for session management
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      // authorize has known typescript issue! https://github.com/nextauthjs/next-auth/issues/2709
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) {
          throw new Error('Please enter username and password');
        }

        const user = await db.user.findUnique({
          // <-- get user object for given user
          where: {
            name: credentials.username,
          },
        });

        // use bcrypt to compare stored password hash and password submitted to credentials
        if (!user || !(await compare(credentials.password, user.password))) {
          throw new Error('Invalid password');
        }

        // if everything successful, return JWT
        return {
          id: user.id,
          username: user.name,
          password: user.password,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login', // <-- specify custom login page
  },
  callbacks: {
    jwt: async ({ token }) => {
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.sub; // <-- write token id object to session (?)
      return session; //
    },
  },
};
