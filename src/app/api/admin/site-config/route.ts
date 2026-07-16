// app/api/admin/site-config/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import {
  getSiteConfig,
  updateSiteConfig,
  type SiteConfig,
} from "@/lib/site-config";

// Helper function to check if user is authenticated
async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return false;
  }

  const session = await verifySessionToken(token);
  return session !== null;
}

export async function GET() {
  // Check authentication
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in first." },
      { status: 401 },
    );
  }

  try {
    const config = await getSiteConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error("Error fetching site config:", error);
    return NextResponse.json(
      { error: "Failed to fetch site configuration." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  // Check authentication
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json(
      { error: "Unauthorized. Please log in first." },
      { status: 401 },
    );
  }

  let body: Partial<SiteConfig>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body. Please provide valid JSON." },
      { status: 400 },
    );
  }

  // Validate body is an object
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json(
      { error: "Invalid payload. Expected an object." },
      { status: 400 },
    );
  }

  try {
    const updated = await updateSiteConfig(body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating site config:", error);
    return NextResponse.json(
      { error: "Failed to update site configuration." },
      { status: 500 },
    );
  }
}
