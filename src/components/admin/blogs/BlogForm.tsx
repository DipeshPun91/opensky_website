"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiImage, FiUpload, FiX } from "react-icons/fi";
import type { BlogPost } from "@/lib/blog-posts";
import type { MediaItem } from "@/lib/media";
import MediaPicker from "../MediaPicker";
import RichTextEditor from "../../ui/RichTextEditor";

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
      slug: slugTouched ? prev.slug : slugify(value),
    }));
  };

  const handleImageSelect = (item: MediaItem) => {
    setForm((prev) => ({ ...prev, image: item.url }));
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({ ...prev, image: "" }));
  };

  const handleContentChange = (html: string) => {
    setForm((prev) => ({ ...prev, content: html }));
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
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-3.5 text-sm text-red-400 backdrop-blur-sm">
            {errorMessage}
          </div>
        )}

        {/* Featured Image */}
        <div className="rounded-xl border border-white/10 bg-linear-to-br from-gray-900/60 to-gray-800/30 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">
                Featured Image
              </h2>
              <p className="mt-1 text-xs text-gray-400">
                Select an image from your media library
              </p>
            </div>
            {form.image && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                aria-label="Remove image"
              >
                <FiX className="h-4 w-4" />
              </button>
            )}
          </div>

          {form.image ? (
            // Image preview
            <div className="mt-4">
              <div className="relative h-32 w-48 overflow-hidden rounded-lg border border-white/10 bg-gray-900/60">
                <Image
                  src={form.image}
                  alt="Featured image"
                  fill
                  className="object-cover"
                  sizes="192px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPickerOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    <FiUpload className="h-3.5 w-3.5" />
                    Change
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Upload placeholder
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                className="group relative flex h-32 w-48 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-white/10 bg-gray-900/40 transition hover:border-sky-500/50 hover:bg-gray-900/60"
              >
                <div className="rounded-full bg-sky-500/10 p-2.5 transition group-hover:bg-sky-500/20">
                  <FiImage className="h-5 w-5 text-sky-400" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-white">Choose image</p>
                  <p className="text-[10px] text-gray-400">Browse library</p>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Post Details */}
        <div className="rounded-xl border border-white/10 bg-linear-to-br from-gray-900/60 to-gray-800/30 p-6 backdrop-blur-sm">
          <h2 className="text-base font-semibold text-white">Post Details</h2>

          <div className="mt-5 flex flex-col gap-4">
            {/*Title & Slug */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  placeholder="Enter post title..."
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
                  placeholder="your-post-slug"
                />
                <p className="text-[11px] text-gray-500">
                  /blogs/{form.slug || "your-slug-here"}
                </p>
              </div>
            </div>

            {/*Category */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              <div />
            </div>

            {/* Excerpt */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                Excerpt
              </label>
              <textarea
                required
                value={form.excerpt}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, excerpt: e.target.value }))
                }
                placeholder="A one or two sentence summary shown on the blog listing page."
                className="w-full resize-none rounded-lg border border-white/10 bg-gray-900/60 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 overflow-hidden"
                style={{ height: "auto", minHeight: "2.5rem" }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = target.scrollHeight + "px";
                }}
                rows={1}
              />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                Content
              </label>
              <RichTextEditor
                value={form.content}
                onChange={handleContentChange}
              />
              <p className="text-[11px] text-gray-500">
                Use the toolbar to format your content.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-500/20 px-4 py-2.5 text-sm font-medium text-sky-400 transition hover:border-sky-500 hover:bg-sky-500/10 hover:text-sky-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : isEditing ? "Save Changes" : "Publish Post"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/dashboard/blogs")}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:border-white/20 hover:bg-white/5 hover:text-white hover:scale-105"
          >
            Cancel
          </button>
        </div>
      </form>

      <MediaPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handleImageSelect}
      />
    </>
  );
}
