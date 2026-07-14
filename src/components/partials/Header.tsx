"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiChevronDown, FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";

const menu = [
  { label: "Home", href: "/" },
  { label: "Blogs", href: "/blogs" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-linear-to-b from-black/60 to-transparent">
      <div className="flex items-center justify-between px-6 sm:px-10 lg:px-16 py-5">
        {/* Logo with paragliding text */}
        <Link href="/" className="flex flex-col items-start">
          <div className="text-2xl sm:text-3xl font-black text-white">
            <span className="text-sky-400">OPEN</span>
            <span>SKY</span>
          </div>
          <span className="text-[10px] sm:text-xs text-white/70 uppercase tracking-[0.15em] font-light -mt-0.5">
            Paragliding Adventures
          </span>
        </Link>

        {/* Menu — desktop */}
        <nav className="hidden lg:flex gap-10 uppercase text-sm font-semibold tracking-wider text-white">
          {menu.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative transition duration-300 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-sky-400 after:transition-all after:duration-300 hover:text-sky-400 hover:after:w-full ${
                isActive(item.href) ? "text-sky-400 after:w-full" : "after:w-0"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button className="hidden sm:flex items-center gap-2 text-white hover:text-sky-400 transition text-sm">
            Nepal
            <FiChevronDown size={16} />
          </button>

          <Link
            href="/contact"
            className="group hidden sm:flex rounded-md px-5 py-2.5 font-semibold text-white items-center gap-2 bg-sky-500 hover:bg-sky-600 hover:scale-105 transition-all duration-300 text-sm whitespace-nowrap shadow-lg shadow-sky-500/30"
          >
            BOOK FLIGHT
            <FiArrowUpRight
              size={16}
              className="group-hover:rotate-45 transition duration-300"
            />
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden text-white p-1 hover:text-sky-400 transition"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav className="lg:hidden bg-black/95 backdrop-blur-md px-6 sm:px-10 pb-8 pt-2 border-t border-white/5">
          <ul className="flex flex-col gap-1 uppercase text-sm font-semibold tracking-wider text-white">
            {menu.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block py-3 border-b border-white/10 hover:text-sky-400 hover:pl-2 transition-all duration-300 ${
                    isActive(item.href) ? "text-sky-400 pl-2" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-4">
            <button className="flex items-center gap-2 text-white text-sm hover:text-sky-400 transition">
              Nepal
              <FiChevronDown size={16} />
            </button>
          </div>

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="group mt-6 w-full rounded-md px-6 py-3.5 font-semibold text-white flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-sky-500/30 text-sm"
          >
            BOOK FLIGHT
            <FiArrowUpRight
              size={16}
              className="group-hover:rotate-45 transition duration-300"
            />
          </Link>
        </nav>
      )}
    </header>
  );
}
