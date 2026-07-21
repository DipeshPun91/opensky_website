"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
  FiArrowUp,
  FiArrowDown,
  FiGrid,
  FiImage,
} from "react-icons/fi";
import type { GalleryItem } from "@/lib/gallery";
import type { MediaItem } from "@/lib/media";
import MediaPicker from "../MediaPicker";

export default function GalleryManager({
  initialItems,
}: {
  initialItems: GalleryItem[];
}) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [busyIds, setBusyIds] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState("");

  const setBusy = (id: string, busy: boolean) => {
    setBusyIds((prev) => {
      const next = new Set(prev);
      if (busy) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const handleAddImage = async (media: MediaItem) => {
    setErrorMessage(null);

    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: media.url, caption: media.label }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Could not add that image.");
        return;
      }

      setItems((prev) => [...prev, data as GalleryItem]);
    } catch {
      setErrorMessage("Could not reach the server. Please try again.");
    }
  };

  const startEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setEditCaption(item.caption);
    setErrorMessage(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditCaption("");
  };

  const saveCaption = async (id: string) => {
    setBusy(id, true);
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caption: editCaption }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Could not save that caption.");
        return;
      }

      setItems((prev) =>
        prev.map((item) => (item.id === id ? (data as GalleryItem) : item)),
      );
      setEditingId(null);
    } catch {
      setErrorMessage("Could not reach the server. Please try again.");
    } finally {
      setBusy(id, false);
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    const confirmed = window.confirm(
      `Remove this image from the gallery? This can't be undone.`,
    );
    if (!confirmed) return;

    setBusy(item.id, true);
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/admin/gallery/${item.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || "Could not remove that image.");
        return;
      }

      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch {
      setErrorMessage("Could not reach the server. Please try again.");
    } finally {
      setBusy(item.id, false);
    }
  };

  const handleMove = async (item: GalleryItem, direction: "up" | "down") => {
    setBusy(item.id, true);
    setErrorMessage(null);

    const index = items.findIndex((i) => i.id === item.id);
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= items.length) {
      setBusy(item.id, false);
      return;
    }

    const reordered = [...items];
    [reordered[index], reordered[swapIndex]] = [
      reordered[swapIndex],
      reordered[index],
    ];
    setItems(reordered);

    try {
      const res = await fetch(`/api/admin/gallery/${item.id}/move`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ direction }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || "Could not reorder.");
        setItems(items);
      }
    } catch {
      setErrorMessage("Could not reach the server. Please try again.");
      setItems(items);
    } finally {
      setBusy(item.id, false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {errorMessage && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400 backdrop-blur-sm">
          <div className="h-8 w-0.5 bg-red-500/30" />
          {errorMessage}
        </div>
      )}

      {/* Header with actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/5 px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-sky-500/10 p-2">
            <FiGrid className="h-5 w-5 text-sky-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Gallery Items</p>
            <p className="text-xs text-gray-400">
              {items.length} {items.length === 1 ? "image" : "images"} in your
              gallery
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPickerOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl border-2 border-sky-500/50 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-sky-400 transition-all duration-300 hover:border-sky-500 hover:bg-sky-500/10 hover:text-sky-300 hover:scale-105"
        >
          <FiPlus className="h-4 w-4" />
          Add Image
        </button>
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-gray-800/30 p-16 text-center transition-all hover:border-white/20">
          <div className="mb-4 rounded-full bg-sky-500/10 p-4">
            <FiImage className="h-8 w-8 text-sky-400/60" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">
            No images in the gallery
          </h3>
          <p className="text-sm text-gray-400">
            Add your first image from the media library to start building your
            gallery.
          </p>
        </div>
      ) : (
        /* Gallery Grid */
        <div className="grid gap-4">
          {items.map((item, index) => {
            const isBusy = busyIds.has(item.id);
            const isEditing = editingId === item.id;
            const isFirst = index === 0;
            const isLast = index === items.length - 1;

            return (
              <div
                key={item.id}
                className="group relative rounded-2xl border border-white/5 bg-gray-800/30 p-3 transition-all duration-300 hover:border-white/10 hover:bg-gray-800/50 hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  {/* Order indicator */}
                  <div className="flex shrink-0 items-center gap-2">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => handleMove(item, "up")}
                        disabled={isFirst || isBusy}
                        aria-label="Move up"
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 transition-all hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <FiArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleMove(item, "down")}
                        disabled={isLast || isBusy}
                        aria-label="Move down"
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 transition-all hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <FiArrowDown className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="w-6 text-center text-xs font-mono text-gray-500">
                      {index + 1}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-900">
                    <Image
                      src={item.imageUrl}
                      alt={item.caption || "Gallery image"}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="96px"
                    />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1 space-y-2 pt-1">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editCaption}
                          onChange={(e) => setEditCaption(e.target.value)}
                          autoFocus
                          placeholder="Enter caption..."
                          className="flex-1 rounded-xl border border-sky-500/30 bg-gray-900/60 px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        />
                        <button
                          onClick={() => saveCaption(item.id)}
                          disabled={isBusy}
                          aria-label="Save caption"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition-all hover:bg-emerald-500/20 hover:scale-105 disabled:opacity-60"
                        >
                          <FiCheck className="h-4 w-4" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          aria-label="Cancel"
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition-all hover:bg-white/10 hover:text-white"
                        >
                          <FiX className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="truncate text-sm font-medium text-white">
                          {item.caption || (
                            <span className="italic text-gray-500">
                              Untitled
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-400">
                          Added {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  {!isEditing && (
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        onClick={() => startEdit(item)}
                        aria-label="Edit caption"
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition-all hover:bg-white/5 hover:text-sky-400"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        disabled={isBusy}
                        aria-label="Remove image"
                        className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition-all hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Loading overlay */}
                {isBusy && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50 backdrop-blur-sm">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Media Picker Modal */}
      <MediaPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handleAddImage}
      />
    </div>
  );
}
