// app/admin/dashboard/blogs/new/page.tsx
import BlogForm from "@/components/admin/blogs/BlogForm";
import Banner from "@/components/admin/Banner";
import Content from "@/components/admin/Content";

export default function NewBlogPostPage() {
  return (
    <Content>
      <Banner
        title="New Post"
        description="Write a new blog post and publish it to your site."
      />
      <BlogForm />
    </Content>
  );
}
