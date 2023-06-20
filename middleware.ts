export { default } from "next-auth/middleware";

export const config = {
  matcher: [ // <-- matched paths are route protected
    '/middlewareProtected',
    '/alsoprotected'
  ]
};