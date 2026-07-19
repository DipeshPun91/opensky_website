"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiUploadCloud,
  FiCheckCircle,
  FiX,
  FiFolder,
  FiTag,
  FiChevronDown,
} from "react-icons/fi";
import type { MediaItem } from "@/lib/media";

const FOLDER_OPTIONS = ["general", "gallery", "team", "blog", "hero"];

export default function MediaManager() {
  const [label, setLabel] = useState("");
  const [folder, setFolder] = useState(FOLDER_OPTIONS[0]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [uploadedItem, setUploadedItem] = useState<MediaItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
    setErrorMessage(null);
    setUploadedItem(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
    if (file && !label) setLabel(file.name.replace(/\.[^/.]+$/, ""));
  };

  const resetForm = () => {
    setSelectedFile(null);
    setLabel("");
    setUploadedItem(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select an image first.");
      return;
    }

    if (!label.trim()) {
      setErrorMessage("Please enter a label for the image.");
      return;
    }

    setUploading(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("label", label.trim());
      formData.append("folder", folder);

      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Upload failed. Please try again.");
        return;
      }

      setUploadedItem(data as MediaItem);
    } catch {
      setErrorMessage("Could not reach the server. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Success State
  if (uploadedItem) {
    return (
      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20">
          <FiCheckCircle className="h-6 w-6 text-emerald-400" />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-white">
          Upload Complete!
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          &ldquo;{uploadedItem.label}&rdquo; added to{" "}
          <span className="text-white">{uploadedItem.folder}</span>
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center rounded-md bg-sky-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-sky-600"
          >
            Upload Another
          </button>
          <Link
            href="/admin/dashboard/files"
            className="inline-flex items-center rounded-md border border-sky-500 bg-transparent px-5 py-2 text-sm font-medium text-sky-400 transition hover:bg-sky-500/10 hover:text-sky-300"
          >
            Manage Files
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-white/5 bg-white/5 p-6">
      {errorMessage && (
        <div className="mb-5 rounded-md border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-sm text-red-400">
          {errorMessage}
        </div>
      )}

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Upload Area */}
        <div className="md:w-48">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-md border-2 border-dashed border-white/10 bg-black/30 transition hover:border-sky-500/50 hover:bg-black/50 md:w-48"
          >
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized
                sizes="(max-width: 768px) 100vw, 192px"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <FiUploadCloud className="h-8 w-8" />
                <span className="text-xs">Choose image</span>
                <span className="text-[10px] text-gray-600">
                  PNG, JPG, WebP
                </span>
              </div>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(e) => handleFileSelect(e.target.files?.[0] ?? null)}
            className="hidden"
          />
          {selectedFile && (
            <div className="mt-2 flex items-center justify-between rounded bg-black/30 px-3 py-1.5">
              <span className="truncate text-xs text-gray-400">
                {selectedFile.name}
              </span>
              <button
                onClick={() => handleFileSelect(null)}
                className="text-gray-500 hover:text-white"
              >
                <FiX className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-gray-400">
              <FiTag className="h-3.5 w-3.5" />
              Label
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Enter image label..."
              className="w-full rounded-md border border-white/5 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
              <FiFolder className="h-3.5 w-3.5" />
              Folder
            </label>
            <div className="relative">
              <select
                value={folder}
                onChange={(e) => setFolder(e.target.value)}
                className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2.5 pr-9 text-sm text-white transition focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 appearance-none"
              >
                {FOLDER_OPTIONS.map((f) => (
                  <option key={f} value={f} className="bg-gray-900">
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading || !selectedFile}
              className="inline-flex items-center rounded-md border border-sky-500 bg-transparent px-6 py-2 text-sm font-medium text-sky-400 transition hover:bg-sky-500/10 hover:text-sky-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-sky-400/30 border-t-sky-400" />
                  Uploading...
                </span>
              ) : (
                "Upload"
              )}
            </button>

            {selectedFile && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm text-gray-500 transition hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
