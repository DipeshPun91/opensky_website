import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/session";
import {
  getMemberById,
  updateMember,
  deleteMember,
  type MemberInput,
} from "@/lib/members";

interface RouteParams {
  params: Promise<{ id: string }>;
}

function validateInput(body: Record<string, unknown>): {
  errors: string[];
  input?: MemberInput;
} {
  const errors: string[] = [];

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const role = typeof body.role === "string" ? body.role.trim() : "";
  const bio = typeof body.bio === "string" ? body.bio.trim() : "";
  const image = typeof body.image === "string" ? body.image.trim() : "";
  const facebook =
    typeof body.facebook === "string" ? body.facebook.trim() : "";
  const instagram =
    typeof body.instagram === "string" ? body.instagram.trim() : "";

  if (!name) errors.push("Name is required.");
  if (!role) errors.push("Role is required.");
  if (!image)
    errors.push("An image is required — pick one from the media library.");

  if (errors.length > 0) return { errors };

  return { errors: [], input: { name, role, bio, image, facebook, instagram } };
}

export async function GET(_request: Request, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;

  try {
    const member = await getMemberById(id);
    if (!member) {
      return NextResponse.json({ error: "Member not found." }, { status: 404 });
    }
    return NextResponse.json(member);
  } catch {
    return NextResponse.json({ error: "Member not found." }, { status: 404 });
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { errors, input } = validateInput(body);
  if (errors.length > 0 || !input) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  try {
    const updated = await updateMember(id, input);
    return NextResponse.json(updated);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not update member.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;

  try {
    await deleteMember(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not delete member.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
