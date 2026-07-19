import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/session";
import cloudinary from "@/lib/cloudinary";
import { getMediaById, deleteMediaRecord } from "@/lib/media";

export const runtime = "nodejs";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;

  try {
    const media = await getMediaById(id);
    if (!media) {
      return NextResponse.json({ error: "File not found." }, { status: 404 });
    }

    // Delete from Cloudinary FIRST, then the DB record. If this order
    // were reversed and the Cloudinary call failed, you'd end up with
    // an orphaned image still costing storage with no record pointing
    // at it — no way to find or clean it up later. This way, worst case
    // on a Cloudinary failure is a DB record that still correctly
    // points at a file that still exists, which is the safer failure
    // mode of the two.
    await cloudinary.uploader.destroy(media.publicId);
    await deleteMediaRecord(id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Media delete failed:", err);
    return NextResponse.json(
      { error: "Could not delete file. Please try again." },
      { status: 500 },
    );
  }
}
