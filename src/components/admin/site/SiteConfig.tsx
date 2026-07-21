"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { SiteConfig } from "@/lib/site-config";
import {
  FiTag,
  FiImage,
  FiPhone,
  FiShare2,
  FiMapPin,
  FiSave,
} from "react-icons/fi";
import { useToast } from "@/providers/ToastProvider";

interface FieldDef {
  key: keyof SiteConfig;
  label: string;
  type?: "text" | "email" | "tel" | "number" | "textarea";
  placeholder?: string;
}

interface SectionDef {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  fields: FieldDef[];
}

const sections: SectionDef[] = [
  {
    title: "Branding",
    description: "Shown in the site header.",
    icon: FiTag,
    fields: [
      { key: "siteName", label: "Site Name" },
      { key: "tagline", label: "Tagline" },
    ],
  },
  {
    title: "Hero Section",
    description: "The main banner on your homepage.",
    icon: FiImage,
    fields: [
      { key: "heroEyebrow", label: "Eyebrow Text" },
      { key: "heroTitleLine1", label: "Heading — Line 1" },
      { key: "heroTitleLine2", label: "Heading — Line 2" },
      { key: "heroDescription", label: "Description", type: "textarea" },
    ],
  },
  {
    title: "Contact Information",
    description: "Displayed on your Contact page.",
    icon: FiPhone,
    fields: [
      { key: "contactPhone", label: "Phone", type: "tel" },
      { key: "contactEmail", label: "Email", type: "email" },
      { key: "contactAddress", label: "Address", type: "textarea" },
    ],
  },
  {
    title: "Social Media",
    description: "Full URLs, including https://",
    icon: FiShare2,
    fields: [
      { key: "socialFacebook", label: "Facebook URL" },
      { key: "socialInstagram", label: "Instagram URL" },
    ],
  },
  {
    title: "Map Location",
    description: "Coordinates used by the interactive map on Contact.",
    icon: FiMapPin,
    fields: [
      { key: "mapLat", label: "Latitude", type: "number" },
      { key: "mapLng", label: "Longitude", type: "number" },
    ],
  },
];

type SaveStatus = "idle" | "saving";

export default function SiteConfig({
  initialConfig,
}: {
  initialConfig: SiteConfig;
}) {
  const [form, setForm] = useState<SiteConfig>(initialConfig);
  const [status, setStatus] = useState<SaveStatus>("idle");
  const { showSuccess, showError } = useToast();

  const handleChange = (
    key: keyof SiteConfig,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const raw = e.target.value;
    setForm((prev) => ({ ...prev, [key]: raw }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("saving");

    try {
      const payload = {
        ...form,
        mapLat: Number(form.mapLat),
        mapLng: Number(form.mapLng),
      };

      const res = await fetch("/api/admin/site-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        showError(
          data.error || "Something went wrong. Please try again.",
          "Your changes could not be saved",
        );
        setStatus("idle");
        return;
      }

      const updated: SiteConfig = await res.json();
      setForm(updated);
      showSuccess(
        "Site configuration saved successfully!",
        "Your changes are now live on the website",
      );
      setStatus("idle");
    } catch {
      showError(
        "Could not reach the server. Please try again.",
        "Please check your internet connection",
      );
      setStatus("idle");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Grid container for sections - 2 columns on large screens */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {sections.map((section) => {
          const SectionIcon = section.icon;

          return (
            <div
              key={section.title}
              className="rounded-xl border border-white/10 bg-gray-800/50 p-6 backdrop-blur-sm transition-all hover:border-white/20"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
                  <SectionIcon className="h-4 w-4" />
                </span>
                <div>
                  <h2 className="text-base font-semibold text-white">
                    {section.title}
                  </h2>
                  <p className="text-xs text-gray-400">{section.description}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-4 border-t border-white/5 pt-5">
                {section.fields.map((field) => {
                  const value = form[field.key];

                  return (
                    <div key={field.key} className="flex flex-col gap-1.5">
                      <label
                        htmlFor={field.key}
                        className="text-xs font-bold uppercase tracking-wide text-gray-400"
                      >
                        {field.label}
                      </label>

                      {field.type === "textarea" ? (
                        <textarea
                          id={field.key}
                          rows={3}
                          value={value as string}
                          onChange={(e) => handleChange(field.key, e)}
                          className="resize-none rounded-lg border border-white/10 bg-gray-900/60 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        />
                      ) : (
                        <input
                          id={field.key}
                          type={
                            field.type === "number"
                              ? "number"
                              : field.type || "text"
                          }
                          step={field.type === "number" ? "any" : undefined}
                          value={value as string | number}
                          onChange={(e) => handleChange(field.key, e)}
                          className="rounded-lg border border-white/10 bg-gray-900/60 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 transition focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Footer with Save Button - Fixed at bottom */}
      <div className="sticky bottom-0 z-10 px-6 py-4 bg-gray-900/95 backdrop-blur-sm border-t border-white/10 mt-6 rounded-xl">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span className="hidden sm:inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Auto-save disabled
            </span>
            <span className="text-gray-600 hidden sm:inline">|</span>
            <span>All changes applied immediately</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="reset"
              onClick={() => setForm(initialConfig)}
              className="px-6 py-2.5 text-sm font-medium text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={status === "saving"}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-lg border-2 border-sky-500 bg-transparent hover:bg-sky-500/10 px-6 py-2.5 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent min-w-35"
            >
              {status === "saving" ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
