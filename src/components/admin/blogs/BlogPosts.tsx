"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiEdit2,
  FiTrash2,
  FiExternalLink,
  FiCalendar,
  FiClock,
  FiFolder,
} from "react-icons/fi";
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
      {/* Error message with better styling */}
      {errorMessage && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-3.5 text-sm text-red-400 backdrop-blur-sm">
          <div className="rounded-full bg-red-500/10 p-1.5">
            <FiTrash2 className="h-3.5 w-3.5" />
          </div>
          <span className="flex-1">{errorMessage}</span>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-red-400/40 hover:text-red-400 transition"
          >
            ✕
          </button>
        </div>
      )}

      {/* Empty state with better visual */}
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-linear-to-br from-gray-900/60 to-gray-800/30 p-16 text-center backdrop-blur-sm">
          <div className="rounded-full bg-white/5 p-5 ring-1 ring-white/10">
            <FiFolder className="h-8 w-8 text-gray-500" />
          </div>
          <h3 className="mt-5 text-lg font-semibold text-white">
            No posts yet
          </h3>
          <p className="mt-1.5 max-w-sm text-sm text-gray-400">
            Your blog is waiting for its first story. Start writing today.
          </p>
          <Link
            href="/admin/dashboard/blogs/new"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-sky-500 to-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition-all hover:shadow-xl hover:shadow-sky-500/30 hover:scale-105"
          >
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {posts.map((post) => {
            const isDeleting = deletingIds.has(post.id);

            return (
              <div
                key={post.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-gray-900/60 to-gray-800/30 p-5 backdrop-blur-sm transition-all duration-300 hover:border-sky-500/30 hover:shadow-lg hover:shadow-sky-500/5 hover:bg-gray-800/40"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {/* Image with hover effect */}
                  <div className="relative h-24 w-full overflow-hidden rounded-xl bg-gray-800 sm:h-20 sm:w-32 shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 128px"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  {/* Content with better metadata */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400">
                        <FiFolder className="h-3 w-3" />
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                        <FiCalendar className="h-3 w-3" />
                        {post.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                        <FiClock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="mt-2 truncate text-base font-semibold text-white group-hover:text-sky-400 transition-colors">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="mt-1 line-clamp-1 text-sm text-gray-400">
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  {/* Actions with better hover states */}
                  <div className="flex shrink-0 items-center gap-1">
                    <Link
                      href={`/blogs/${post.slug}`}
                      target="_blank"
                      aria-label="View live post"
                      className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-110"
                    >
                      <FiExternalLink className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/admin/dashboard/blogs/${post.id}/edit`}
                      aria-label="Edit post"
                      className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition-all duration-200 hover:bg-sky-500/10 hover:text-sky-400 hover:scale-110"
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(post)}
                      disabled={isDeleting}
                      aria-label="Delete post"
                      className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-400 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isDeleting ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-400/30 border-t-red-400" />
                      ) : (
                        <FiTrash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
