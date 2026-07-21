"use client";

import { useMemo, useState } from "react";
import {
  FiMail,
  FiPhone,
  FiCalendar,
  FiUsers,
  FiTrash2,
  FiMessageSquare,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import type { Booking, BookingStatus } from "@/lib/bookings";

type TabValue = BookingStatus | "all";

interface StatusTab {
  label: string;
  value: TabValue;
  icon: React.ComponentType<{ className?: string }> | null;
}

const STATUS_TABS: StatusTab[] = [
  { label: "All", value: "all", icon: null },
  { label: "Pending", value: "pending", icon: FiClock },
  { label: "Confirmed", value: "confirmed", icon: FiCheckCircle },
  { label: "Cancelled", value: "cancelled", icon: FiXCircle },
];

const STATUS_ICONS: Record<
  BookingStatus,
  React.ComponentType<{ className?: string }>
> = {
  pending: FiClock,
  confirmed: FiCheckCircle,
  cancelled: FiXCircle,
};

interface StatusColors {
  bg: string;
  border: string;
  text: string;
  icon: string;
}

// The SINGLE source of truth for status colors — every static Tailwind
// class needed for every status is written out literally here. This is
// what makes them actually work: Tailwind's compiler scans source files
// for literal class strings at build time, so `border-amber-500/50`
// written out like this gets generated, whereas building the same
// string at runtime via `border-${status}-500/50` does NOT — Tailwind
// has no way to know at build time what `status` will be, so nothing
// gets generated for it and the class silently does nothing.
const STATUS_COLORS: Record<BookingStatus, StatusColors> = {
  pending: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/50",
    text: "text-amber-400",
    icon: "text-amber-400",
  },
  confirmed: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/50",
    text: "text-emerald-400",
    icon: "text-emerald-400",
  },
  cancelled: {
    bg: "bg-rose-500/10",
    border: "border-rose-500/50",
    text: "text-rose-400",
    icon: "text-rose-400",
  },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function BookingsTable({
  initialBookings,
}: {
  initialBookings: Booking[];
}) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<BookingStatus, number> = {
      pending: 0,
      confirmed: 0,
      cancelled: 0,
    };
    for (const b of bookings) c[b.status]++;
    return c;
  }, [bookings]);

  const visibleBookings = useMemo(() => {
    if (activeTab === "all") return bookings;
    return bookings.filter((b) => b.status === activeTab);
  }, [bookings, activeTab]);

  const setBusy = (id: string, busy: boolean): void => {
    setPendingIds((prev) => {
      const next = new Set(prev);
      if (busy) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const handleStatusChange = async (
    id: string,
    status: BookingStatus,
  ): Promise<void> => {
    setErrorMessage(null);
    setBusy(id, true);

    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Could not update that booking.");
        return;
      }

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? (data as Booking) : b)),
      );
    } catch {
      setErrorMessage("Could not reach the server. Please try again.");
    } finally {
      setBusy(id, false);
    }
  };

  const handleDelete = async (id: string, name: string): Promise<void> => {
    const confirmed = window.confirm(
      `Delete the booking request from "${name}"? This can't be undone.`,
    );
    if (!confirmed) return;

    setErrorMessage(null);
    setBusy(id, true);

    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || "Could not delete that booking.");
        setBusy(id, false);
        return;
      }

      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch {
      setErrorMessage("Could not reach the server. Please try again.");
      setBusy(id, false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {errorMessage && (
        <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
          {errorMessage}
        </div>
      )}

      {/* Outline filter tabs */}
      <div className="flex flex-wrap gap-2">
        {STATUS_TABS.map((tab) => {
          const isActive = activeTab === tab.value;
          const count =
            tab.value === "all"
              ? bookings.length
              : counts[tab.value as BookingStatus];
          const Icon = tab.icon;

          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`inline-flex items-center gap-2 rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "border-sky-500 bg-sky-500/10 text-sky-400 shadow-lg shadow-sky-500/10"
                  : "border-white/10 bg-transparent text-gray-400 hover:border-white/30 hover:text-white"
              }`}
            >
              {Icon && (
                <Icon
                  className={`h-4 w-4 ${isActive ? "text-sky-400" : "text-gray-500"}`}
                />
              )}
              {tab.label}
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                  isActive
                    ? "bg-sky-500/20 text-sky-400"
                    : "bg-white/5 text-gray-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bookings grid */}
      {visibleBookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/5 p-16">
          <div className="mb-4 rounded-full bg-white/5 p-4">
            <FiCalendar className="h-8 w-8 text-gray-600" />
          </div>
          <p className="text-sm font-medium text-gray-400">
            {bookings.length === 0
              ? "No bookings yet"
              : "No bookings match this filter"}
          </p>
          <p className="mt-1 text-xs text-gray-600">
            {bookings.length === 0
              ? "Waiting for your first tandem flight request"
              : "Try selecting a different status tab"}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {visibleBookings.map((booking) => {
            const isBusy = pendingIds.has(booking.id);
            const isExpanded = expandedId === booking.id;
            const statusColor = STATUS_COLORS[booking.status];
            const StatusIcon = STATUS_ICONS[booking.status];
            const showReadMore =
              booking.message !== undefined && booking.message.length > 100;

            return (
              <div
                key={booking.id}
                className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                  isExpanded
                    ? "border-sky-500/50 bg-sky-500/5"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="p-5">
                  {/* Header with avatar initial */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/15 text-sm font-bold text-sky-400">
                        {booking.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white">
                          {booking.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{formatDate(booking.createdAt)}</span>
                          <span className="h-1 w-1 rounded-full bg-gray-600" />
                          <span>{formatTime(booking.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-2 rounded-full border-2 px-3 py-1.5 ${statusColor.border} ${statusColor.bg}`}
                    >
                      <StatusIcon className={`h-4 w-4 ${statusColor.icon}`} />
                      <span
                        className={`text-xs font-medium uppercase tracking-wide ${statusColor.text}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  {/* Contact & booking details */}
                  <div className="mt-4 grid grid-cols-1 gap-3 rounded-lg bg-black/20 p-4 sm:grid-cols-2">
                    <a
                      href={`mailto:${booking.email}`}
                      className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-sky-400"
                    >
                      <FiMail className="h-4 w-4 shrink-0 text-gray-500" />
                      <span className="truncate">{booking.email}</span>
                    </a>
                    <a
                      href={`tel:${booking.phone}`}
                      className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-sky-400"
                    >
                      <FiPhone className="h-4 w-4 shrink-0 text-gray-500" />
                      {booking.phone}
                    </a>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <FiCalendar className="h-4 w-4 shrink-0 text-gray-500" />
                      <span className="text-white/90">{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <FiUsers className="h-4 w-4 shrink-0 text-gray-500" />
                      <span className="text-white/90">{booking.people}</span>
                    </div>
                  </div>

                  {/* Message */}
                  {booking.message && (
                    <div className="mt-3 flex items-start gap-2 rounded-lg bg-black/20 p-3 text-sm text-gray-400">
                      <FiMessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" />
                      <p className={isExpanded ? "" : "line-clamp-2"}>
                        {booking.message}
                      </p>
                      {showReadMore && (
                        <button
                          onClick={() =>
                            setExpandedId(isExpanded ? null : booking.id)
                          }
                          className="ml-auto flex shrink-0 items-center gap-1 text-xs text-sky-400 hover:text-sky-300"
                        >
                          {isExpanded ? (
                            <>
                              <FiChevronUp className="h-3 w-3" />
                              Less
                            </>
                          ) : (
                            <>
                              <FiChevronDown className="h-3 w-3" />
                              More
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Status change + delete */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/5 pt-4">
                    <span className="mr-1 text-xs font-medium text-gray-500">
                      Status:
                    </span>

                    {(
                      ["pending", "confirmed", "cancelled"] as BookingStatus[]
                    ).map((status) => {
                      const isCurrentStatus = booking.status === status;
                      const colors = STATUS_COLORS[status];
                      const Icon = STATUS_ICONS[status];

                      return (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(booking.id, status)}
                          disabled={isBusy || isCurrentStatus}
                          className={`inline-flex items-center gap-1.5 rounded-lg border-2 px-3 py-1.5 text-xs font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
                            isCurrentStatus
                              ? `${colors.border} ${colors.bg} ${colors.text}`
                              : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {isCurrentStatus ? (
                            <span className="font-bold">✓ {status}</span>
                          ) : (
                            status
                          )}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => handleDelete(booking.id, booking.name)}
                      disabled={isBusy}
                      className="ml-auto inline-flex items-center gap-2 rounded-lg border-2 border-rose-500/20 px-4 py-1.5 text-xs font-medium text-rose-400 transition hover:border-rose-500/40 hover:bg-rose-500/10 disabled:opacity-60"
                    >
                      <FiTrash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </div>

                {/* Loading overlay */}
                {isBusy && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-sky-500 border-t-transparent" />
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
