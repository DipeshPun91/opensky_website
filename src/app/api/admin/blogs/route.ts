import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/session";
import {
  getAllBlogPosts,
  createBlogPost,
  type BlogPostInput,
} from "@/lib/blog-posts";

function validateInput(body: Record<string, unknown>): {
  errors: string[];
  input?: BlogPostInput;
} {
  const errors: string[] = [];

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const excerpt = typeof body.excerpt === "string" ? body.excerpt.trim() : "";
  const category =
    typeof body.category === "string" ? body.category.trim() : "";
  const image = typeof body.image === "string" ? body.image.trim() : "";
  const slug = typeof body.slug === "string" ? body.slug.trim() : "";

  const rawContent = typeof body.content === "string" ? body.content : "";
  const content = rawContent
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (!title) errors.push("Title is required.");
  if (!excerpt) errors.push("Excerpt is required.");
  if (!category) errors.push("Category is required.");
  if (!image)
    errors.push("An image is required — pick one from the media library.");
  if (content.length === 0) errors.push("Content is required.");

  if (errors.length > 0) return { errors };

  return {
    errors: [],
    input: { title, excerpt, category, image, slug, content },
  };
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const posts = await getAllBlogPosts();
  return NextResponse.json(posts);
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
    const post = await createBlogPost(input);
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not create post.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
