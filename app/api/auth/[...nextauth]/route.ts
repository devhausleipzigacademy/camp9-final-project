// https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/

import { authOptions } from "@/libs/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };