"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiEdit2, FiTrash2, FiExternalLink } from "react-icons/fi";
import type { BlogPost } from "@/lib/blog-posts";

export default function BlogPostsTable({
  initialPosts,
}: {
  initialPosts: BlogPost[];
}) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

  const handleDelete = async (post: BlogPost) => {
    const confirmed = window.confirm(
      `Delete "${post.title}"? This can't be undone.`,
    );
    if (!confirmed) return;

    setDeletingIds((prev) => new Set(prev).add(post.id));
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/admin/blogs/${post.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || "Could not delete that post.");
        return;
      }

      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } catch {
      setErrorMessage("Could not reach the server. Please try again.");
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(post.id);
        return next;
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {errorMessage && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {errorMessage}
        </div>
      )}

      {posts.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-gray-800/50 p-10 text-center">
          <p className="text-sm text-gray-500">No blog posts yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => {
            const isDeleting = deletingIds.has(post.id);

            return (
              <div
                key={post.id}
                className="flex flex-col gap-4 rounded-xl border border-white/10 bg-gray-800/50 p-4 backdrop-blur-sm sm:flex-row sm:items-center"
              >
                <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-lg sm:w-32">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-wide text-sky-400">
                    {post.category}
                  </p>
                  <h3 className="truncate text-base font-semibold text-white">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {post.date} · {post.readTime}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={`/blogs/${post.slug}`}
                    target="_blank"
                    aria-label="View live post"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-white"
                  >
                    <FiExternalLink className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/admin/dashboard/blogs/${post.id}/edit`}
                    aria-label="Edit post"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-sky-400"
                  >
                    <FiEdit2 className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(post)}
                    disabled={isDeleting}
                    aria-label="Delete post"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
