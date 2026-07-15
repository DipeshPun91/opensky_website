"use client";

import { useState } from "react";
import { FiMenu, FiBell, FiChevronDown, FiSearch } from "react-icons/fi";
import LogoutButton from "./LogoutButton";

export default function Navbar({
  username,
  onMenuClick,
}: {
  username: string;
  onMenuClick: () => void;
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-19 shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-gray-900 px-4 sm:px-6 lg:px-8">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white lg:hidden"
          aria-label="Open menu"
        >
          <FiMenu size={22} />
        </button>

        <h1 className="hidden text-sm font-medium text-white/90 sm:block">
          Dashboard
        </h1>

        <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 transition focus-within:border-sky-500 md:flex">
          <FiSearch className="h-4 w-4 text-white/40" />
          <input
            type="text"
            placeholder="Search..."
            className="w-48 bg-transparent text-white outline-none placeholder:text-white/40 lg:w-64"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          className="relative rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
          aria-label="Notifications"
        >
          <FiBell size={20} />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowUserMenu((prev) => !prev)}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition hover:bg-white/10"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500 text-white">
              <span className="text-sm font-semibold uppercase">
                {username?.charAt(0) || "U"}
              </span>
            </div>
            <span className="hidden text-sm font-medium text-white/90 sm:inline">
              {username}
            </span>
            <FiChevronDown
              className={`hidden text-white/40 transition duration-200 sm:block ${
                showUserMenu ? "rotate-180" : ""
              }`}
              size={16}
            />
          </button>

          {showUserMenu && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 top-full z-50 mt-2 w-56 max-w-[calc(100vw-2rem)] rounded-lg border border-white/10 bg-gray-800 py-1 shadow-2xl">
                <div className="border-b border-white/10 px-4 py-3">
                  <p className="truncate text-sm font-medium text-white">
                    {username}
                  </p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
                <div className="px-2 py-2">
                  <LogoutButton />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
