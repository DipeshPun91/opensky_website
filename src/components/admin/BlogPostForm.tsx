"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiImage } from "react-icons/fi";
import type { BlogPost } from "@/lib/blog-posts";
import type { MediaItem } from "@/lib/media";
import MediaPickerDialog from "./MediaPickerDialog";

interface FormState {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toInitialState(post?: BlogPost | null): FormState {
  if (!post) {
    return {
      title: "",
      slug: "",
      category: "",
      excerpt: "",
      content: "",
      image: "",
    };
  }
  return {
    title: post.title,
    slug: post.slug,
    category: post.category,
    excerpt: post.excerpt,
    // Paragraphs stored as string[] in the DB, joined back into one
    // textarea with a blank line between each — the inverse of how the
    // API route splits it back apart on save.
    content: post.content.join("\n\n"),
    image: post.image,
  };
}

export default function BlogPostForm({ post }: { post?: BlogPost | null }) {
  const router = useRouter();
  const isEditing = Boolean(post);

  const [form, setForm] = useState<FormState>(toInitialState(post));
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      // Auto-fill the slug from the title until the admin edits the
      // slug field directly — once touched, stop overwriting it, so
      // manual edits are never silently clobbered by further typing.
      slug: slugTouched ? prev.slug : slugify(value),
    }));
  };

  const handleImageSelect = (item: MediaItem) => {
    setForm((prev) => ({ ...prev, image: item.url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage(null);

    const url = isEditing ? `/api/admin/blogs/${post!.id}` : "/api/admin/blogs";
    const method = isEditing ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Could not save this post.");
        setSaving(false);
        return;
      }

      router.push("/admin/dashboard/blogs");
      router.refresh();
    } catch {
      setErrorMessage("Could not reach the server. Please try again.");
      setSaving(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {errorMessage && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {errorMessage}
          </div>
        )}

        <div className="rounded-xl border border-white/10 bg-gray-800/50 p-6 backdrop-blur-sm">
          <h2 className="text-base font-semibold text-white">Featured Image</h2>
          <p className="mt-1 text-xs text-gray-400">
            Selected from your media library — no need to upload again.
          </p>

          <div className="mt-4 flex items-center gap-4">
            <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-gray-900/60">
              {form.image ? (
                <Image
                  src={form.image}
                  alt="Selected featured image"
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-600">
                  <FiImage className="h-6 w-6" />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="inline-flex items-center justify-center rounded-md border border-white/10 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-gray-300 transition hover:bg-white/5 hover:text-white"
            >
              {form.image ? "Change Image" : "Choose Image"}
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-gray-800/50 p-6 backdrop-blur-sm">
          <h2 className="text-base font-semibold text-white">Post Details</h2>

          <div className="mt-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                Title
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="rounded-lg border border-white/10 bg-gray-900/60 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                Slug
              </label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setForm((prev) => ({ ...prev, slug: e.target.value }));
                }}
                className="rounded-lg border border-white/10 bg-gray-900/60 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
              <p className="text-[11px] text-gray-500">
                Used in the URL: /blogs/{form.slug || "your-slug-here"}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                Category
              </label>
              <input
                type="text"
                required
                value={form.category}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, category: e.target.value }))
                }
                placeholder="e.g. Beginners Guide"
                className="rounded-lg border border-white/10 bg-gray-900/60 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                Excerpt
              </label>
              <textarea
                required
                rows={2}
                value={form.excerpt}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, excerpt: e.target.value }))
                }
                placeholder="A one or two sentence summary shown on the blog listing page."
                className="resize-none rounded-lg border border-white/10 bg-gray-900/60 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                Content
              </label>
              <textarea
                required
                rows={12}
                value={form.content}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder={
                  "First paragraph...\n\nSecond paragraph...\n\nThird paragraph..."
                }
                className="resize-y rounded-lg border border-white/10 bg-gray-900/60 px-4 py-2.5 text-sm leading-relaxed text-white placeholder:text-gray-500 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
              <p className="text-[11px] text-gray-500">
                Leave a blank line between paragraphs — each one renders as its
                own paragraph on the post page.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center rounded-md bg-sky-500 px-6 py-3 text-sm font-semibold uppercase tracking-[2px] text-white shadow-lg shadow-sky-500/30 transition-all duration-300 hover:bg-sky-600 hover:shadow-xl hover:shadow-sky-500/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : isEditing ? "Save Changes" : "Publish Post"}
          </button>
        </div>
      </form>

      <MediaPickerDialog
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handleImageSelect}
      />
    </>
  );
}
