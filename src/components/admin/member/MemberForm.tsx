"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiImage } from "react-icons/fi";
import type { Member } from "@/lib/members";
import type { MediaItem } from "@/lib/media";
import MediaPicker from "../MediaPicker";

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
    bio: member.bio,
    image: member.image,
    facebook: member.facebook,
    instagram: member.instagram,
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

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {errorMessage && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {errorMessage}
          </div>
        )}

        <div className="rounded-xl border border-white/10 bg-gray-800/50 p-6 backdrop-blur-sm">
          <h2 className="text-base font-semibold text-white">Photo</h2>
          <p className="mt-1 text-xs text-gray-400">
            Selected from your media library.
          </p>

          <div className="mt-4 flex items-center gap-4">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-white/10 bg-gray-900/60">
              {form.image ? (
                <Image
                  src={form.image}
                  alt="Selected member photo"
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-600">
                  <FiImage className="h-6 w-6" />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="inline-flex items-center justify-center rounded-md border border-white/10 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-gray-300 transition hover:bg-white/5 hover:text-white"
            >
              {form.image ? "Change Photo" : "Choose Photo"}
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-gray-800/50 p-6 backdrop-blur-sm">
          <h2 className="text-base font-semibold text-white">Details</h2>

          <div className="mt-5 flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="rounded-lg border border-white/10 bg-gray-900/60 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Role
                </label>
                <input
                  type="text"
                  required
                  value={form.role}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, role: e.target.value }))
                  }
                  placeholder="e.g. Senior Pilot & Safety Officer"
                  className="rounded-lg border border-white/10 bg-gray-900/60 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                Bio{" "}
                <span className="normal-case font-normal text-gray-500">
                  (optional)
                </span>
              </label>
              <textarea
                rows={3}
                value={form.bio}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, bio: e.target.value }))
                }
                className="resize-none rounded-lg border border-white/10 bg-gray-900/60 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Facebook URL{" "}
                  <span className="normal-case font-normal text-gray-500">
                    (optional)
                  </span>
                </label>
                <input
                  type="text"
                  value={form.facebook}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, facebook: e.target.value }))
                  }
                  placeholder="https://facebook.com/..."
                  className="rounded-lg border border-white/10 bg-gray-900/60 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Instagram URL{" "}
                  <span className="normal-case font-normal text-gray-500">
                    (optional)
                  </span>
                </label>
                <input
                  type="text"
                  value={form.instagram}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, instagram: e.target.value }))
                  }
                  placeholder="https://instagram.com/..."
                  className="rounded-lg border border-white/10 bg-gray-900/60 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center rounded-md bg-sky-500 px-6 py-3 text-sm font-semibold uppercase tracking-[2px] text-white shadow-lg shadow-sky-500/30 transition-all duration-300 hover:bg-sky-600 hover:shadow-xl hover:shadow-sky-500/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : isEditing ? "Save Changes" : "Add Member"}
          </button>
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
