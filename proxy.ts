import type { Session } from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { auth } from "@/auth";

type NextAuthRequest = NextRequest & { auth: Session | null };

function redirectToSignIn(req: NextRequest) {
  const signInUrl = new URL("/signin", req.url);
  signInUrl.searchParams.set("callbackUrl", req.url);
  return NextResponse.redirect(signInUrl);
}

function getClientUserIdFromPath(pathname: string) {
  // "/client/:userId" => userId
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] !== "client") return null;
  return parts[1] ?? null;
}

const proxy = auth((req: NextAuthRequest) => {
  const pathname = req.nextUrl.pathname;
  const session = req.auth;

  if (pathname.startsWith("/dashboard")) {
    if (!session) return redirectToSignIn(req);
    if (session.user.role !== "ADMIN") return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }

  if (pathname.startsWith("/client")) {
    if (!session) return redirectToSignIn(req);

    if (pathname === "/client" || pathname === "/client/") {
      return NextResponse.redirect(new URL(`/client/${session.user.id}`, req.url));
    }

    const userId = getClientUserIdFromPath(pathname);
    if (userId) {
      const isAdmin = session.user.role === "ADMIN";
      if (!isAdmin && session.user.id !== userId) return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
});

export default proxy;

export const config = {
  matcher: ["/dashboard/:path*", "/client/:path*"],
};

