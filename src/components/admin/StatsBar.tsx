// components/admin/StatsBar.tsx
import { ReactNode } from "react";

interface StatItem {
  label: string;
  value: string | number;
  icon: ReactNode;
}

interface StatsBarProps {
  stats: StatItem[];
  className?: string;
}

export default function StatsBar({ stats, className = "" }: StatsBarProps) {
  return (
    <div className={`mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4 ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="group rounded-xl border border-white/10 bg-white/5 px-5 py-5 transition-all duration-200 hover:border-white/20 hover:bg-white/10"
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-white">{stat.value}</p>
              <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                {stat.label}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
