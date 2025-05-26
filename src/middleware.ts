import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define todas las rutas públicas que no requieren autenticación
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in',
  '/sign-up',
  '/api/chat/general'
])

export default clerkMiddleware(async (auth, req) => {
  // Verifica explícitamente si la ruta es pública antes de protegerla
  const path = req.nextUrl?.pathname || '';
  
  if (path === '/' || isPublicRoute(req)) {
    // Permite acceso a rutas públicas
    return;
  } else {
    // Protege todas las demás rutas
    await auth.protect();
  }
})

export const config = {
  matcher: [
    // Excluye los archivos estáticos y rutas específicas
    '/((?!_next|sign-in|sign-up|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Siempre ejecuta para rutas de API
    '/(api|trpc)(.*)',
  ],
};