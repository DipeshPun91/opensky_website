import { NextResponse } from "next/server";
import { getDb } from "@/lib/db/mongodb";
import { verifyPassword } from "@/lib/auth/password";
import {
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth/auth";
import { ObjectId } from "mongodb";

interface AdminDocument {
  _id: ObjectId;
  username: string;
  passwordHash: string;
}

export async function POST(request: Request) {
  let body: { username?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { username, password } = body;

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !username ||
    !password
  ) {
    return NextResponse.json(
      { error: "Username and password are required." },
      { status: 400 },
    );
  }

  const invalidResponse = NextResponse.json(
    { error: "Invalid username or password." },
    { status: 401 },
  );

  const db = await getDb();
  const admin = await db
    .collection<AdminDocument>("admins")
    .findOne({ username: username.trim().toLowerCase() });

  if (!admin) return invalidResponse;

  const isValid = await verifyPassword(password, admin.passwordHash);
  if (!isValid) return invalidResponse;

  const token = await createSessionToken({
    adminId: admin._id.toString(),
    username: admin.username,
  });

  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  return response;
}
