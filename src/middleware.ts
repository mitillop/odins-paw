import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in',
  '/sign-up',
  '/api/chat/general'
])

export default clerkMiddleware(async (auth, req) => {
  const path = req.nextUrl?.pathname || '';
  
  if (path === '/' || isPublicRoute(req)) {
    return;
  } else {
    await auth.protect();
  }
})

export const config = {
  matcher: [
    '/((?!_next|sign-in|sign-up|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};