"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiX, FiCheck } from "react-icons/fi";
import type { MediaItem } from "@/lib/media";

// Reusable image picker — pulls from the same media library you manage
// at /admin/dashboard/files. Any admin form that needs to attach an
// image (blog posts now, gallery/team later) can reuse this instead of
// building its own upload control.
export default function MediaPickerDialog({
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
        if (!cancelled) setMedia(data as MediaItem[]);
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

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-white/10 bg-gray-900 shadow-2xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 p-5">
          <h2 className="text-base font-semibold text-white">
            Choose An Image
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-white"
          >
            <FiX className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {loading && (
            <p className="py-10 text-center text-sm text-gray-500">
              Loading media library...
            </p>
          )}

          {errorMessage && (
            <p className="py-10 text-center text-sm text-red-400">
              {errorMessage}
            </p>
          )}

          {!loading && !errorMessage && media.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-sm text-gray-500">
                No images in your media library yet.
              </p>
              <Link
                href="/admin/dashboard/files/add"
                className="mt-3 inline-block text-sm font-semibold text-sky-400 hover:text-sky-300"
              >
                Upload one first →
              </Link>
            </div>
          )}

          {!loading && !errorMessage && media.length > 0 && (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {media.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className="group relative aspect-square overflow-hidden rounded-lg border-2 border-transparent bg-gray-800 transition hover:border-sky-500"
                >
                  <Image
                    src={item.url}
                    alt={item.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 33vw, 25vw"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
                    <FiCheck className="h-6 w-6 text-white" />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 truncate bg-linear-to-t from-black/80 to-transparent px-2 py-1.5 text-left text-[10px] text-white/90">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
