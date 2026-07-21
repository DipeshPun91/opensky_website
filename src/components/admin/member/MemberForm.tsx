"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiImage, FiUpload, FiX, FiSave, FiTrash2 } from "react-icons/fi";
import type { Member } from "@/lib/members";
import type { MediaItem } from "@/lib/media";
import MediaPicker from "../MediaPicker";
import RichTextEditor from "../../ui/RichTextEditor";

interface FormState {
  name: string;
  role: string;
  bio: string;
  image: string;
  facebook: string;
  instagram: string;
}

function toInitialState(member?: Member | null): FormState {
  if (!member) {
    return {
      name: "",
      role: "",
      bio: "",
      image: "",
      facebook: "",
      instagram: "",
    };
  }
  return {
    name: member.name,
    role: member.role,
    bio: member.bio || "",
    image: member.image,
    facebook: member.facebook || "",
    instagram: member.instagram || "",
  };
}

export default function MemberForm({ member }: { member?: Member | null }) {
  const router = useRouter();
  const isEditing = Boolean(member);

  const [form, setForm] = useState<FormState>(toInitialState(member));
  const [pickerOpen, setPickerOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImageSelect = (item: MediaItem) => {
    setForm((prev) => ({ ...prev, image: item.url }));
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({ ...prev, image: "" }));
  };

  const handleBioChange = (html: string) => {
    setForm((prev) => ({ ...prev, bio: html }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMessage(null);

    const url = isEditing
      ? `/api/admin/members/${member!.id}`
      : "/api/admin/members";
    const method = isEditing ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Could not save this member.");
        setSaving(false);
        return;
      }

      router.push("/admin/dashboard/members");
      router.refresh();
    } catch {
      setErrorMessage("Could not reach the server. Please try again.");
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!isEditing) return;
    const confirmed = window.confirm(
      `Are you sure you want to delete ${member?.name}? This action cannot be undone.`,
    );
    if (!confirmed) return;

    setSaving(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/admin/members/${member!.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || "Could not delete member.");
        setSaving(false);
        return;
      }

      router.push("/admin/dashboard/members");
      router.refresh();
    } catch {
      setErrorMessage("Could not reach the server. Please try again.");
      setSaving(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {errorMessage && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-5 py-3.5 text-sm text-red-400 backdrop-blur-sm">
            {errorMessage}
          </div>
        )}

        {/* Profile Image */}
        <div className="rounded-xl border border-white/10 bg-linear-to-br from-gray-900/60 to-gray-800/30 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">
                Profile Image
              </h2>
              <p className="mt-1 text-xs text-gray-400">
                Select an image from your media library
              </p>
            </div>
            {form.image && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                aria-label="Remove image"
              >
                <FiX className="h-4 w-4" />
              </button>
            )}
          </div>

          {form.image ? (
            // Image preview
            <div className="mt-4">
              <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-white/10 bg-gray-900/60">
                <Image
                  src={form.image}
                  alt="Profile image"
                  fill
                  className="object-cover"
                  sizes="128px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                  <button
                    type="button"
                    onClick={() => setPickerOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
                  >
                    <FiUpload className="h-3.5 w-3.5" />
                    Change
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Upload placeholder
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                className="group relative flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-full border-2 border-dashed border-white/10 bg-gray-900/40 transition hover:border-sky-500/50 hover:bg-gray-900/60"
              >
                <div className="rounded-full bg-sky-500/10 p-2.5 transition group-hover:bg-sky-500/20">
                  <FiImage className="h-5 w-5 text-sky-400" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-white">Add photo</p>
                  <p className="text-[10px] text-gray-400">Browse library</p>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Member Details */}
        <div className="rounded-xl border border-white/10 bg-linear-to-br from-gray-900/60 to-gray-800/30 p-6 backdrop-blur-sm">
          <h2 className="text-base font-semibold text-white">Member Details</h2>

          <div className="mt-5 flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="rounded-lg border border-white/10 bg-gray-900/60 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  placeholder="e.g., John Doe"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Role / Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.role}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, role: e.target.value }))
                  }
                  placeholder="e.g., Senior Pilot & Safety Officer"
                  className="rounded-lg border border-white/10 bg-gray-900/60 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
            </div>

            {/* Bio with Rich Text Editor */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                Bio{" "}
                <span className="font-normal text-gray-500">(optional)</span>
              </label>
              <RichTextEditor value={form.bio} onChange={handleBioChange} />
              <p className="text-[11px] text-gray-500">
                Use the toolbar to format your bio.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Facebook URL{" "}
                  <span className="font-normal text-gray-500">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.facebook}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, facebook: e.target.value }))
                  }
                  placeholder="https://facebook.com/username"
                  className="rounded-lg border border-white/10 bg-gray-900/60 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Instagram URL{" "}
                  <span className="font-normal text-gray-500">(optional)</span>
                </label>
                <input
                  type="text"
                  value={form.instagram}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, instagram: e.target.value }))
                  }
                  placeholder="https://instagram.com/username"
                  className="rounded-lg border border-white/10 bg-gray-900/60 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-500/20 px-4 py-2.5 text-sm font-medium text-sky-400 transition hover:border-sky-500 hover:bg-sky-500/10 hover:text-sky-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiSave className="h-4 w-4" />
              {saving ? "Saving..." : isEditing ? "Save Changes" : "Add Member"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/dashboard/members")}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:border-white/20 hover:bg-white/5 hover:text-white hover:scale-105"
            >
              Cancel
            </button>
          </div>

          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/20 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:border-red-500 hover:bg-red-500/10 hover:text-red-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiTrash2 className="h-4 w-4" />
              Delete Member
            </button>
          )}
        </div>
      </form>

      <MediaPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handleImageSelect}
      />
    </>
  );
}
