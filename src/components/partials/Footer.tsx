"use client";

import { useState } from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin, FiArrowUpRight } from "react-icons/fi";

const pages = ["Home", "About", "FAQ", "Gallery", "Contact"];
const flights = ["Basic Flight", "Standard Flight", "Panorama Flight"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubscribe = () => {
    if (!email.trim()) return;
    setSent(true);
    setEmail("");
  };

  return (
    <footer
      className="relative bg-cover bg-center py-20"
      style={{
        backgroundImage: "url('/images/footer.jpg')",
      }}
    >
      {/* Slightly darker + less blurred overlay than before, for reliable text contrast over any photo */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-4 gap-10 lg:gap-14">
          {/* Left */}
          <div className="lg:col-span-2 rounded-3xl bg-white/50 backdrop-blur-xl p-8 sm:p-10">
            <p className="uppercase text-sm tracking-wider text-gray-600">
              Let&apos;s have fun!
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-4 leading-tight text-gray-900">
              YOUR OPEN SKY PARAGLIDING EXPERIENCE
            </h2>

            <div className="mt-10 sm:mt-14">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Stay updated
              </h3>
              <p className="mt-3 text-gray-700">
                Sign up for flight windows and seasonal offers.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 rounded-full border border-gray-300 bg-white/70 p-4 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-orange-500"
                />
                <button
                  onClick={handleSubscribe}
                  className="shrink-0 rounded-full bg-orange-500 hover:bg-orange-600 transition px-6 py-4 font-semibold text-white flex items-center justify-center gap-2"
                >
                  Subscribe
                  <FiArrowUpRight />
                </button>
              </div>
              {sent && (
                <p className="mt-3 text-sm text-orange-600">
                  Thanks — you&apos;re on the list.
                </p>
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-xl sm:text-2xl mb-6 sm:mb-8 text-gray-900">
              Pages
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-gray-700">
              {pages.map((page) => (
                <li key={page}>
                  <a href="#" className="hover:text-orange-500 transition">
                    {page}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xl sm:text-2xl mb-6 sm:mb-8 text-gray-900">
              Tandem Flights
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-gray-700">
              {flights.map((flight) => (
                <li key={flight}>
                  <a href="#" className="hover:text-orange-500 transition">
                    {flight}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="font-bold text-xl sm:text-2xl mb-5 sm:mb-6 mt-10 text-gray-900">
              Social
            </h3>
            <div className="flex items-center gap-5 text-2xl text-gray-800">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-orange-500 transition"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-orange-500 transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-20 grid sm:grid-cols-3 gap-6 sm:gap-8 text-base sm:text-lg text-gray-800">
          <a
            href="tel:+9779800000000"
            className="flex items-center gap-3 hover:text-orange-500 transition"
          >
            <FiPhone />
            +977 980-000-0000
          </a>

          <a
            href="https://wa.me/9779800000000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:text-orange-500 transition"
          >
            <FaWhatsapp />
            WhatsApp
          </a>

          <a
            href="mailto:info@openskyparagliding.com"
            className="flex items-center gap-3 hover:text-orange-500 transition"
          >
            <FiMail />
            info@openskyparagliding.com
          </a>
        </div>

        <div className="mt-6 flex items-center gap-3 text-gray-800">
          <FiMapPin />
          Open Sky, Sarangkot, Pokhara, Nepal
        </div>

        <div className="mt-10 sm:mt-12 border-t border-gray-300 pt-6 flex flex-col sm:flex-row gap-2 justify-between text-sm text-gray-600">
          <span>© Open Sky {new Date().getFullYear()}</span>
          <span>Designed & Developed by Better Host</span>
        </div>
      </div>
    </footer>
  );
}
