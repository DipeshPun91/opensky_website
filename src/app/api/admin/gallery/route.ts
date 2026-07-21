import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/session";
import { getAllGalleryItems, createGalleryItem } from "@/lib/gallery";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const items = await getAllGalleryItems();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const imageUrl =
    typeof body.imageUrl === "string" ? body.imageUrl.trim() : "";
  const caption = typeof body.caption === "string" ? body.caption.trim() : "";

  if (!imageUrl) {
    return NextResponse.json(
      { error: "An image is required." },
      { status: 400 },
    );
  }

  try {
    const item = await createGalleryItem({ imageUrl, caption });
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not add image.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
