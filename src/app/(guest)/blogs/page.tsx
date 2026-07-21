import { getAllBlogPosts } from "@/lib/blog-posts";
import BlogGrid from "@/components/guest/blogs/BlogGrid";
import Separator from "@/components/ui/Seperator";

// Server component — reads directly from MongoDB via lib/blog-posts.ts
// instead of a hardcoded array, so posts created in
// /admin/dashboard/blogs actually show up here. The animated card grid
// itself is a separate client component (BlogGrid) since Framer
// Motion's motion.* requires "use client" — this file no longer needs
// to be a client component at all now that the data isn't hardcoded.
export default async function Blogs() {
  const posts = await getAllBlogPosts();

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white w-full overflow-hidden">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <p className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-500 font-medium">
            Blog
          </p>

          <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight text-gray-900">
            Our Blogs
          </h1>

          <Separator />
        </div>

        <BlogGrid posts={posts} />
      </div>
    </section>
  );
}
