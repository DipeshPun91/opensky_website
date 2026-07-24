import { NextResponse, type NextRequest } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth/auth";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Only guard the actual protected admin pages — the login page itself
// must stay reachable without a session, or nobody could ever log in.
// Add more protected admin routes to this list as you build them out.
export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
