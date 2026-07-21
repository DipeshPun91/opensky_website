// app/admin/dashboard/blogs/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { getBlogPostById } from "@/lib/blog-posts";
import BlogForm from "@/components/admin/blogs/BlogForm";
import Banner from "@/components/admin/Banner";
import Content from "@/components/admin/Content";

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
    <Content>
      <Banner title="Edit Post" description={post.title} />
      <BlogForm post={post} />
    </Content>
  );
}
