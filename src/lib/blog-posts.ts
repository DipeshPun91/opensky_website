import { ObjectId } from "mongodb";
import { getDb } from "./db/mongodb";

export interface BlogPostInput {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  content: string[];
  image: string; // Cloudinary URL, selected via the media library
}

export interface BlogPost extends BlogPostInput {
  id: string;
  readTime: string;
  date: string; // formatted display date, e.g. "June 12, 2026"
  createdAt: string;
  updatedAt: string;
}

// A concrete ObjectId type (rather than a vague custom shape) is what
// keeps MongoDB's TypeScript inference well-behaved — see the note in
// lib/bookings.ts / lib/site-config.ts for why a loosely-typed _id can
// silently resolve to `never`.
interface BlogPostDocument extends BlogPostInput {
  _id: ObjectId;
  readTime: string;
  createdAt: Date;
  updatedAt: Date;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// ~200 words/minute, minimum 1 minute — same rough estimate most blog
// platforms use. Recalculated automatically whenever content changes,
// rather than being a field the admin has to remember to update by hand.
function estimateReadTime(content: string[]): string {
  const words = content.join(" ").trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toBlogPost(doc: BlogPostDocument): BlogPost {
  const { _id, createdAt, updatedAt, ...rest } = doc;
  return {
    ...rest,
    id: _id.toString(),
    date: formatDate(createdAt),
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  };
}

function toObjectId(id: string): ObjectId {
  if (!ObjectId.isValid(id)) throw new Error("Invalid post id.");
  return new ObjectId(id);
}

function postsCollection() {
  return getDb().then((db) => db.collection<BlogPostDocument>("blogPosts"));
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const collection = await postsCollection();
  const docs = await collection.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(toBlogPost);
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const collection = await postsCollection();
  const doc = await collection.findOne({ _id: toObjectId(id) });
  return doc ? toBlogPost(doc) : null;
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const collection = await postsCollection();
  const doc = await collection.findOne({ slug });
  return doc ? toBlogPost(doc) : null;
}

export async function createBlogPost(input: BlogPostInput): Promise<BlogPost> {
  const collection = await postsCollection();

  const slug = input.slug.trim() ? slugify(input.slug) : slugify(input.title);
  if (!slug) throw new Error("Could not generate a slug from that title.");

  const existing = await collection.findOne({ slug });
  if (existing) {
    throw new Error(`A post with the slug "${slug}" already exists.`);
  }

  const now = new Date();
  const doc: Omit<BlogPostDocument, "_id"> = {
    ...input,
    slug,
    readTime: estimateReadTime(input.content),
    createdAt: now,
    updatedAt: now,
  };

  const result = await collection.insertOne(doc as BlogPostDocument);
  return toBlogPost({ ...doc, _id: result.insertedId } as BlogPostDocument);
}

export async function updateBlogPost(
  id: string,
  input: BlogPostInput,
): Promise<BlogPost> {
  const collection = await postsCollection();
  const objectId = toObjectId(id);

  const slug = input.slug.trim() ? slugify(input.slug) : slugify(input.title);
  if (!slug) throw new Error("Could not generate a slug from that title.");

  const slugOwner = await collection.findOne({ slug });
  if (slugOwner && slugOwner._id.toString() !== id) {
    throw new Error(`A post with the slug "${slug}" already exists.`);
  }

  const result = await collection.findOneAndUpdate(
    { _id: objectId },
    {
      $set: {
        ...input,
        slug,
        readTime: estimateReadTime(input.content),
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" },
  );

  if (!result) throw new Error("Post not found.");
  return toBlogPost(result);
}

export async function deleteBlogPost(id: string): Promise<void> {
  const collection = await postsCollection();
  await collection.deleteOne({ _id: toObjectId(id) });
}
