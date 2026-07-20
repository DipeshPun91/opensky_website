import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { getAllBlogPosts } from "@/lib/blog-posts";
import BlogPostsTable from "@/components/admin/BlogPostsTable";

export default async function BlogsPage() {
  const posts = await getAllBlogPosts();

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-sky-500">
            Admin Panel
          </p>
          <h1 className="mb-1 text-2xl font-black uppercase text-white sm:text-3xl">
            Blogs
          </h1>
          <p className="text-sm text-gray-400">
            Create, edit, and remove blog posts.
          </p>
        </div>

        <Link
          href="/admin/dashboard/blogs/new"
          className="inline-flex items-center gap-2 rounded-md bg-sky-500 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-sky-600"
        >
          <FiPlus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      <BlogPostsTable initialPosts={posts} />
    </div>
  );
}
