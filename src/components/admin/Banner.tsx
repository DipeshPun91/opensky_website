// components/admin/Banner.tsx
import { ReactNode } from "react";
import Link from "next/link";

interface BannerProps {
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
    icon?: ReactNode;
  };
  badge?: string;
}

export default function Banner({
  title,
  description,
  action,
  badge = "Admin Panel",
}: BannerProps) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="h-4 w-0.5 bg-sky-400" />
          <p className="text-xs font-medium uppercase tracking-wider text-sky-400">
            {badge}
          </p>
        </div>
        <h1 className="mb-1 text-2xl font-black uppercase text-white sm:text-3xl">
          {title}
        </h1>
        <p className="text-sm text-gray-400">{description}</p>
      </div>

      {action && (
        <Link
          href={action.href}
          className="inline-flex items-center gap-2 rounded-xl border-2 border-sky-500/50 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-sky-400 transition-all duration-300 hover:border-sky-500 hover:bg-sky-500/10 hover:text-sky-300 hover:scale-105"
        >
          {action.icon}
          {action.label}
        </Link>
      )}
    </div>
  );
}
