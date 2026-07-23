"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaRegCalendar, FaRegClock } from "react-icons/fa";
import { slideInBottom, createStaggerContainer } from "@/lib/animations";
import type { BlogPost } from "@/lib/blog-posts";

const blogGrid = createStaggerContainer(0.1, 0.15);

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No posts published yet — check back soon.
      </p>
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
            <div className="relative aspect-16/10 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            <div className="p-6 flex flex-col grow">
              <p className="text-xs font-bold uppercase tracking-widest text-sky-500 mb-2">
                {post.category}
              </p>

              <h2 className="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-sky-500 transition duration-300">
                {post.title}
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed mb-5 grow">
                {post.excerpt}
              </p>

              <div className="flex items-center flex-wrap gap-y-2 pt-4 border-t border-gray-100">
                <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-sky-500">
                  Read More
                  <FaArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 ml-auto pr-3 mr-3 border-r border-gray-200">
                  <FaRegCalendar className="w-3 h-3" />
                  {post.date}
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
                  <FaRegClock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
