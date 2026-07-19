import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/session";
import cloudinary from "@/lib/cloudinary";
import { createMedia, getAllMedia } from "@/lib/media";

// Cloudinary's SDK uses Node APIs — this route can't run on the Edge
// runtime. It wouldn't by default anyway (Route Handlers default to
// Node), but declaring it explicitly makes that requirement obvious to
// anyone editing this file later.
export const runtime = "nodejs";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 4 * 1024 * 1024; // 4MB — see 01-MEDIA-SETUP.md for why

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const media = await getAllMedia();
  return NextResponse.json(media);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, WebP, and GIF images are allowed." },
      { status: 400 },
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File is too large. Maximum size is 4MB." },
      { status: 400 },
    );
  }

  const label = formData.get("label")?.toString().trim() || file.name;
  const folder = formData.get("folder")?.toString().trim() || "general";

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: `opensky/${folder}`,
    });

    const media = await createMedia({
      publicId: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
      label,
      folder,
    });

    return NextResponse.json(media, { status: 201 });
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 },
    );
  }
}
