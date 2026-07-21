"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiEdit2, FiTrash2, FiArrowUp, FiArrowDown } from "react-icons/fi";
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
    <div className="flex flex-col gap-4">
      {errorMessage && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {errorMessage}
        </div>
      )}

      {members.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-gray-800/50 p-10 text-center">
          <p className="text-sm text-gray-500">No team members yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {members.map((member, index) => {
            const isBusy = busyIds.has(member.id);
            const isFirst = index === 0;
            const isLast = index === members.length - 1;

            return (
              <div
                key={member.id}
                className="flex flex-col gap-4 rounded-xl border border-white/10 bg-gray-800/50 p-4 backdrop-blur-sm sm:flex-row sm:items-center"
              >
                <div className="flex shrink-0 flex-row gap-1 sm:flex-col">
                  <button
                    onClick={() => handleMove(member, "up")}
                    disabled={isFirst || isBusy}
                    aria-label="Move up"
                    className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <FiArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleMove(member, "down")}
                    disabled={isLast || isBusy}
                    aria-label="Move down"
                    className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <FiArrowDown className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-semibold text-white">
                    {member.name}
                  </h3>
                  <p className="truncate text-sm text-sky-400">{member.role}</p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={`/admin/dashboard/members/${member.id}/edit`}
                    aria-label="Edit member"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-sky-400"
                  >
                    <FiEdit2 className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(member)}
                    disabled={isBusy}
                    aria-label="Remove member"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
                  >
                    <FiTrash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
