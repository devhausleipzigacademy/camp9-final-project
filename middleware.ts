export { default } from "next-auth/middleware";

export const config = {
  // matched paths are route protected
  matcher: [
    '/middlewareProtected',
  ]
};