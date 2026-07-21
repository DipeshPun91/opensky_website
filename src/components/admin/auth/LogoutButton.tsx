"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="group relative flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-400 transition hover:bg-white/5 hover:text-red-400 disabled:opacity-60"
    >
      {/* Left border indicator */}
      <div className="absolute left-0 top-0 h-full w-0.5 bg-red-500 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200"></div>
      <FiLogOut size={16} className="group-hover:text-red-400" />
      {loading ? "Signing Out..." : "Sign Out"}
    </button>
  );
}
