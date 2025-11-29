// import { clerkMiddleware } from '@clerk/nextjs/server';

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };


import { clerkMiddleware } from "@clerk/nextjs/server";

// Export the middleware
export default clerkMiddleware();

// Configure which routes should be protected
export const config = {
  matcher: [
    // Protect all routes except Next.js internals and static files
    '/((?!.+\\.[\\w]+$|_next).*)',

    // Always run for API routes
    '/api/:path*',
  ],
};

