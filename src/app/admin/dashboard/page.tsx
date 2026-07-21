import Link from "next/link";
import { getAdminSession } from "@/lib/session";
import { getAllBookings } from "@/lib/bookings";
import { getAllBlogPosts } from "@/lib/blog-posts";
import { getAllGalleryItems } from "@/lib/gallery";
import { getAllMembers } from "@/lib/members";
import {
  FiUsers,
  FiImage,
  FiBookOpen,
  FiCalendar,
  FiFileText,
  FiArrowRight,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiPlus,
} from "react-icons/fi";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-400",
  confirmed: "bg-emerald-500/10 text-emerald-400",
  cancelled: "bg-red-500/10 text-red-400",
};

const STATUS_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  pending: FiClock,
  confirmed: FiCheckCircle,
  cancelled: FiXCircle,
};

export default async function AdminDashboardPage() {
  // Middleware + the dashboard layout already guarantee a session exists
  // by the time this page renders — getAdminSession() is cache()-wrapped,
  // so this call reuses that same check rather than re-reading the
  // cookie a second time.
  const session = await getAdminSession();

  const [bookings, posts, gallery, members] = await Promise.all([
    getAllBookings(),
    getAllBlogPosts(),
    getAllGalleryItems(),
    getAllMembers(),
  ]);

  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const recentBookings = bookings.slice(0, 5);
  const recentPosts = posts.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="rounded-xl border border-white/10 bg-linear-to-r from-gray-800/50 to-gray-900/50 p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome back, {session?.username}! 👋
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              Here&apos;s what&apos;s happening with your paragliding business
              today.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="rounded-full bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-400">
              Admin
            </span>
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              Online
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/admin/dashboard/bookings"
          className="group relative overflow-hidden rounded-xl border border-white/10 bg-gray-800/50 p-6 transition-all hover:border-sky-500/50 hover:bg-gray-800/70"
        >
          <div className="absolute inset-0 bg-linear-to-br from-sky-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">
                Total Bookings
              </p>
              <p className="mt-1 text-3xl font-bold text-white">
                {bookings.length}
              </p>
            </div>
            <div className="rounded-xl bg-sky-500/10 p-3 transition-colors group-hover:bg-sky-500/20">
              <FiCalendar className="h-6 w-6 text-sky-400" />
            </div>
          </div>
          <div className="relative mt-4 flex items-center text-sm">
            <FiClock className="mr-1 h-4 w-4 text-yellow-400" />
            <span className="text-yellow-400">{pendingBookings}</span>
            <span className="ml-2 text-gray-500">awaiting review</span>
          </div>
        </Link>

        <Link
          href="/admin/dashboard/blogs"
          className="group relative overflow-hidden rounded-xl border border-white/10 bg-gray-800/50 p-6 transition-all hover:border-orange-500/50 hover:bg-gray-800/70"
        >
          <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Blog Posts</p>
              <p className="mt-1 text-3xl font-bold text-white">
                {posts.length}
              </p>
            </div>
            <div className="rounded-xl bg-orange-500/10 p-3 transition-colors group-hover:bg-orange-500/20">
              <FiBookOpen className="h-6 w-6 text-orange-400" />
            </div>
          </div>
          <div className="relative mt-4 flex items-center text-sm text-gray-500">
            Published on your site
          </div>
        </Link>

        <Link
          href="/admin/dashboard/gallery"
          className="group relative overflow-hidden rounded-xl border border-white/10 bg-gray-800/50 p-6 transition-all hover:border-purple-500/50 hover:bg-gray-800/70"
        >
          <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Gallery</p>
              <p className="mt-1 text-3xl font-bold text-white">
                {gallery.length}
              </p>
            </div>
            <div className="rounded-xl bg-purple-500/10 p-3 transition-colors group-hover:bg-purple-500/20">
              <FiImage className="h-6 w-6 text-purple-400" />
            </div>
          </div>
          <div className="relative mt-4 flex items-center text-sm text-gray-500">
            Curated images on display
          </div>
        </Link>

        <Link
          href="/admin/dashboard/members"
          className="group relative overflow-hidden rounded-xl border border-white/10 bg-gray-800/50 p-6 transition-all hover:border-rose-500/50 hover:bg-gray-800/70"
        >
          <div className="absolute inset-0 bg-linear-to-br from-rose-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Team</p>
              <p className="mt-1 text-3xl font-bold text-white">
                {members.length}
              </p>
            </div>
            <div className="rounded-xl bg-rose-500/10 p-3 transition-colors group-hover:bg-rose-500/20">
              <FiUsers className="h-6 w-6 text-rose-400" />
            </div>
          </div>
          <div className="relative mt-4 flex items-center text-sm text-gray-500">
            Listed on About page
          </div>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-white/10 bg-gray-800/50 p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <Link
            href="/admin/dashboard/bookings"
            className="group flex flex-col items-center rounded-xl border border-white/10 bg-gray-800/30 p-4 transition-all hover:border-sky-500/50 hover:bg-sky-500/10"
          >
            <div className="rounded-lg bg-sky-500/10 p-2.5 transition-colors group-hover:bg-sky-500/20">
              <FiCalendar className="h-5 w-5 text-sky-400" />
            </div>
            <span className="mt-2 text-xs font-medium text-gray-300 group-hover:text-white">
              View Bookings
            </span>
          </Link>

          <Link
            href="/admin/dashboard/blogs/new"
            className="group flex flex-col items-center rounded-xl border border-white/10 bg-gray-800/30 p-4 transition-all hover:border-orange-500/50 hover:bg-orange-500/10"
          >
            <div className="rounded-lg bg-orange-500/10 p-2.5 transition-colors group-hover:bg-orange-500/20">
              <FiFileText className="h-5 w-5 text-orange-400" />
            </div>
            <span className="mt-2 text-xs font-medium text-gray-300 group-hover:text-white">
              New Blog Post
            </span>
          </Link>

          <Link
            href="/admin/dashboard/files/add"
            className="group flex flex-col items-center rounded-xl border border-white/10 bg-gray-800/30 p-4 transition-all hover:border-purple-500/50 hover:bg-purple-500/10"
          >
            <div className="rounded-lg bg-purple-500/10 p-2.5 transition-colors group-hover:bg-purple-500/20">
              <FiPlus className="h-5 w-5 text-purple-400" />
            </div>
            <span className="mt-2 text-xs font-medium text-gray-300 group-hover:text-white">
              Upload Photo
            </span>
          </Link>

          <Link
            href="/admin/dashboard/members/new"
            className="group flex flex-col items-center rounded-xl border border-white/10 bg-gray-800/30 p-4 transition-all hover:border-rose-500/50 hover:bg-rose-500/10"
          >
            <div className="rounded-lg bg-rose-500/10 p-2.5 transition-colors group-hover:bg-rose-500/20">
              <FiUsers className="h-5 w-5 text-rose-400" />
            </div>
            <span className="mt-2 text-xs font-medium text-gray-300 group-hover:text-white">
              Add Team Member
            </span>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Bookings */}
        <div className="rounded-xl border border-white/10 bg-gray-800/50 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Recent Bookings
            </h2>
            <Link
              href="/admin/dashboard/bookings"
              className="group flex items-center gap-1 text-sm text-gray-400 transition hover:text-sky-400"
            >
              View All
              <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {recentBookings.length === 0 ? (
            <p className="mt-6 text-sm text-gray-500">
              No booking requests yet.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {recentBookings.map((booking) => {
                const StatusIcon = STATUS_ICONS[booking.status];

                return (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between rounded-lg border border-white/5 bg-gray-800/30 p-3 transition hover:bg-gray-800/50"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">
                        {booking.name}
                      </p>
                      <p className="text-sm text-gray-400">{booking.date}</p>
                    </div>
                    <span
                      className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[booking.status]}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {booking.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Blog Posts */}
        <div className="rounded-xl border border-white/10 bg-gray-800/50 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Recent Blog Posts
            </h2>
            <Link
              href="/admin/dashboard/blogs"
              className="group flex items-center gap-1 text-sm text-gray-400 transition hover:text-sky-400"
            >
              View All
              <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {recentPosts.length === 0 ? (
            <p className="mt-6 text-sm text-gray-500">No blog posts yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/admin/dashboard/blogs/${post.id}/edit`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-gray-800/30 p-3 transition hover:bg-gray-800/50"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-sm font-semibold text-sky-400">
                      {post.category.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">
                        {post.title}
                      </p>
                      <p className="truncate text-sm text-gray-400">
                        {post.category}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 text-sm text-gray-500">
                    {post.date}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
