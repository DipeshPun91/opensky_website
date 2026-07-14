"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaRegCalendar, FaRegClock } from "react-icons/fa";
import {
  container,
  riseIn,
  slideInBottom,
  createStaggerContainer,
} from "@/lib/animations";
import Separator from "@/components/ui/Seperator";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "paragliding-in-pokhara-for-beginners",
    title: "Paragliding in Pokhara for Beginners: Everything You Need to Know",
    excerpt:
      "New to paragliding? Here's what to expect on your first tandem flight, from pre-flight briefing to touchdown over Phewa Lake.",
    category: "Beginners Guide",
    date: "June 12, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1530007874544-a6f7674b5a47?w=800&auto=format&fit=crop&crop=center",
  },
  {
    id: 2,
    slug: "no-1-paragliding-in-nepal",
    title: "No. 1 Paragliding in Nepal",
    excerpt:
      "What makes Pokhara one of the world's top paragliding destinations, and why pilots and adventurers keep coming back.",
    category: "Destination",
    date: "May 28, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1620720970374-5b7e67e1e610?w=800&auto=format&fit=crop&crop=center",
  },
  {
    id: 3,
    slug: "best-paragliding-company-in-pokhara",
    title: "Best Paragliding Company in Pokhara",
    excerpt:
      "A look at what to check for when picking a paragliding operator — certifications, pilot experience, and safety record.",
    category: "Guide",
    date: "May 15, 2026",
    readTime: "6 min read",
    image:
      "https://plus.unsplash.com/premium_photo-1666797173828-e93427443e3b?w=800&auto=format&fit=crop&crop=center",
  },
  {
    id: 4,
    slug: "price-of-paragliding-in-pokhara",
    title: "Price of Paragliding in Pokhara",
    excerpt:
      "A breakdown of what typically goes into tandem flight pricing, and what's usually included in the package.",
    category: "Planning",
    date: "April 30, 2026",
    readTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1607815705213-104c87ea8d0f?w=800&auto=format&fit=crop&crop=center",
  },
  {
    id: 5,
    slug: "why-choose-open-sky-paragliding",
    title: "Why Choose Open Sky Paragliding?",
    excerpt:
      "Certified pilots, daily weather tracking, and a launch site away from the crowds — here's what sets us apart.",
    category: "About Us",
    date: "April 18, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1677856216675-a397a342cdd2?w=800&auto=format&fit=crop&crop=center",
  },
  {
    id: 6,
    slug: "all-about-paragliding",
    title: "All About Paragliding",
    excerpt:
      "The basics of how paragliding actually works — from thermals and launch technique to landing safely.",
    category: "Basics",
    date: "April 2, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&crop=center",
  },
];

const blogGrid = createStaggerContainer(0.1, 0.15);

export default function Blogs() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={container}
      className="py-16 sm:py-20 md:py-24 bg-white w-full overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Heading */}
        <motion.div
          variants={riseIn}
          className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto"
        >
          <p className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-500 font-medium">
            Blog
          </p>

          <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight text-gray-900">
            Our Blogs
          </h1>

          <motion.div variants={riseIn}>
            <Separator />
          </motion.div>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          variants={blogGrid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={slideInBottom}
              className="group h-full flex flex-col rounded-2xl border-2 border-gray-200 hover:border-sky-300 bg-white overflow-hidden transition-colors duration-300 hover:shadow-xl"
            >
              <Link
                href={`/blogs/${post.slug}`}
                className="relative aspect-16/10 overflow-hidden block"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </Link>

              <div className="p-6 flex flex-col grow">
                <p className="text-xs font-bold uppercase tracking-widest text-sky-500 mb-2">
                  {post.category}
                </p>

                <h2 className="text-lg font-bold text-gray-900 leading-snug mb-3">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="hover:text-sky-500 transition duration-300"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed mb-5 grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center flex-wrap gap-y-2 pt-4 border-t border-gray-100">
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-sky-500 hover:text-sky-600 transition duration-300 group/link"
                  >
                    Read More
                    <FaArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>

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
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
