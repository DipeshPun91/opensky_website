// components/admin/auth/LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiLock, FiUser, FiShield, FiLogIn } from "react-icons/fi";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials. Please try again.");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Could not reach the server. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Logo/Brand Section */}
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-sky-500/10 p-4">
          <FiShield className="h-8 w-8 text-sky-400" />
        </div>
        <h1 className="text-3xl font-black text-white">Admin Panel</h1>
        <p className="mt-1 text-sm text-gray-400">Authorized access only</p>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm shadow-2xl"
      >
        <div className="space-y-5">
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-400"
            >
              Username
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FiUser className="h-4 w-4 text-gray-500" />
              </div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-gray-900/60 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                placeholder="Enter your username"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-400"
            >
              Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <FiLock className="h-4 w-4 text-gray-500" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-gray-900/60 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm text-red-400">
              <div className="h-4 w-0.5 bg-red-500/30" />
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full overflow-hidden rounded-xl border-2 border-sky-500/50 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-[2px] text-sky-400 transition-all duration-300 hover:border-sky-500 hover:bg-sky-500/10 hover:text-sky-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <FiLogIn className="h-4 w-4" />
              {loading ? "Signing In..." : "Sign In"}
            </span>
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full transform bg-white/5 transition-transform duration-300 group-hover:translate-x-full" />
          </button>
        </div>
      </form>

      {/* Footer */}
      <p className="mt-6 text-center text-xs text-gray-500">
        Secure • Encrypted • Protected
      </p>
    </div>
  );
}
