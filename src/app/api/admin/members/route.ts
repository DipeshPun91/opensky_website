import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/session";
import { getAllMembers, createMember, type MemberInput } from "@/lib/members";

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

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const members = await getAllMembers();
  return NextResponse.json(members);
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

  const { errors, input } = validateInput(body);
  if (errors.length > 0 || !input) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  try {
    const member = await createMember(input);
    return NextResponse.json(member, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not create member.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
