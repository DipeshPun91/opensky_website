import { notFound } from "next/navigation";
import { getBlogPostById } from "@/lib/blog-posts";
import BlogForm from "@/components/admin/blogs/BlogForm";

interface EditBlogPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({
  params,
}: EditBlogPostPageProps) {
  const { id } = await params;

  let post;
  try {
    post = await getBlogPostById(id);
  } catch {
    notFound();
  }

  if (!post) notFound();

  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-widest text-sky-500">
        Admin Panel
      </p>
      <h1 className="mb-1 text-2xl font-black uppercase text-white sm:text-3xl">
        Edit Post
      </h1>
      <p className="mb-8 text-sm text-gray-400">{post.title}</p>

      <BlogForm post={post} />
    </div>
  );
}
