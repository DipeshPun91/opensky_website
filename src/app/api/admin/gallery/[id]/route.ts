import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/session";
import { updateGalleryItemCaption, deleteGalleryItem } from "@/lib/gallery";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;

  let body: { caption?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (typeof body.caption !== "string") {
    return NextResponse.json(
      { error: "Caption is required." },
      { status: 400 },
    );
  }

  try {
    const updated = await updateGalleryItemCaption(id, body.caption.trim());
    return NextResponse.json(updated);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not update caption.";
    return NextResponse.json({ error: message }, { status: 404 });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;

  try {
    await deleteGalleryItem(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not delete image.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
