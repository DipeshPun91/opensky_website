"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaRegCalendar, FaRegClock } from "react-icons/fa";
import { slideInBottom, createStaggerContainer } from "@/lib/animations";
import type { BlogPost } from "@/lib/blog-posts";

const blogGrid = createStaggerContainer(0.1, 0.15);

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  // Show beautiful empty state when no posts exist
  if (!posts || posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-16"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-sky-50 to-blue-50 border border-sky-100/50 mb-4 shadow-sm">
          <svg
            className="w-10 h-10 text-sky-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          No Posts Yet
        </h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          We&apos;re working on creating amazing content for you. Check back
          soon!
        </p>
        <div className="mt-6 flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-sky-200"
              style={{
                animation: `pulse 2s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={blogGrid}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
    >
      {posts.map((post) => (
        <motion.div key={post.id} variants={slideInBottom} className="h-full">
          {/* The ENTIRE card is one Link, so clicking anywhere on it
              (padding, excerpt, category label) navigates — not just
              the image/title/"Read More" text individually. */}
          <Link
            href={`/blogs/${post.slug}`}
            className="group h-full flex flex-col rounded-2xl border-2 border-gray-200 hover:border-sky-300 bg-white overflow-hidden transition-colors duration-300 hover:shadow-xl"
          >
            <div className="relative aspect-16/10 overflow-hidden bg-gray-100">
              {post.image ? (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
                  <svg
                    className="w-12 h-12 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col grow">
              <p className="text-xs font-bold uppercase tracking-widest text-sky-500 mb-2">
                {post.category || "Uncategorized"}
              </p>

              <h2 className="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-sky-500 transition duration-300 line-clamp-2">
                {post.title}
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed mb-5 grow line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center flex-wrap gap-y-2 pt-4 border-t border-gray-100">
                <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-sky-500">
                  Read More
                  <FaArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 ml-auto pr-3 mr-3 border-r border-gray-200">
                  <FaRegCalendar className="w-3 h-3" />
                  {post.date || "TBD"}
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                  <FaRegClock className="w-3 h-3" />
                  {post.readTime || "2 min read"}
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
