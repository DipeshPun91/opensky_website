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
              href="#"
              key={item}
              className="hover:text-sky-400 transition duration-300 relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-sky-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          <button className="hidden sm:flex items-center gap-2 text-white hover:text-sky-400 transition">
            🇬🇧
            <FiChevronDown />
          </button>

          <button className="hidden sm:flex rounded-md px-6 lg:px-8 py-3 lg:py-4 font-semibold text-white items-center gap-2 bg-sky-500 hover:bg-sky-600 hover:scale-105 transition-all duration-300 text-sm lg:text-base whitespace-nowrap shadow-lg shadow-sky-500/30">
            BOOK FLIGHT
            <FiArrowUpRight className="group-hover:rotate-45 transition" />
          </button>

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
              <li key={item}>
                <Link
                  href="#"
                  onClick={() => setOpen(false)}
                  className="block py-3 border-b border-white/10 hover:text-sky-400 hover:pl-2 transition-all duration-300"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-4">
            <button className="flex items-center gap-2 text-white text-sm hover:text-sky-400 transition">
              🇬🇧 English
              <FiChevronDown />
            </button>
          </div>

          <button className="mt-6 w-full rounded-md px-8 py-4 font-semibold text-white flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-sky-500/30">
            BOOK FLIGHT
            <FiArrowUpRight />
          </button>
        </nav>
      )}
    </header>
  );
}
