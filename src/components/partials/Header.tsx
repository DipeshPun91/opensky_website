"use client";

import { useState } from "react";
import Link from "next/link";
import { FiChevronDown, FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";

const menu = [
  "Home",
  "About Us",
  "Tandem Flights",
  "FAQ",
  "Gallery",
  "Contact Us",
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-linear-to-b from-black/40 to-transparent">
      <div className="flex items-center justify-between px-6 sm:px-10 lg:px-16 py-5">
        {/* Logo */}
        <Link href="/" className="text-2xl sm:text-3xl font-black text-white">
          <span className="text-orange-500">OPEN</span>
          <span>SKY</span>
        </Link>

        {/* Menu — desktop */}
        <nav className="hidden lg:flex gap-10 uppercase text-sm font-semibold tracking-wider text-white">
          {menu.map((item) => (
            <Link
              href="#"
              key={item}
              className="hover:text-orange-500 transition"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          <button className="hidden sm:flex items-center gap-2 text-white">
            🇬🇧
            <FiChevronDown />
          </button>

          <button className="hidden sm:flex rounded-full bg-orange-500 px-6 lg:px-8 py-3 lg:py-4 font-semibold text-white items-center gap-2 hover:bg-orange-600 transition text-sm lg:text-base whitespace-nowrap">
            BOOK FLIGHT
            <FiArrowUpRight />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden text-white p-1"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <nav className="lg:hidden bg-black/90 backdrop-blur-sm px-6 sm:px-10 pb-8 pt-2">
          <ul className="flex flex-col gap-1 uppercase text-sm font-semibold tracking-wider text-white">
            {menu.map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  onClick={() => setOpen(false)}
                  className="block py-3 border-b border-white/10 hover:text-orange-500 transition"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-4">
            <button className="flex items-center gap-2 text-white text-sm">
              🇬🇧 English
              <FiChevronDown />
            </button>
          </div>

          <button className="mt-6 w-full rounded-full bg-orange-500 px-8 py-4 font-semibold text-white flex items-center justify-center gap-2 hover:bg-orange-600 transition">
            BOOK FLIGHT
            <FiArrowUpRight />
          </button>
        </nav>
      )}
    </header>
  );
}
