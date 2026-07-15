import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import {
  FiUsers,
  FiMail,
  FiImage,
  FiBookOpen,
  FiCalendar,
  FiTrendingUp,
  FiMessageSquare,
  FiFileText,
  FiArrowRight,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiPlus,
} from "react-icons/fi";

// Mock data - replace with actual database queries
async function getDashboardStats() {
  return {
    totalBookings: 24,
    totalMessages: 12,
    totalGallery: 48,
    totalBlogs: 7,
    recentBookings: [
      { id: 1, name: "John Doe", date: "2024-01-15", status: "Confirmed" },
      { id: 2, name: "Jane Smith", date: "2024-01-14", status: "Pending" },
      { id: 3, name: "Mike Johnson", date: "2024-01-13", status: "Completed" },
    ],
    recentMessages: [
      {
        id: 1,
        name: "Sarah Wilson",
        subject: "Booking Inquiry",
        date: "2024-01-15",
      },
      {
        id: 2,
        name: "Tom Brown",
        subject: "Group Booking",
        date: "2024-01-14",
      },
    ],
  };
}

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    redirect("/admin/login");
  }

  const stats = await getDashboardStats();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="rounded-xl border border-white/10 bg-linear-to-r from-gray-800/50 to-gray-900/50 p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome back, {session.username}! 👋
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
        <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-gray-800/50 p-6 transition-all hover:border-sky-500/50 hover:bg-gray-800/70">
          <div className="absolute inset-0 bg-linear-to-br from-sky-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">
                Total Bookings
              </p>
              <p className="mt-1 text-3xl font-bold text-white">
                {stats.totalBookings}
              </p>
            </div>
            <div className="rounded-xl bg-sky-500/10 p-3 group-hover:bg-sky-500/20 transition-colors">
              <FiCalendar className="h-6 w-6 text-sky-400" />
            </div>
          </div>
          <div className="relative mt-4 flex items-center text-sm">
            <FiTrendingUp className="mr-1 h-4 w-4 text-emerald-400" />
            <span className="text-emerald-400">+12%</span>
            <span className="ml-2 text-gray-500">vs last month</span>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-gray-800/50 p-6 transition-all hover:border-emerald-500/50 hover:bg-gray-800/70">
          <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Messages</p>
              <p className="mt-1 text-3xl font-bold text-white">
                {stats.totalMessages}
              </p>
            </div>
            <div className="rounded-xl bg-emerald-500/10 p-3 group-hover:bg-emerald-500/20 transition-colors">
              <FiMail className="h-6 w-6 text-emerald-400" />
            </div>
          </div>
          <div className="relative mt-4 flex items-center text-sm">
            <FiAlertCircle className="mr-1 h-4 w-4 text-yellow-400" />
            <span className="text-yellow-400">3 unread</span>
            <span className="ml-2 text-gray-500">urgent</span>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-gray-800/50 p-6 transition-all hover:border-purple-500/50 hover:bg-gray-800/70">
          <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Gallery</p>
              <p className="mt-1 text-3xl font-bold text-white">
                {stats.totalGallery}
              </p>
            </div>
            <div className="rounded-xl bg-purple-500/10 p-3 group-hover:bg-purple-500/20 transition-colors">
              <FiImage className="h-6 w-6 text-purple-400" />
            </div>
          </div>
          <div className="relative mt-4 flex items-center text-sm">
            <FiPlus className="mr-1 h-4 w-4 text-purple-400" />
            <span className="text-purple-400">12 new</span>
            <span className="ml-2 text-gray-500">this month</span>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-gray-800/50 p-6 transition-all hover:border-orange-500/50 hover:bg-gray-800/70">
          <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Blog Posts</p>
              <p className="mt-1 text-3xl font-bold text-white">
                {stats.totalBlogs}
              </p>
            </div>
            <div className="rounded-xl bg-orange-500/10 p-3 group-hover:bg-orange-500/20 transition-colors">
              <FiBookOpen className="h-6 w-6 text-orange-400" />
            </div>
          </div>
          <div className="relative mt-4 flex items-center text-sm">
            <FiClock className="mr-1 h-4 w-4 text-orange-400" />
            <span className="text-orange-400">2 drafts</span>
            <span className="ml-2 text-gray-500">pending review</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-white/10 bg-gray-800/50 p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <button className="group flex flex-col items-center rounded-xl border border-white/10 bg-gray-800/30 p-4 transition-all hover:border-sky-500/50 hover:bg-sky-500/10">
            <div className="rounded-lg bg-sky-500/10 p-2.5 group-hover:bg-sky-500/20 transition-colors">
              <FiCalendar className="h-5 w-5 text-sky-400" />
            </div>
            <span className="mt-2 text-xs font-medium text-gray-300 group-hover:text-white">
              Add Booking
            </span>
          </button>
          <button className="group flex flex-col items-center rounded-xl border border-white/10 bg-gray-800/30 p-4 transition-all hover:border-emerald-500/50 hover:bg-emerald-500/10">
            <div className="rounded-lg bg-emerald-500/10 p-2.5 group-hover:bg-emerald-500/20 transition-colors">
              <FiMail className="h-5 w-5 text-emerald-400" />
            </div>
            <span className="mt-2 text-xs font-medium text-gray-300 group-hover:text-white">
              View Messages
            </span>
          </button>
          <button className="group flex flex-col items-center rounded-xl border border-white/10 bg-gray-800/30 p-4 transition-all hover:border-purple-500/50 hover:bg-purple-500/10">
            <div className="rounded-lg bg-purple-500/10 p-2.5 group-hover:bg-purple-500/20 transition-colors">
              <FiImage className="h-5 w-5 text-purple-400" />
            </div>
            <span className="mt-2 text-xs font-medium text-gray-300 group-hover:text-white">
              Add Photo
            </span>
          </button>
          <button className="group flex flex-col items-center rounded-xl border border-white/10 bg-gray-800/30 p-4 transition-all hover:border-orange-500/50 hover:bg-orange-500/10">
            <div className="rounded-lg bg-orange-500/10 p-2.5 group-hover:bg-orange-500/20 transition-colors">
              <FiFileText className="h-5 w-5 text-orange-400" />
            </div>
            <span className="mt-2 text-xs font-medium text-gray-300 group-hover:text-white">
              New Blog
            </span>
          </button>
          <button className="group flex flex-col items-center rounded-xl border border-white/10 bg-gray-800/30 p-4 transition-all hover:border-rose-500/50 hover:bg-rose-500/10">
            <div className="rounded-lg bg-rose-500/10 p-2.5 group-hover:bg-rose-500/20 transition-colors">
              <FiUsers className="h-5 w-5 text-rose-400" />
            </div>
            <span className="mt-2 text-xs font-medium text-gray-300 group-hover:text-white">
              Manage Team
            </span>
          </button>
          <button className="group flex flex-col items-center rounded-xl border border-white/10 bg-gray-800/30 p-4 transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10">
            <div className="rounded-lg bg-indigo-500/10 p-2.5 group-hover:bg-indigo-500/20 transition-colors">
              <FiMessageSquare className="h-5 w-5 text-indigo-400" />
            </div>
            <span className="mt-2 text-xs font-medium text-gray-300 group-hover:text-white">
              Testimonials
            </span>
          </button>
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
            <button className="group flex items-center gap-1 text-sm text-gray-400 transition hover:text-sky-400">
              View All
              <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {stats.recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between rounded-lg border border-white/5 bg-gray-800/30 p-3 transition hover:bg-gray-800/50"
              >
                <div>
                  <p className="font-medium text-white">{booking.name}</p>
                  <p className="text-sm text-gray-400">{booking.date}</p>
                </div>
                <span
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                    booking.status === "Confirmed"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : booking.status === "Pending"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-blue-500/10 text-blue-400"
                  }`}
                >
                  {booking.status === "Confirmed" && (
                    <FiCheckCircle className="h-3 w-3" />
                  )}
                  {booking.status === "Pending" && (
                    <FiClock className="h-3 w-3" />
                  )}
                  {booking.status === "Completed" && (
                    <FiCheckCircle className="h-3 w-3" />
                  )}
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="rounded-xl border border-white/10 bg-gray-800/50 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Recent Messages
            </h2>
            <button className="group flex items-center gap-1 text-sm text-gray-400 transition hover:text-sky-400">
              View All
              <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {stats.recentMessages.map((message) => (
              <div
                key={message.id}
                className="flex items-center justify-between rounded-lg border border-white/5 bg-gray-800/30 p-3 transition hover:bg-gray-800/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500/10 text-sm font-semibold text-sky-400">
                    {message.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-white">{message.name}</p>
                    <p className="text-sm text-gray-400">{message.subject}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{message.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
