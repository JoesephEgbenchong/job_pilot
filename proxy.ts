import { updateSession } from "@insforge/sdk/ssr/middleware";
import type { CookieStore } from "@insforge/sdk/ssr/middleware";
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/dashboard", "/profile", "/find-jobs"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  const requestCookies: CookieStore = {
    get: (name: string) => request.cookies.get(name)?.value,
  };

  const sessionResult = await updateSession({
    requestCookies,
    responseCookies: response.cookies as unknown as CookieStore,
  });

  if (!sessionResult.accessToken) {
    const loginUrl = new URL("/login", request.url);
    if (pathname.startsWith("/")) {
      loginUrl.searchParams.set("next", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/find-jobs/:path*",
  ],
};
