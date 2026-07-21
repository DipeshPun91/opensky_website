"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FiTrash2,
  FiCopy,
  FiCheck,
  FiSearch,
  FiGrid,
  FiList,
  FiChevronDown,
  FiX,
} from "react-icons/fi";
import type { MediaItem } from "@/lib/media";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface MediaGridProps {
  initialMedia: MediaItem[];
}

export default function MediaGrid({ initialMedia }: MediaGridProps) {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [filteredMedia, setFilteredMedia] = useState<MediaItem[]>(initialMedia);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFolder, setSelectedFolder] = useState<string>("all");

  // Get unique folders
  const folders = ["all", ...new Set(media.map((item) => item.folder))];

  // Handle search and filter
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterMedia(query, selectedFolder);
  };

  const handleFolderFilter = (folder: string) => {
    setSelectedFolder(folder);
    filterMedia(searchQuery, folder);
  };

  const filterMedia = (query: string, folder: string) => {
    let filtered = media;

    if (folder !== "all") {
      filtered = filtered.filter((item) => item.folder === folder);
    }

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.folder.toLowerCase().includes(q),
      );
    }

    setFilteredMedia(filtered);
  };

  const handleDelete = async (item: MediaItem) => {
    const confirmed = window.confirm(
      `Delete "${item.label}"? This can't be undone.`,
    );
    if (!confirmed) return;

    setDeletingIds((prev) => new Set(prev).add(item.id));
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/admin/media/${item.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || "Could not delete that file.");
        return;
      }

      const updatedMedia = media.filter((m) => m.id !== item.id);
      setMedia(updatedMedia);
      setFilteredMedia(updatedMedia);
    } catch {
      setErrorMessage("Could not reach the server. Please try again.");
    } finally {
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }
  };

  const handleCopy = async (item: MediaItem) => {
    await navigator.clipboard.writeText(item.url);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearSearch = () => {
    setSearchQuery("");
    filterMedia("", selectedFolder);
  };

  return (
    <div className="space-y-4">
      {/* Error Message */}
      {errorMessage && (
        <div className="animate-slideDown rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400 backdrop-blur-sm">
          <span className="font-medium">Error:</span> {errorMessage}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col gap-4 rounded-xl border border-white/5 bg-gray-800/30 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-gray-900/50 py-2 pl-10 pr-10 text-sm text-white placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <FiX className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Folder Filter */}
          <div className="relative">
            <select
              value={selectedFolder}
              onChange={(e) => handleFolderFilter(e.target.value)}
              className="appearance-none rounded-lg border border-white/10 bg-gray-900/50 px-4 py-2 pr-10 text-sm text-white focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            >
              {folders.map((folder) => (
                <option key={folder} value={folder} className="bg-gray-900">
                  {folder === "all" ? "All Folders" : folder}
                </option>
              ))}
            </select>
            <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>

          {/* View Toggle */}
          <div className="flex rounded-lg border border-white/10 bg-gray-900/50 p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded-md p-2 transition-all ${
                viewMode === "grid"
                  ? "bg-sky-500/20 text-sky-400"
                  : "text-gray-400 hover:text-white"
              }`}
              aria-label="Grid view"
            >
              <FiGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`rounded-md p-2 transition-all ${
                viewMode === "list"
                  ? "bg-sky-500/20 text-sky-400"
                  : "text-gray-400 hover:text-white"
              }`}
              aria-label="List view"
            >
              <FiList className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Media Grid/List */}
      <div className="rounded-xl border border-white/5 bg-gray-800/30 p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">
            {filteredMedia.length}{" "}
            {filteredMedia.length === 1 ? "File" : "Files"}
          </h2>
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="text-xs text-gray-400 hover:text-white"
            >
              Clear search
            </button>
          )}
        </div>

        {filteredMedia.length === 0 ? (
          <EmptyState />
        ) : viewMode === "grid" ? (
          <GridLayout
            items={filteredMedia}
            onDelete={handleDelete}
            onCopy={handleCopy}
            deletingIds={deletingIds}
            copiedId={copiedId}
          />
        ) : (
          <ListLayout
            items={filteredMedia}
            onDelete={handleDelete}
            onCopy={handleCopy}
            deletingIds={deletingIds}
            copiedId={copiedId}
          />
        )}
      </div>
    </div>
  );
}

// Sub-components
interface LayoutProps {
  items: MediaItem[];
  onDelete: (item: MediaItem) => void;
  onCopy: (item: MediaItem) => void;
  deletingIds: Set<string>;
  copiedId: string | null;
}

function EmptyState() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 rounded-full bg-gray-800/50 p-4">
        <FiSearch className="h-8 w-8 text-gray-400" />
      </div>
      <p className="text-sm text-gray-400">No files found</p>
      <p className="text-xs text-gray-500">
        Try adjusting your search or filters
      </p>
    </div>
  );
}

function GridLayout({
  items,
  onDelete,
  onCopy,
  deletingIds,
  copiedId,
}: LayoutProps) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {items.map((item) => (
        <MediaCard
          key={item.id}
          item={item}
          onDelete={onDelete}
          onCopy={onCopy}
          isDeleting={deletingIds.has(item.id)}
          isCopied={copiedId === item.id}
        />
      ))}
    </div>
  );
}

function ListLayout({
  items,
  onDelete,
  onCopy,
  deletingIds,
  copiedId,
}: LayoutProps) {
  return (
    <div className="mt-5 space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 rounded-lg border border-white/5 bg-gray-900/30 p-3 transition-all hover:border-white/10 hover:bg-gray-900/50"
        >
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
            <Image
              src={item.url}
              alt={item.label}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {item.label}
            </p>
            <p className="text-xs text-gray-400">
              {item.width}×{item.height} · {formatBytes(item.bytes)} ·{" "}
              {item.folder}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onCopy(item)}
              className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white"
            >
              {copiedId === item.id ? (
                <FiCheck className="h-4 w-4" />
              ) : (
                <FiCopy className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => onDelete(item)}
              disabled={deletingIds.has(item.id)}
              className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/20 hover:text-red-400 disabled:opacity-50"
            >
              <FiTrash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

interface MediaCardProps {
  item: MediaItem;
  onDelete: (item: MediaItem) => void;
  onCopy: (item: MediaItem) => void;
  isDeleting: boolean;
  isCopied: boolean;
}

function MediaCard({
  item,
  onDelete,
  onCopy,
  isDeleting,
  isCopied,
}: MediaCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/5 bg-gray-900/40 transition-all hover:border-white/10 hover:shadow-xl hover:shadow-black/20 hover:scale-[1.02]">
      <div className="relative aspect-square overflow-hidden bg-gray-800">
        <Image
          src={item.url}
          alt={item.label}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        {/* Action Overlay */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-1 bg-linear-to-b from-black/70 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="rounded-full bg-black/60 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/80">
            {item.folder}
          </span>
          <div className="flex gap-1.5">
            <ActionButton
              onClick={() => onCopy(item)}
              icon={isCopied ? FiCheck : FiCopy}
              label="Copy URL"
              color="hover:bg-sky-500"
              active={isCopied}
            />
            <ActionButton
              onClick={() => onDelete(item)}
              icon={FiTrash2}
              label="Delete"
              color="hover:bg-red-500"
              disabled={isDeleting}
            />
          </div>
        </div>

        {/* Deleting Spinner */}
        {isDeleting && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
          </div>
        )}
      </div>

      <div className="p-3">
        <p className="truncate text-sm font-medium text-white">{item.label}</p>
        <p className="mt-0.5 text-xs text-gray-400">
          {item.width}×{item.height} · {formatBytes(item.bytes)}
        </p>
      </div>
    </div>
  );
}

interface ActionButtonProps {
  onClick: () => void;
  icon: React.ElementType;
  label: string;
  color?: string;
  disabled?: boolean;
  active?: boolean;
}

function ActionButton({
  onClick,
  icon: Icon,
  label,
  color,
  disabled,
  active,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`flex h-8 w-8 items-center justify-center rounded-lg bg-black/50 text-white/80 transition-all hover:text-white ${
        active ? "bg-sky-500 text-white" : color
      } disabled:opacity-50`}
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}
