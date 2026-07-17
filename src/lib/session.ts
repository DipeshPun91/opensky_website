import { cache } from "react";
import { cookies } from "next/headers";
import {
  verifySessionToken,
  SESSION_COOKIE_NAME,
  type AdminSessionPayload,
} from "./auth";

// This file is DELIBERATELY separate from lib/auth.ts. It uses
// cookies() from next/headers, which only works in Server Components /
// Route Handlers, not in Edge Middleware. middleware.ts must only ever
// import from ./auth — never from this file — or the Edge bundle breaks
// (this is exactly what caused the "must export a function" middleware
// error a while back, before this split existed).
//
// Wrapped in React's cache() so calling this from multiple places in
// the same request (a layout AND a page, for example) only actually
// reads the cookie and verifies the JWT once — later calls in the same
// render just reuse the result.
export const getAdminSession = cache(
  async (): Promise<AdminSessionPayload | null> => {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return null;
    return verifySessionToken(token);
  },
);
