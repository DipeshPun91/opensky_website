import Link from "next/link";
import {
  FiPlus,
  FiFolder,
  FiClock,
  FiHardDrive,
  FiImage,
} from "react-icons/fi";
import { getAllMedia, MediaItem } from "@/lib/media";
import MediaGrid from "@/components/admin/MediaGrid";

export default async function ManageFilesPage() {
  const media = await getAllMedia();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-4 w-0.5 bg-sky-400" />
            <p className="text-xs font-medium uppercase tracking-wider text-sky-400">
              Admin Pannel
            </p>
          </div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Media Library
          </h1>
          <p className="text-sm text-gray-400">
            {media.length} files in your library
          </p>
        </div>

        <Link
          href="/admin/dashboard/files/add"
          className="inline-flex items-center gap-2 rounded-lg border border-sky-500 bg-transparent px-4 py-2 text-sm font-medium text-sky-400 transition hover:bg-sky-500/10 hover:text-sky-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <FiPlus className="h-4 w-4" />
          Upload
        </Link>
      </div>

      {/* Stats Bar - Minimal */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Files" value={media.length} icon={FiImage} />
        <StatCard
          label="Size"
          value={formatTotalSize(media)}
          icon={FiHardDrive}
        />
        <StatCard label="Folders" value={countFolders(media)} icon={FiFolder} />
        <StatCard
          label="Updated"
          value={getLastUpdated(media)}
          icon={FiClock}
        />
      </div>

      <MediaGrid initialMedia={media} />
    </div>
  );
}

// Helper components and functions
interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
}

function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/5 px-4 py-3">
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-gray-400" />
        <span className="text-sm font-medium text-white">{value}</span>
      </div>
      <p className="mt-0.5 text-xs text-gray-500">{label}</p>
    </div>
  );
}

function formatTotalSize(media: MediaItem[]): string {
  const total = media.reduce((sum, item) => sum + item.bytes, 0);
  if (total < 1024 * 1024) return `${(total / 1024).toFixed(0)} KB`;
  return `${(total / (1024 * 1024)).toFixed(1)} MB`;
}

function countFolders(media: MediaItem[]): number {
  return new Set(media.map((item) => item.folder)).size;
}

function getLastUpdated(media: MediaItem[]): string {
  if (media.length === 0) return "—";
  const dates = media.map((item) => new Date(item.createdAt));
  const latest = new Date(Math.max(...dates.map((d) => d.getTime())));
  const now = new Date();
  const diffMs = now.getTime() - latest.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Now";
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return latest.toLocaleDateString();
}
