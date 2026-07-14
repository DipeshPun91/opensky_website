"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaPaperPlane,
  FaTimes,
} from "react-icons/fa";
import { container, riseIn, slideInBottom } from "@/lib/animations";
import Separator from "@/components/ui/Seperator";

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

interface BookingFormState {
  name: string;
  email: string;
  phone: string;
  date: string;
  people: string;
  message: string;
}

const emptyBookingForm: BookingFormState = {
  name: "",
  email: "",
  phone: "",
  date: "",
  people: "1",
  message: "",
};

function BookingDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<BookingFormState>(emptyBookingForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle",
  );

  // Close on Escape, and lock page scroll while the dialog is open.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onClose]);

  // Reset back to a fresh form shortly after the dialog fully closes.
  useEffect(() => {
    if (open) return;
    const timeout = setTimeout(() => {
      setForm(emptyBookingForm);
      setStatus("idle");
    }, 300);
    return () => clearTimeout(timeout);
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // TODO: wire this up to the real booking endpoint (API route, email
    // service, booking system, etc.) — this just simulates a request.
    await new Promise((resolve) => setTimeout(resolve, 800));

    setStatus("success");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-dialog-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close booking form"
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-sky-500 hover:text-white transition duration-300"
            >
              <FaTimes className="h-3.5 w-3.5" />
            </button>

            {status === "success" ? (
              <div className="py-10 text-center">
                <h3 className="text-xl font-black uppercase text-gray-900">
                  Request Sent
                </h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  Thanks, {form.name.split(" ")[0] || "there"} — we&apos;ve got
                  your flight request and will reach out shortly to confirm the
                  details.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 inline-flex items-center justify-center rounded-md bg-sky-500 hover:bg-sky-600 transition-all duration-300 text-white px-6 py-2.5 font-semibold uppercase tracking-[2px] text-sm"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="uppercase tracking-[3px] text-xs text-sky-500 font-medium">
                  Ready For Adventure?
                </p>
                <h3
                  id="booking-dialog-title"
                  className="mt-1 text-2xl font-black uppercase text-gray-900"
                >
                  Book Your Flight
                </h3>

                <form
                  onSubmit={handleSubmit}
                  className="mt-6 flex flex-col gap-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="name"
                        className="text-xs font-bold uppercase tracking-wide text-gray-600"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="phone"
                        className="text-xs font-bold uppercase tracking-wide text-gray-600"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+977 ..."
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-bold uppercase tracking-wide text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="date"
                        className="text-xs font-bold uppercase tracking-wide text-gray-600"
                      >
                        Preferred Date
                      </label>
                      <input
                        id="date"
                        name="date"
                        type="date"
                        required
                        value={form.date}
                        onChange={handleChange}
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="people"
                        className="text-xs font-bold uppercase tracking-wide text-gray-600"
                      >
                        Number Of People
                      </label>
                      <input
                        id="people"
                        name="people"
                        type="number"
                        min={1}
                        required
                        value={form.people}
                        onChange={handleChange}
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="message"
                      className="text-xs font-bold uppercase tracking-wide text-gray-600"
                    >
                      Message{" "}
                      <span className="normal-case font-normal text-gray-400">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Anything else we should know?"
                      className="resize-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileHover={{ scale: status === "submitting" ? 1 : 1.02 }}
                    whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-sky-500 hover:bg-sky-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 text-white px-6 py-3 font-semibold uppercase tracking-[2px] shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 text-sm"
                  >
                    {status === "submitting" ? (
                      "Sending..."
                    ) : (
                      <>
                        Request Booking
                        <FaPaperPlane className="h-3.5 w-3.5" />
                      </>
                    )}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Contact() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
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
              onClick={() => setDialogOpen(true)}
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

      <BookingDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
}
