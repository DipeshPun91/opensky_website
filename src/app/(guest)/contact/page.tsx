"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaPaperPlane,
} from "react-icons/fa";
import { container, riseIn, slideInBottom } from "@/lib/animations";
import Separator from "@/components/ui/Seperator";
import { useBookingDialog } from "@/providers/BookingProvider";

const contactDetails = [
  {
    icon: FaPhone,
    label: "Round the clock support",
    value: "+977 9846212425",
    href: "tel:+9779846212425",
  },
  {
    icon: FaEnvelope,
    label: "For any questions",
    value: "openskyparagliding@gmail.com",
    href: "mailto:openskyparagliding@gmail.com",
  },
  {
    icon: FaMapMarkerAlt,
    label: "Find us here",
    value: "Pokhara-6, Hallan Chowk, Kaski, 33700, Nepal",
    href: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.7266072835714!2d83.9562502148494!3d28.215617709578726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995951d7f48076d%3A0x1d848a5b341a7d8!2sOpen%20Sky%20Paragliding!5e0!3m2!1sen!2snp!4v1638957692769!5m2!1sen!2snp",
  },
];

const socialLinks = [
  {
    icon: FaFacebookF,
    href: "https://www.facebook.com/openskyparagliding",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/openskyparagliding/",
    label: "Instagram",
  },
];

export default function Contact() {
  const { openBookingDialog } = useBookingDialog();

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
      className="py-16 sm:py-20 md:py-24 bg-white w-full overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
        <motion.div
          variants={riseIn}
          className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto"
        >
          <p className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-500 font-medium">
            Get In Touch
          </p>

          <h1 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight text-gray-900">
            Let&apos;s Have A Talk Together
          </h1>

          <motion.div variants={riseIn}>
            <Separator />
          </motion.div>

          <motion.button
            variants={riseIn}
            onClick={openBookingDialog}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-sky-500 hover:bg-sky-600 transition-all duration-300 text-white px-8 py-3.5 font-semibold uppercase tracking-[2px] shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 text-sm"
          >
            Book Your Flight
            <FaPaperPlane className="h-3.5 w-3.5" />
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-7xl mx-auto">
          {/* Left: map */}
          <motion.div
            variants={slideInBottom}
            className="relative w-full aspect-4/3 sm:aspect-16/10 lg:aspect-auto lg:h-full min-h-80 overflow-hidden rounded-2xl shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.7266072835714!2d83.9562502148494!3d28.215617709578726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995951d7f48076d%3A0x1d848a5b341a7d8!2sOpen%20Sky%20Paragliding!5e0!3m2!1sen!2snp!4v1638957692769!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Open Sky Paragliding location"
              className="absolute inset-0"
            />
          </motion.div>

          {/* Right: contact details */}
          <motion.div variants={riseIn} className="flex flex-col gap-5">
            {contactDetails.map((detail) => (
              <Link
                key={detail.label}
                href={detail.href}
                target={detail.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  detail.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group flex items-start gap-4 rounded-2xl bg-gray-50 hover:bg-sky-50 p-4 sm:p-5 transition duration-300"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-500 text-white group-hover:scale-105 transition duration-300">
                  <detail.icon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wide text-gray-500">
                    {detail.label}
                  </span>
                  <span className="block text-sm sm:text-base font-bold text-gray-900">
                    {detail.value}
                  </span>
                </span>
              </Link>
            ))}

            <div className="flex items-center gap-3 mt-1 pl-1">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-sky-500 hover:text-white transition duration-300"
                >
                  <social.icon className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
