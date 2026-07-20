import BlogPostForm from "@/components/admin/BlogPostForm";

export default function NewBlogPostPage() {
  return (
    <div className="max-w-3xl">
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-sky-500">
        Admin Panel
      </p>
      <h1 className="mb-1 text-2xl font-black uppercase text-white sm:text-3xl">
        New Post
      </h1>
      <p className="mb-8 text-sm text-gray-400">
        Write a new blog post and publish it to your site.
      </p>

      <BlogPostForm />
    </div>
  );
}
