"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import {
  FiHome,
  FiPlus,
  FiFolder,
  FiUsers,
  FiMail,
  FiBookOpen,
  FiImage,
  FiLayout,
  FiMenu,
  FiGrid,
  FiSettings,
  FiHelpCircle,
  FiChevronDown,
  FiChevronRight,
  FiX,
  FiChevronLeft,
  FiChevronRight as FiChevronRightIcon,
} from "react-icons/fi";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  enabled: boolean;
}

interface NavSection {
  title: string;
  icon?: ComponentType<{ className?: string }>;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "Dashboard",
    items: [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: FiHome,
        enabled: true,
      },
    ],
  },
  {
    title: "FILE MANAGER",
    icon: FiFolder,
    items: [
      {
        label: "Add File",
        href: "/admin/dashboard/files/add",
        icon: FiPlus,
        enabled: false,
      },
      {
        label: "Manage Files",
        href: "/admin/dashboard/files",
        icon: FiFolder,
        enabled: false,
      },
    ],
  },
  {
    title: "CONTACTS",
    icon: FiMail,
    items: [
      {
        label: "Booking",
        href: "/admin/dashboard/bookings",
        icon: FiMail,
        enabled: false,
      },
    ],
  },
  {
    title: "GENERAL",
    icon: FiLayout,
    items: [
      {
        label: "Blogs",
        href: "/admin/dashboard/blogs",
        icon: FiBookOpen,
        enabled: false,
      },
      {
        label: "Gallery",
        href: "/admin/dashboard/gallery",
        icon: FiImage,
        enabled: false,
      },
      {
        label: "Member",
        href: "/admin/dashboard/members",
        icon: FiUsers,
        enabled: false,
      },
      {
        label: "Pages",
        href: "/admin/dashboard/pages",
        icon: FiLayout,
        enabled: false,
      },
      {
        label: "Menus",
        href: "/admin/dashboard/menus",
        icon: FiMenu,
        enabled: false,
      },
      {
        label: "Sliders",
        href: "/admin/dashboard/sliders",
        icon: FiGrid,
        enabled: false,
      },
    ],
  },
  {
    title: "SETTINGS",
    icon: FiSettings,
    items: [
      {
        label: "Site Configurations",
        href: "/admin/dashboard/settings",
        icon: FiSettings,
        enabled: false,
      },
    ],
  },
  {
    title: "HELP",
    icon: FiHelpCircle,
    items: [
      {
        label: "User Guides",
        href: "/admin/dashboard/guides",
        icon: FiHelpCircle,
        enabled: false,
      },
    ],
  },
];

export default function Sidebar({
  open,
  onClose,
  isCollapsed,
  onToggleCollapse,
}: {
  open: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "Dashboard",
    "GENERAL",
  ]);

  const toggleSection = (title: string) => {
    if (isCollapsed) return;
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  const isSectionExpanded = (title: string) => expandedSections.includes(title);

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-gray-900 text-white transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        } ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo and Controls */}
        <div
          className={`flex items-center border-b border-r border-white/10 shrink-0 ${
            isCollapsed ? "px-2 py-5" : "px-4 py-5"
          }`}
        >
          {!isCollapsed ? (
            <>
              <div className="flex-1 text-lg font-black uppercase leading-tight overflow-hidden">
                <span className="text-sky-400">OPEN</span>SKY
                <span className="block text-[10px] font-normal tracking-widest text-white/50">
                  Admin Panel
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {/* Collapse button */}
                <button
                  onClick={onToggleCollapse}
                  className="rounded-lg p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white"
                  aria-label="Collapse sidebar"
                  title="Collapse sidebar"
                >
                  <FiChevronLeft size={18} />
                </button>
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white lg:hidden"
                  aria-label="Close menu"
                >
                  <FiX size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex w-full flex-col items-center">
              <div className="text-lg font-black uppercase leading-tight text-center">
                <span className="text-sky-400">O</span>S
                <span className="block text-[8px] font-normal tracking-widest text-white/50">
                  Admin
                </span>
              </div>
              {/* Expand button when collapsed */}
              <button
                onClick={onToggleCollapse}
                className="mt-2 rounded-lg p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white"
                aria-label="Expand sidebar"
                title="Expand sidebar"
              >
                <FiChevronRightIcon size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 border-r border-white/10 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500">
          {navSections.map((section) => {
            const isExpanded = isSectionExpanded(section.title);
            const SectionIcon = section.icon;

            return (
              <div key={section.title} className="mb-2">
                {/* Section Header - Always visible */}
                <button
                  onClick={() => toggleSection(section.title)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider text-white/40 hover:bg-white/5 hover:text-white/60 transition ${
                    isCollapsed ? "justify-center" : ""
                  }`}
                  title={isCollapsed ? section.title : undefined}
                >
                  {SectionIcon && <SectionIcon className="h-4 w-4 shrink-0" />}
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 text-left truncate">
                        {section.title}
                      </span>
                      {isExpanded ? (
                        <FiChevronDown size={14} className="shrink-0" />
                      ) : (
                        <FiChevronRight size={14} className="shrink-0" />
                      )}
                    </>
                  )}
                </button>

                {/* Section Items - Only show when expanded AND not collapsed */}
                {!isCollapsed && isExpanded && (
                  <div className="ml-2 mt-1 space-y-0.5 border-l border-white/10 pl-2">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href;
                      const Icon = item.icon;

                      if (!item.enabled) {
                        return (
                          <div
                            key={item.label}
                            title="Coming soon"
                            className="group relative flex cursor-not-allowed items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-white/30 hover:bg-white/5"
                          >
                            <div className="absolute left-0 top-0 h-full w-1 bg-sky-400 rounded-r opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-y-100 scale-y-80"></div>
                            <span className="flex items-center gap-3 min-w-0 ml-1">
                              <Icon className="h-4 w-4 shrink-0" />
                              <span className="truncate">{item.label}</span>
                            </span>
                            <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wide shrink-0">
                              Soon
                            </span>
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={onClose}
                          className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                            isActive
                              ? "bg-sky-500/20 text-white"
                              : "text-white/70 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {/* Left border indicator - like the example */}
                          <div
                            className={`absolute left-0 top-0 h-full w-1 bg-sky-400 rounded-r transition-all duration-200 ${
                              isActive
                                ? "opacity-100 scale-y-100"
                                : "opacity-0 group-hover:opacity-100 group-hover:scale-y-100 scale-y-80"
                            }`}
                          ></div>

                          <Icon
                            className={`h-4 w-4 shrink-0 ml-1 transition-colors duration-200 ${
                              isActive
                                ? "text-sky-400"
                                : "text-white/70 group-hover:text-white"
                            }`}
                          />
                          <span className="truncate">{item.label}</span>

                          {/* Arrow indicator for active state */}
                          {isActive && (
                            <svg
                              className="h-3 w-3 text-sky-400 ml-auto"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                clipRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                fillRule="evenodd"
                              />
                            </svg>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          className={`border-t border-r border-white/10 px-6 py-4 shrink-0 ${
            isCollapsed ? "text-center" : ""
          }`}
        >
          <Link
            href="/"
            className={`text-xs text-white/40 transition hover:text-white/70 ${
              isCollapsed ? "block" : ""
            }`}
            title={isCollapsed ? "Back to website" : undefined}
          >
            {isCollapsed ? "←" : "← Back to website"}
          </Link>
        </div>
      </aside>
    </>
  );
}
