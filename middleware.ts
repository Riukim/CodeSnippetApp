import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import type { NextRequest } from "next/server"

const isProtectedRoute = createRouteMatcher([
  "/my-snippets(.*)",
  "/trash(.*)",
  "/favorites(.*)",
])

export default clerkMiddleware(
  (auth, req: NextRequest) => {
    const url = req.nextUrl.clone()
    //console.log(url.origin);
    const newUrl = url.origin
    
    if (isProtectedRoute(req)) auth().protect({
      unauthenticatedUrl: newUrl,
      unauthorizedUrl: newUrl,
    })
  },
  { debug: true }
)

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
