import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FaArrowLeft,
  FaRegCalendar,
  FaRegClock,
  FaArrowRight,
  FaTag,
  FaShare,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaUser,
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

  // Find current post index and next post
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  // Other posts for the sidebar, excluding the current one.
  const otherBlogs = allPosts.filter((p) => p.slug !== post.slug).slice(0, 4);

  return (
    <article className="w-full min-h-screen bg-white">
      <div className="w-full px-6 sm:px-10 lg:px-16 py-16 sm:py-20 md:py-24">
        {/* Back link */}
        <div className="max-w-7xl mx-auto mb-10">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-sky-500 transition duration-300 group"
          >
            <span className="p-2 rounded-full bg-gray-100 group-hover:bg-sky-100 transition duration-300">
              <FaArrowLeft className="h-3 w-3" />
            </span>
            Back to Blog
          </Link>
        </div>

        {/* Main Content + Sidebar Layout */}
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Left: Main Content */}
          <div className="lg:w-[68%] w-full">
            {/* Header */}
            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-600 text-xs font-bold uppercase tracking-wider rounded-full border border-sky-200">
                  <FaTag className="h-3 w-3" />
                  {post.category}
                </span>
                <span className="text-xs text-gray-300">•</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                  <FaRegClock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-500 border-t border-b border-gray-100 py-4">
                <span className="inline-flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                    <FaUser className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-medium text-gray-700">
                    Open Sky Team
                  </span>
                </span>
                <span className="text-gray-300">|</span>
                <span className="inline-flex items-center gap-1.5">
                  <FaRegCalendar className="h-3.5 w-3.5" />
                  {post.date}
                </span>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <span className="hidden sm:inline-flex items-center gap-1.5">
                  <FaRegClock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
              </div>
            </header>

            {/* Hero image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-xl mb-10">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 68vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent" />
            </div>

            {/* Blog content with your existing CSS class - rendering HTML from rich text editor */}
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share Section with Next Post button */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FaShare className="h-4 w-4 text-gray-400" />
                    Share this post
                  </span>
                  <div className="flex gap-1.5">
                    <button className="p-2 bg-gray-100 hover:bg-[#1877F2] hover:text-white rounded-full transition-all duration-300 text-gray-600 hover:scale-110">
                      <FaFacebook className="h-3.5 w-3.5" />
                    </button>
                    <button className="p-2 bg-gray-100 hover:bg-[#1DA1F2] hover:text-white rounded-full transition-all duration-300 text-gray-600 hover:scale-110">
                      <FaTwitter className="h-3.5 w-3.5" />
                    </button>
                    <button className="p-2 bg-gray-100 hover:bg-[#0A66C2] hover:text-white rounded-full transition-all duration-300 text-gray-600 hover:scale-110">
                      <FaLinkedin className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                {nextPost && (
                  <Link
                    href={`/blogs/${nextPost.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-sky-500 transition-colors group"
                  >
                    Next Post
                    <span className="p-1.5 rounded-full bg-gray-100 group-hover:bg-sky-100 transition duration-300">
                      <FaArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right: Sidebar - STICKY */}
          <aside className="lg:w-[32%] w-full lg:sticky lg:top-24 self-start">
            <div className="space-y-8">
              {/* More Blogs Section */}
              {otherBlogs.length > 0 && (
                <div>
                  <div className="mb-5">
                    <h2 className="text-xl font-black uppercase text-gray-900 flex items-center gap-2">
                      <span className="h-1 w-8 bg-sky-500 rounded-full"></span>
                      More Blogs
                    </h2>
                    <p className="text-sm text-gray-500 mt-1.5">
                      Explore more articles from our blog
                    </p>
                  </div>

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
                          <p className="text-[10px] font-bold uppercase tracking-widest text-sky-500 mb-1">
                            {blog.category}
                          </p>
                          <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-sky-500 transition duration-300 line-clamp-2">
                            {blog.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
                            <span className="inline-flex items-center gap-1">
                              <FaRegCalendar className="h-2.5 w-2.5" />
                              {blog.date}
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="inline-flex items-center gap-1">
                              <FaRegClock className="h-2.5 w-2.5" />
                              {blog.readTime}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Card */}
              <div className="p-6 bg-linear-to-br from-sky-50 to-blue-50 rounded-2xl border border-sky-100">
                <div className="text-center">
                  <div className="w-12 h-12 bg-sky-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FaArrowRight className="h-5 w-5 text-sky-500" />
                  </div>
                  <h3 className="text-lg font-black uppercase text-gray-900 mb-2">
                    Ready to Fly?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    Book your paragliding experience in Pokhara today
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wide text-sm transition-all duration-300 shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 w-full justify-center"
                  >
                    Book Now
                    <FaArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
