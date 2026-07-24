import { SignJWT, jwtVerify } from "jose";

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error(
    "Missing JWT_SECRET environment variable. Add it to .env.local.",
  );
}
const secretKey = new TextEncoder().encode(jwtSecret);

export const SESSION_COOKIE_NAME = "osp_admin_session";
const SESSION_DURATION = "8h";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

export interface AdminSessionPayload {
  adminId: string;
  username: string;
}

export async function createSessionToken(
  payload: AdminSessionPayload,
): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(secretKey);
}

export async function verifySessionToken(
  token: string,
): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    if (
      typeof payload.adminId === "string" &&
      typeof payload.username === "string"
    ) {
      return { adminId: payload.adminId, username: payload.username };
    }
    return null;
  } catch {
    // Covers expired tokens, bad signatures, and malformed tokens alike —
    // all of them just mean "not a valid session," nothing more specific
    // needs to leak to the caller.
    return null;
  }
}
