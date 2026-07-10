"use client";

import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";

const pages = ["Home", "About", "FAQ", "Gallery", "Contact"];
const flights = ["Basic Flight", "Standard Flight", "Panorama Flight"];

export default function Footer() {
  return (
    <footer className="relative w-full bg-gray-900">
      <div className="w-full px-6 sm:px-10 lg:px-16 py-20">
        {/* Logo Row */}
        <div className="flex items-center justify-between pb-10 mb-10 border-b border-gray-700/50">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white">
              <span className="text-sky-400">OPEN</span>
              <span>SKY</span>
            </div>
            <p className="text-sm text-gray-400 mt-1 tracking-wide">
              Paragliding Adventures
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-2xl text-gray-300">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-sky-400 transition hover:scale-110 duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-sky-400 transition hover:scale-110 duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/9779800000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-sky-400 transition hover:scale-110 duration-300"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left - Let's have fun section */}
          <div className="lg:col-span-5">
            <p className="uppercase text-sm tracking-wider text-gray-400">
              Let&apos;s have fun!
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-4 leading-tight text-white">
              YOUR OPEN SKY PARAGLIDING EXPERIENCE
            </h2>
          </div>

          {/* Pages Links */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-xl sm:text-2xl mb-6 sm:mb-8 text-white">
              Pages
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-gray-300">
              {pages.map((page) => (
                <li key={page}>
                  <a
                    href="#"
                    className="hover:text-sky-400 transition duration-300 relative after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-sky-400 after:transition-all after:duration-300 hover:after:w-full inline-block"
                  >
                    {page}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tandem Flights */}
          <div className="lg:col-span-4">
            <h3 className="font-bold text-xl sm:text-2xl mb-6 sm:mb-8 text-white">
              Tandem Flights
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-gray-300">
              {flights.map((flight) => (
                <li key={flight}>
                  <a
                    href="#"
                    className="hover:text-sky-400 transition duration-300 relative after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-sky-400 after:transition-all after:duration-300 hover:after:w-full inline-block"
                  >
                    {flight}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info Row */}
        <div className="mt-16 sm:mt-20 grid sm:grid-cols-3 gap-6 sm:gap-8 text-base sm:text-lg text-gray-300 border-t border-gray-700/50 pt-10">
          <a
            href="tel:+9779800000000"
            className="flex items-center gap-3 hover:text-sky-400 transition duration-300 group"
          >
            <FiPhone className="group-hover:scale-110 transition" />
            +977 980-000-0000
          </a>

          <a
            href="https://wa.me/9779800000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:text-sky-400 transition duration-300 group"
          >
            <FaWhatsapp className="group-hover:scale-110 transition" />
            WhatsApp
          </a>

          <a
            href="mailto:info@openskyparagliding.com"
            className="flex items-center gap-3 hover:text-sky-400 transition duration-300 group"
          >
            <FiMail className="group-hover:scale-110 transition" />
            info@openskyparagliding.com
          </a>
        </div>

        {/* Address */}
        <div className="mt-6 flex items-center gap-3 text-gray-300">
          <FiMapPin className="text-sky-400" />
          Open Sky, Sarangkot, Pokhara, Nepal
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-gray-700/50 pt-6 flex flex-col sm:flex-row gap-2 justify-between text-sm text-gray-400">
          <span>
            © {new Date().getFullYear()} Open Sky Paragliding. All rights
            reserved.
          </span>
          <span className="hover:text-sky-400 transition">
            Designed & Developed by Better Host
          </span>
        </div>
      </div>
    </footer>
  );
}
