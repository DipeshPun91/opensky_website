import MediaManager from "@/components/admin/MediaManager";

export default function AddFilePage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-0.5 bg-sky-400" />
          <p className="text-xs font-medium uppercase tracking-wider text-sky-400">
            Admin
          </p>
        </div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Upload File
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Add a new image to your media library
        </p>
      </div>

      <MediaManager />
    </div>
  );
}
