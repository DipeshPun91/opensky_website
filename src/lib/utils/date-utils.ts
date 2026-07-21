// lib/utils/date-utils.ts

/**
 * Format a date as a relative time string (e.g., "2h ago", "3d ago")
 */
export function formatRelativeDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return dateObj.toLocaleDateString();
}

/**
 * Get the last updated/created date from an array of items
 */
export function getLastDate<
  T extends { updatedAt?: string | Date; createdAt?: string | Date },
>(items: T[]): string {
  if (items.length === 0) return "—";

  const dates = items.map(
    (item) => new Date(item.updatedAt || item.createdAt || Date.now()),
  );
  const latest = new Date(Math.max(...dates.map((d) => d.getTime())));
  return formatRelativeDate(latest);
}

/**
 * Alias for getLastDate - more specific naming for uploads
 */
export function getLastUpload<T extends { createdAt?: string | Date }>(
  items: T[],
): string {
  if (items.length === 0) return "—";

  const dates = items.map((item) => new Date(item.createdAt || Date.now()));
  const latest = new Date(Math.max(...dates.map((d) => d.getTime())));
  return formatRelativeDate(latest);
}

/**
 * Alias for getLastDate - more specific naming for updates
 */
export function getLastUpdated<
  T extends { updatedAt?: string | Date; createdAt?: string | Date },
>(items: T[]): string {
  return getLastDate(items);
}
