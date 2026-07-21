"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiEdit2,
  FiTrash2,
  FiArrowUp,
  FiArrowDown,
  FiUser,
} from "react-icons/fi";
import type { Member } from "@/lib/members";

export default function MembersTable({
  initialMembers,
}: {
  initialMembers: Member[];
}) {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [busyIds, setBusyIds] = useState<Set<string>>(new Set());

  const setBusy = (id: string, busy: boolean) => {
    setBusyIds((prev) => {
      const next = new Set(prev);
      if (busy) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const handleDelete = async (member: Member) => {
    const confirmed = window.confirm(
      `Remove "${member.name}" from the team? This can't be undone.`,
    );
    if (!confirmed) return;

    setBusy(member.id, true);
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/admin/members/${member.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || "Could not remove that member.");
        return;
      }

      setMembers((prev) => prev.filter((m) => m.id !== member.id));
    } catch {
      setErrorMessage("Could not reach the server. Please try again.");
    } finally {
      setBusy(member.id, false);
    }
  };

  const handleMove = async (member: Member, direction: "up" | "down") => {
    setBusy(member.id, true);
    setErrorMessage(null);

    const index = members.findIndex((m) => m.id === member.id);
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= members.length) {
      setBusy(member.id, false);
      return;
    }

    const reordered = [...members];
    [reordered[index], reordered[swapIndex]] = [
      reordered[swapIndex],
      reordered[index],
    ];
    setMembers(reordered);

    try {
      const res = await fetch(`/api/admin/members/${member.id}/move`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ direction }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || "Could not reorder.");
        setMembers(members);
      }
    } catch {
      setErrorMessage("Could not reach the server. Please try again.");
      setMembers(members);
    } finally {
      setBusy(member.id, false);
    }
  };

  return (
    <div className="space-y-4">
      {errorMessage && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400 backdrop-blur-sm">
          <div className="h-8 w-0.5 bg-red-500/30" />
          {errorMessage}
        </div>
      )}

      {members.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/5 p-16 text-center transition-all hover:border-white/20">
          <div className="mb-4 rounded-full bg-sky-500/10 p-4">
            <FiUser className="h-8 w-8 text-sky-400/60" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">
            No team members yet
          </h3>
          <p className="text-sm text-gray-400">
            Add your first team member to start building your About page.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {members.map((member, index) => {
            const isBusy = busyIds.has(member.id);
            const isFirst = index === 0;
            const isLast = index === members.length - 1;

            return (
              <div
                key={member.id}
                className="group relative rounded-2xl border border-white/5 bg-white/5 p-4 transition-all duration-300 hover:border-white/10 hover:bg-white/10 hover:shadow-xl"
              >
                <div className="flex items-start gap-4">
                  {/* Order controls */}
                  <div className="flex shrink-0 flex-col items-center gap-1">
                    <button
                      onClick={() => handleMove(member, "up")}
                      disabled={isFirst || isBusy}
                      aria-label="Move up"
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 transition-all hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <FiArrowUp className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-xs font-mono text-gray-500">
                      {index + 1}
                    </span>
                    <button
                      onClick={() => handleMove(member, "down")}
                      disabled={isLast || isBusy}
                      aria-label="Move down"
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-500 transition-all hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <FiArrowDown className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Avatar */}
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-white/10 bg-gray-800">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-gray-500">
                        <FiUser className="h-6 w-6" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-white">
                      {member.name}
                    </h3>
                    <p className="text-sm text-sky-400">{member.role}</p>
                    {member.bio && (
                      <p className="mt-1 line-clamp-1 text-sm text-gray-400">
                        {member.bio}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-1">
                    <Link
                      href={`/admin/dashboard/members/${member.id}/edit`}
                      aria-label="Edit member"
                      className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition-all hover:bg-white/5 hover:text-sky-400"
                    >
                      <FiEdit2 className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(member)}
                      disabled={isBusy}
                      aria-label="Remove member"
                      className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition-all hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
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
    </div>
  );
}
