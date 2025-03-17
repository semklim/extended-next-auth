export default async function middleware() {
  // Middleware implementation will be added later
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Skip Next.js internals [_next, monitoring, api] and all static files, unless found in search params
    '/((?!_next|monitoring|api|robots|sitemap|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|mp4|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

    // Always run for API routes
    // '/(api|trpc)(.*)',
  ],
};
