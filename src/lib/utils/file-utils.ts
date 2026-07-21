// lib/utils/file-utils.ts

/**
 * Format bytes to human readable file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

/**
 * Get total size from an array of media items
 */
export function getTotalSize<T extends { bytes: number }>(items: T[]): string {
  const total = items.reduce((sum, item) => sum + item.bytes, 0);
  return formatFileSize(total);
}

/**
 * Get total bytes from an array of media items
 */
export function getTotalBytes<T extends { bytes: number }>(items: T[]): number {
  return items.reduce((sum, item) => sum + item.bytes, 0);
}

/**
 * Count unique folders from media items
 */
export function countFolders<T extends { folder: string }>(items: T[]): number {
  return new Set(items.map((item) => item.folder)).size;
}

/**
 * Count unique categories from items
 */
export function countCategories<T extends { category?: string }>(
  items: T[],
): number {
  return new Set(items.map((item) => item.category).filter(Boolean)).size;
}

/**
 * Count items by status
 */
export function countByStatus<T extends { status: string }>(
  items: T[],
  status: string,
): number {
  return items.filter((item) => item.status === status).length;
}
