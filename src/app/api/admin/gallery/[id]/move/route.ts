import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/session";
import { moveGalleryItem } from "@/lib/gallery";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;

  let body: { direction?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (body.direction !== "up" && body.direction !== "down") {
    return NextResponse.json(
      { error: "Direction must be 'up' or 'down'." },
      { status: 400 },
    );
  }

  try {
    await moveGalleryItem(id, body.direction);
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not reorder.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
