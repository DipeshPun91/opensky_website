"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ComponentType } from "react";
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
  FiChevronRight as FiExpandIcon,
} from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

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
        icon: MdDashboard,
        enabled: true,
      },
    ],
  },
  {
    title: "File Manager",
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
    title: "Contacts",
    icon: FiMail,
    items: [
      {
        label: "Bookings",
        href: "/admin/dashboard/bookings",
        icon: FiMail,
        enabled: false,
      },
    ],
  },
  {
    title: "General",
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
        label: "Members",
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
    title: "Settings",
    icon: FiSettings,
    items: [
      {
        label: "Site Configuration",
        href: "/admin/dashboard/settings",
        icon: FiSettings,
        enabled: true,
      },
    ],
  },
  {
    title: "Help",
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
    "General",
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
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/10 bg-gray-900 text-white shadow-2xl transition-all duration-300 lg:shadow-none ${
          isCollapsed ? "w-20" : "w-64"
        } ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo + controls */}
        <div
          className={`flex shrink-0 items-center border-b border-white/10 py-5 ${
            isCollapsed ? "justify-center px-2" : "px-4"
          }`}
        >
          {!isCollapsed && (
            <>
              <div className="flex-1 overflow-hidden text-lg font-black uppercase leading-tight">
                <span className="text-sky-400">OPEN</span>SKY
                <span className="block text-[10px] font-normal tracking-widest text-white/50">
                  Admin Panel
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  onClick={onToggleCollapse}
                  className="hidden rounded-lg p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white lg:block"
                  aria-label="Collapse sidebar"
                  title="Collapse sidebar"
                >
                  <FiChevronLeft size={18} />
                </button>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white lg:hidden"
                  aria-label="Close menu"
                >
                  <FiX size={18} />
                </button>
              </div>
            </>
          )}

          {isCollapsed && (
            <div className="flex flex-col items-center gap-2">
              <div className="text-center text-lg font-black uppercase leading-tight">
                <span className="text-sky-400">O</span>S
              </div>
              <button
                onClick={onToggleCollapse}
                className="rounded-lg p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white"
                aria-label="Expand sidebar"
                title="Expand sidebar"
              >
                <FiExpandIcon size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="admin-sidebar-scroll flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
          {navSections.map((section) => {
            const isExpanded = isSectionExpanded(section.title);
            const SectionIcon = section.icon;

            return (
              <div key={section.title} className="mb-2">
                <button
                  onClick={() => toggleSection(section.title)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wider text-white/40 transition hover:bg-white/5 hover:text-white/60 ${
                    isCollapsed ? "justify-center" : ""
                  }`}
                  title={isCollapsed ? section.title : undefined}
                >
                  {SectionIcon && <SectionIcon className="h-4 w-4 shrink-0" />}
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 truncate text-left">
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
                            <span className="flex min-w-0 items-center gap-3 ml-1">
                              <Icon className="h-4 w-4 shrink-0" />
                              <span className="truncate">{item.label}</span>
                            </span>
                            <span className="shrink-0 rounded-full bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wide">
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
                              ? "bg-sky-500/15 text-white"
                              : "text-white/70 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {/* Left border indicator */}
                          <div
                            className={`absolute left-0 top-0 h-full w-1 bg-sky-400 rounded-r transition-all duration-200 ${
                              isActive
                                ? "opacity-100 scale-y-100"
                                : "opacity-0 group-hover:opacity-100 group-hover:scale-y-100 scale-y-80"
                            }`}
                          ></div>

                          <Icon
                            className={`ml-1 h-4 w-4 shrink-0 transition-colors duration-200 ${
                              isActive
                                ? "text-sky-400"
                                : "text-white/70 group-hover:text-white"
                            }`}
                          />

                          <span className="truncate">{item.label}</span>

                          {/* Arrow indicator for active state */}
                          {isActive && (
                            <svg
                              className="ml-auto h-3 w-3 text-sky-400"
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
          className={`shrink-0 border-t border-white/10 py-4 ${
            isCollapsed ? "px-2 text-center" : "px-6"
          }`}
        >
          <Link
            href="/"
            className="group flex items-center justify-center gap-2 text-xs text-white/40 transition hover:text-white/70"
            title="Back to website"
          >
            <FiHome className="h-4 w-4 transition group-hover:text-white/70" />
            {!isCollapsed && <span>Back to website</span>}
          </Link>
        </div>
      </aside>

      <style jsx global>{`
        .admin-sidebar-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.15) transparent;
        }
        .admin-sidebar-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .admin-sidebar-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.15);
          border-radius: 9999px;
        }
        .admin-sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </>
  );
}
