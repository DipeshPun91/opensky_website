"use client";

import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import {
  container,
  riseIn,
  slideInBottom,
  createStaggerContainer,
} from "@/lib/animations";

const pages = ["Home", "About", "FAQ", "Gallery", "Contact"];
const flights = ["Basic Flight", "Standard Flight", "Panorama Flight"];

const linkContainer = createStaggerContainer(0.08, 0.1);

export default function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={container}
      className="relative w-full bg-gray-900"
    >
      <div className="w-full px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
        {/* Logo Row */}
        <motion.div
          variants={riseIn}
          className="flex flex-col sm:flex-row items-center justify-between pb-10 mb-10 border-b border-gray-700/50"
        >
          <div className="text-center sm:text-left">
            <div className="text-3xl sm:text-4xl font-black text-white">
              <span className="text-sky-400">OPEN</span>
              <span>SKY</span>
            </div>
            <p className="text-sm text-gray-400 mt-1 tracking-wide">
              Paragliding Adventures
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-2xl text-gray-300 mt-4 sm:mt-0">
            <motion.a
              href="#"
              aria-label="Facebook"
              whileHover={{ scale: 1.15, color: "#38BDF8" }}
              transition={{ duration: 0.3 }}
              className="hover:text-sky-400 transition duration-300"
            >
              <FaFacebook />
            </motion.a>
            <motion.a
              href="#"
              aria-label="Instagram"
              whileHover={{ scale: 1.15, color: "#38BDF8" }}
              transition={{ duration: 0.3 }}
              className="hover:text-sky-400 transition duration-300"
            >
              <FaInstagram />
            </motion.a>
            <motion.a
              href="https://wa.me/9779800000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              whileHover={{ scale: 1.15, color: "#38BDF8" }}
              transition={{ duration: 0.3 }}
              className="hover:text-sky-400 transition duration-300"
            >
              <FaWhatsapp />
            </motion.a>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left - Let's have fun section */}
          <motion.div
            variants={riseIn}
            className="lg:col-span-5 text-center lg:text-left"
          >
            <p className="uppercase text-sm tracking-wider text-gray-400">
              Let&apos;s have fun!
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-4 leading-tight text-white">
              YOUR OPEN SKY PARAGLIDING EXPERIENCE
            </h2>
          </motion.div>

          {/* Pages Links */}
          <motion.div
            variants={riseIn}
            className="lg:col-span-3 text-center lg:text-left"
          >
            <h3 className="font-bold text-xl sm:text-2xl mb-6 sm:mb-8 text-white">
              Pages
            </h3>
            <motion.ul
              variants={linkContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-3 sm:space-y-4 text-gray-300"
            >
              {pages.map((page) => (
                <motion.li key={page} variants={slideInBottom}>
                  <a
                    href="#"
                    className="hover:text-sky-400 transition duration-300 relative after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-sky-400 after:transition-all after:duration-300 hover:after:w-full inline-block"
                  >
                    {page}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Tandem Flights */}
          <motion.div
            variants={riseIn}
            className="lg:col-span-4 text-center lg:text-left"
          >
            <h3 className="font-bold text-xl sm:text-2xl mb-6 sm:mb-8 text-white">
              Tandem Flights
            </h3>
            <motion.ul
              variants={linkContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-3 sm:space-y-4 text-gray-300"
            >
              {flights.map((flight) => (
                <motion.li key={flight} variants={slideInBottom}>
                  <a
                    href="#"
                    className="hover:text-sky-400 transition duration-300 relative after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-0.5 after:bg-sky-400 after:transition-all after:duration-300 hover:after:w-full inline-block"
                  >
                    {flight}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* Contact Info Row - Centered on small screens */}
        <motion.div
          variants={riseIn}
          className="mt-16 sm:mt-20 grid sm:grid-cols-3 gap-6 sm:gap-8 text-base sm:text-lg text-gray-300 border-t border-gray-700/50 pt-10 text-center sm:text-left"
        >
          <motion.a
            href="tel:+9779800000000"
            whileHover={{ color: "#38BDF8" }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center sm:justify-start gap-3 hover:text-sky-400 transition duration-300 group"
          >
            <FiPhone className="group-hover:scale-110 transition" />
            +977 980-000-0000
          </motion.a>

          <motion.a
            href="https://wa.me/9779800000000"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ color: "#38BDF8" }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center sm:justify-start gap-3 hover:text-sky-400 transition duration-300 group"
          >
            <FaWhatsapp className="group-hover:scale-110 transition" />
            WhatsApp
          </motion.a>

          <motion.a
            href="mailto:info@openskyparagliding.com"
            whileHover={{ color: "#38BDF8" }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center sm:justify-start gap-3 hover:text-sky-400 transition duration-300 group"
          >
            <FiMail className="group-hover:scale-110 transition" />
            info@openskyparagliding.com
          </motion.a>
        </motion.div>

        {/* Address - Centered on small screens */}
        <motion.div
          variants={riseIn}
          className="mt-6 flex items-center justify-center sm:justify-start gap-3 text-gray-300"
        >
          <FiMapPin className="text-sky-400" />
          Open Sky, Sarangkot, Pokhara, Nepal
        </motion.div>

        {/* Bottom Bar - Centered on small screens */}
        <motion.div
          variants={riseIn}
          className="mt-10 border-t border-gray-700/50 pt-6 flex flex-col sm:flex-row gap-2 justify-center sm:justify-between text-sm text-gray-400 text-center sm:text-left"
        >
          <span>
            © {new Date().getFullYear()} Open Sky Paragliding. All rights
            reserved.
          </span>
          <span className="hover:text-sky-400 transition">
            Designed & Developed by Better Host
          </span>
        </motion.div>
      </div>
    </motion.footer>
  );
}
