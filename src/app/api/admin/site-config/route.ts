import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/session";
import {
  getSiteConfig,
  updateSiteConfig,
  type SiteConfig,
} from "@/lib/site-config";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
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
  const session = await getAdminSession();
  if (!session) {
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
