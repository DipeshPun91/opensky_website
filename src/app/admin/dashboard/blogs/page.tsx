// app/admin/dashboard/blogs/page.tsx
import {
  FiPlus,
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiTag,
} from "react-icons/fi";
import { getAllBlogPosts } from "@/lib/blog-posts";
import BlogPosts from "@/components/admin/blogs/BlogPosts";
import Banner from "@/components/admin/Banner";
import StatsBar from "@/components/admin/StatsBar";
import Content from "@/components/admin/Content";
import { countCategories } from "@/lib/utils";

export default async function BlogsPage() {
  const posts = await getAllBlogPosts();

  const published = posts.length;
  const drafts = 0;

  const stats = [
    {
      label: "Total Posts",
      value: posts.length,
      icon: <FiFileText className="h-3.5 w-3.5" />,
    },
    {
      label: "Published",
      value: published,
      icon: <FiCheckCircle className="h-3.5 w-3.5" />,
    },
    {
      label: "Drafts",
      value: drafts,
      icon: <FiClock className="h-3.5 w-3.5" />,
    },
    {
      label: "Categories",
      value: countCategories(posts),
      icon: <FiTag className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <Content>
      <Banner
        title="Blogs"
        description="Create, edit, and remove blog posts."
        action={{
          label: "New Post",
          href: "/admin/dashboard/blogs/new",
          icon: <FiPlus className="h-4 w-4" />,
        }}
      />
      <StatsBar stats={stats} />
      <BlogPosts initialPosts={posts} />
    </Content>
  );
}
