export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    // \/-- matched paths are route protected
    '/closed',
    '/mypolls',
    '/new',
    '/pending',
    '/create',
    '/details/:path*',
    '/results',
    '/settings',
    '/voting',
  ],
};

// I tried to make redirection work, but it messes a lot of stuff up! - Mora
// export function middleware(request: NextRequest) {
//   console.log('Hello from middleware!');
//   console.log(request.nextUrl.pathname);
//   if (
//     /\/details\/.*/.test(request.nextUrl.pathname) &&
//     !/\/details\/.*\/.*/.test(request.nextUrl.pathname)
//   ) {
//     return NextResponse.redirect(
//       new URL(`${request.nextUrl.pathname}/1`, request.url)
//     );
//   }
// }
