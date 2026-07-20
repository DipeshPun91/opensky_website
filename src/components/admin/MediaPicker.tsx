"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiX,
  FiCheck,
  FiSearch,
  FiFolder,
  FiGrid,
  FiList,
} from "react-icons/fi";
import type { MediaItem } from "@/lib/media";
import { useScrollLock } from "@/hooks/useScrollLock";

// Reusable image picker — pulls from the same media library you manage
// at /admin/dashboard/files. Any admin form that needs to attach an
// image (blog posts now, gallery/team later) can reuse this instead of
// building its own upload control.
export default function MediaPicker({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (item: MediaItem) => void;
}) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeFolder, setActiveFolder] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Lock scroll when dialog is open
  useScrollLock(open);

  // Fetch media when dialog opens
  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    const fetchMedia = async () => {
      setLoading(true);
      setErrorMessage(null);

      try {
        const res = await fetch("/api/admin/media");
        if (!res.ok) throw new Error("Could not load media.");
        const data = await res.json();
        if (!cancelled) {
          setMedia(data as MediaItem[]);
          setActiveFolder("all");
          setSearchQuery("");
        }
      } catch {
        if (!cancelled) setErrorMessage("Could not load your media library.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMedia();

    return () => {
      cancelled = true;
    };
  }, [open]);

  // Handle keyboard events
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Folders derived from whatever's actually in the library
  const folders = useMemo(() => {
    const unique = new Set(media.map((item) => item.folder));
    return Array.from(unique).sort();
  }, [media]);

  // Filter media by folder and search query
  const visibleMedia = useMemo(() => {
    let filtered = media;

    if (activeFolder !== "all") {
      filtered = filtered.filter((item) => item.folder === activeFolder);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.label.toLowerCase().includes(query) ||
          item.folder.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [media, activeFolder, searchQuery]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      {/* Backdrop with enhanced blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-gray-900 to-gray-950 shadow-2xl shadow-black/50"
      >
        {/* Header */}
        <div className="relative shrink-0 border-b border-white/10 bg-linear-to-r from-gray-900/50 to-gray-800/50 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-white">
                Media Library
              </h2>
              <p className="mt-0.5 text-xs text-gray-400">
                {media.length} {media.length === 1 ? "image" : "images"}{" "}
                available
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition-all duration-200 hover:bg-white/10 hover:text-white hover:rotate-90"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Toolbar with search and view options */}
        <div className="flex shrink-0 flex-wrap items-center gap-3 border-b border-white/10 bg-white/5 px-6 py-3">
          <div className="relative flex-1 min-w-45">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search images..."
              className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all duration-200"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                <FiX className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`rounded-md p-2 transition-all duration-200 ${
                viewMode === "grid"
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
              aria-label="Grid view"
            >
              <FiGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`rounded-md p-2 transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
              aria-label="List view"
            >
              <FiList className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Category filter with outline design */}
        {!loading && !errorMessage && folders.length > 1 && (
          <div className="flex shrink-0 flex-wrap items-center gap-1.5 border-b border-white/10 bg-white/5 px-6 py-3">
            <FiFolder className="h-4 w-4 text-gray-500 mr-1" />
            <button
              type="button"
              onClick={() => setActiveFolder("all")}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                activeFolder === "all"
                  ? "border-2 border-sky-500 bg-sky-500/10 text-sky-400"
                  : "border-2 border-transparent text-gray-400 hover:border-white/20 hover:text-white"
              }`}
            >
              All
              <span className="ml-2 inline-flex h-4 min-w-5 items-center justify-center rounded-full bg-white/10 px-1.5 text-[10px] font-semibold">
                {media.length}
              </span>
            </button>

            {folders.map((folder) => {
              const count = media.filter(
                (item) => item.folder === folder,
              ).length;
              const isActive = activeFolder === folder;

              return (
                <button
                  key={folder}
                  type="button"
                  onClick={() => setActiveFolder(folder)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "border-2 border-sky-500 bg-sky-500/10 text-sky-400"
                      : "border-2 border-transparent text-gray-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {folder}
                  <span
                    className={`ml-2 inline-flex h-4 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold ${
                      isActive ? "bg-sky-500/20" : "bg-white/10"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Content area with improved styling */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="h-12 w-12 animate-spin rounded-full border-2 border-sky-500/20 border-t-sky-500" />
                <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-transparent border-t-sky-500/30 animate-pulse" />
              </div>
              <p className="mt-4 text-sm text-gray-400 font-medium">
                Loading media library...
              </p>
            </div>
          )}

          {errorMessage && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="rounded-full bg-red-500/10 p-4 ring-1 ring-red-500/20">
                <FiX className="h-8 w-8 text-red-400" />
              </div>
              <p className="mt-4 text-sm font-medium text-red-400">
                {errorMessage}
              </p>
              <button
                type="button"
                onClick={() => {
                  setErrorMessage(null);
                  setLoading(true);
                  const fetchMedia = async () => {
                    try {
                      const res = await fetch("/api/admin/media");
                      if (!res.ok) throw new Error("Could not load media.");
                      const data = await res.json();
                      setMedia(data as MediaItem[]);
                      setActiveFolder("all");
                    } catch {
                      setErrorMessage("Could not load your media library.");
                    } finally {
                      setLoading(false);
                    }
                  };
                  fetchMedia();
                }}
                className="mt-4 rounded-lg bg-white/10 px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-white/20 hover:scale-105"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !errorMessage && media.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="rounded-full bg-white/5 p-5 ring-1 ring-white/10">
                <FiFolder className="h-10 w-10 text-gray-500" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">
                No images yet
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                Your media library is empty.
              </p>
              <Link
                href="/admin/dashboard/files/add"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-sky-500 to-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-sky-500/30 hover:scale-105"
              >
                Upload your first image →
              </Link>
            </div>
          )}

          {!loading &&
            !errorMessage &&
            media.length > 0 &&
            visibleMedia.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="rounded-full bg-white/5 p-5 ring-1 ring-white/10">
                  <FiSearch className="h-10 w-10 text-gray-500" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">
                  No results found
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  Try adjusting your search or filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFolder("all");
                  }}
                  className="mt-4 text-sm font-medium text-sky-400 transition-all duration-200 hover:text-sky-300 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}

          {!loading && !errorMessage && visibleMedia.length > 0 && (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
                  : "flex flex-col gap-3"
              }
            >
              {visibleMedia.map((item) =>
                viewMode === "grid" ? (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelect(item);
                      onClose();
                    }}
                    className="group relative aspect-square overflow-hidden rounded-xl border-2 border-transparent bg-gray-800 transition-all duration-300 hover:border-sky-500 hover:shadow-xl hover:shadow-sky-500/20 hover:-translate-y-1"
                  >
                    <Image
                      src={item.url}
                      alt={item.label}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <div className="rounded-full bg-sky-500 p-3 shadow-2xl shadow-sky-500/50 scale-90 transition-transform duration-300 group-hover:scale-100">
                        <FiCheck className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <p className="truncate text-xs font-medium text-white/90 drop-shadow-lg">
                        {item.label}
                      </p>
                      <p className="truncate text-[10px] text-gray-300/70 drop-shadow-lg">
                        {item.folder}
                      </p>
                    </div>
                  </button>
                ) : (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelect(item);
                      onClose();
                    }}
                    className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:border-sky-500 hover:bg-white/10 hover:shadow-lg hover:shadow-sky-500/10 hover:-translate-y-0.5"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-800">
                      <Image
                        src={item.url}
                        alt={item.label}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-white group-hover:text-sky-400 transition-colors">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-400">{item.folder}</p>
                    </div>
                    <div className="shrink-0 rounded-full bg-sky-500 p-2 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
                      <FiCheck className="h-4 w-4 text-white" />
                    </div>
                  </button>
                ),
              )}
            </div>
          )}
        </div>

        {/* Footer with improved styling */}
        <div className="flex shrink-0 items-center justify-between border-t border-white/10 bg-white/5 px-6 py-3.5">
          <p className="text-xs text-gray-400">
            Showing{" "}
            <span className="font-medium text-white">
              {visibleMedia.length}
            </span>{" "}
            of <span className="font-medium text-white">{media.length}</span>{" "}
            images
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-white/10 px-4 py-1.5 text-sm font-medium text-white transition-all duration-200 hover:bg-white/20"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
