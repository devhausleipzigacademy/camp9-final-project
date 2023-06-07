import { PrismaAdapter } from '@auth/prisma-adapter';
import { AuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { Adapter } from 'next-auth/adapters';

import { db } from './db';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  //enables the interaction with the database

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      //allows user to authenticate with username and password

      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Please enter username and password');
        }
        //this function is called when a user attempts to authenticate
        // it receives an object containing the username and password
        //the if statement makes sure that both username and password are filled out


        const user = await db.user.findUnique({
          where: {
            userName: credentials.username,
          },
        });
        //this function finds the user in the database that matches the username
        if (!user || !user.password) {
          throw new Error('No user found');
        }
        //if no user is found, an error is thrown

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        //this compares the provided password with the hashed password stored in the database

        if (!isValid) {
          throw new Error('Invalid password');
        }
        //if the passwords don't match, an error is thrown

        return user;
        //If the username and password are valid, the function returns the user object.
      },
    }),
  ],
  pages: {
    signIn: '/login',
    //defines the authentication-related pages for the application
    //the signIn property is set to '/login' which means the sign-in page will be located at /login of the application.

  },
  session: {
    strategy: 'jwt',
  },
  // indicating that JSON Web Tokens (JWT) will be used for session management.

  secret: process.env.NEXTAUTH_SECRET!,
  //secret key for signing and verifying JWTs.
};



export const getUserData = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return null;
  const user = await db.user.findUnique({
    where: {
      name: session.user.name as string,
    },
  });
  return user;
};
// function can be useful when you need to retrieve the user data associated with the current session. 
//It allows you to fetch additional information about the authenticated user, such as their profile details 
    // or any other related data stored in the user table of the database
