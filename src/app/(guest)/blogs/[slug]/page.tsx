import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowLeft,
  FaRegCalendar,
  FaRegClock,
  FaArrowRight,
} from "react-icons/fa";
import { getBlogPostBySlug, getAllBlogPosts } from "@/lib/blog-posts";

// Next.js 15: route params are async.
interface BlogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllBlogPosts();

  // Other posts for the sidebar, excluding the current one.
  const otherBlogs = allPosts.filter((p) => p.slug !== post.slug).slice(0, 4);

  // Unique categories across every real post — grows/shrinks naturally
  // as posts are added or removed, rather than a fixed list.
  const categories = Array.from(new Set(allPosts.map((p) => p.category)));

  return (
    <article className="w-full overflow-hidden bg-white">
      {/* Added bottom padding to match header spacing */}
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto pt-28 sm:pt-32 pb-16 sm:pb-20">
        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-500 hover:text-sky-500 transition duration-300"
          >
            <FaArrowLeft className="h-3 w-3" />
            Back to Blog
          </Link>
        </div>

        {/* Main Content + Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Main Content - 8 columns on large screens */}
          <div className="lg:col-span-8">
            {/* Header */}
            <header className="mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-sky-500 mb-3">
                {post.category}
              </p>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase leading-tight text-gray-900">
                {post.title}
              </h1>

              <div className="mt-5 flex items-center gap-5 text-xs sm:text-sm text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <FaRegCalendar className="h-3.5 w-3.5" />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FaRegClock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>
            </header>

            {/* Hero image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg mb-10">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>

            {/*
              Body content — post.content is HTML from the rich text
              editor (TipTap), not the old plain string[] of paragraphs,
              so this renders via dangerouslySetInnerHTML instead of
              mapping over an array. Styled with plain CSS below rather
              than Tailwind's `prose` classes, since those require the
              @tailwindcss/typography plugin which isn't confirmed to be
              installed — same approach used in RichTextEditor.tsx so
              the admin preview and the live post look consistent.
              The HTML itself is trusted here: it only ever originates
              from your own authenticated admin form, never from
              unsanitized user input.
            */}
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Right: Sidebar - 4 columns on large screens */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32">
              {otherBlogs.length > 0 && (
                <>
                  {/* Sidebar Title */}
                  <div className="mb-6">
                    <h2 className="text-xl font-black uppercase text-gray-900 flex items-center gap-2">
                      <span className="h-1 w-8 bg-sky-500 rounded-full"></span>
                      More Blogs
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Explore more articles from our blog
                    </p>
                  </div>

                  {/* Other Blogs List */}
                  <div className="space-y-4">
                    {otherBlogs.map((blog) => (
                      <Link
                        key={blog.id}
                        href={`/blogs/${blog.slug}`}
                        className="group flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-200"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-110 transition duration-500"
                            sizes="96px"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold uppercase tracking-widest text-sky-500 mb-1">
                            {blog.category}
                          </p>
                          <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-sky-500 transition duration-300 line-clamp-2">
                            {blog.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                            <span className="inline-flex items-center gap-1">
                              <FaRegCalendar className="h-2.5 w-2.5" />
                              {blog.date}
                            </span>
                            <span className="inline-flex items-center gap-1">
                              <FaRegClock className="h-2.5 w-2.5" />
                              {blog.readTime}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {/* CTA Card */}
              <div className="mt-8 p-6 bg-linear-to-br from-sky-50 to-blue-50 rounded-2xl border border-sky-100">
                <div className="text-center">
                  <h3 className="text-lg font-black uppercase text-gray-900 mb-2">
                    Ready to Fly?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Book your paragliding experience in Pokhara today
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wide text-sm transition-all duration-300 shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40"
                  >
                    Book Now
                    <FaArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Categories Section */}
              {categories.length > 0 && (
                <div className="mt-6 p-6 bg-gray-50 rounded-2xl">
                  <h3 className="text-sm font-black uppercase text-gray-900 mb-3">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <span
                        key={category}
                        className="text-xs font-medium px-3 py-1 bg-white rounded-full text-gray-700 border border-gray-200"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
