"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { container, riseIn, slideInBottom, EASE } from "@/lib/animations";

export default function Cta() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Background Image with Ken Burns effect */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: EASE }}
        className="absolute inset-0"
      >
        <Image
          src="https://plus.unsplash.com/premium_photo-1666797173828-e93427443e3b?w=600&auto=format&fit=crop&crop=center"
          alt="Paragliding over Pokhara"
          fill
          className="object-cover"
          priority
          loading="eager"
          sizes="100vw"
        />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Decorative Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/30" />

      {/* Decorative animated orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl"
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto text-center text-white w-full">
          {/* Small Tag */}
          <motion.p
            variants={riseIn}
            className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-400 font-medium"
          >
            Your Adventure Starts Here
          </motion.p>

          {/* Main Heading */}
          <motion.h2
            variants={slideInBottom}
            className="mt-4 sm:mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase leading-tight"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
              viewport={{ once: true }}
              className="text-sky-400"
            >
              Open
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
              viewport={{ once: true }}
            >
              Sky
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
              viewport={{ once: true }}
              className="text-white"
            >
              Paragliding
            </motion.span>
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={riseIn}
            className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-7 sm:leading-8 max-w-2xl mx-auto"
          >
            Experience the thrill of tandem paragliding over the stunning
            Pokhara Valley, Phewa Lake, and the majestic Annapurna range with
            our certified instructors.
          </motion.p>

          {/* Buttons - No glow effects */}
          <motion.div
            variants={riseIn}
            className="mt-8 sm:mt-10 md:mt-12 flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-md bg-sky-500 hover:bg-sky-600 transition-all duration-300 text-white px-4 sm:px-5 py-2 sm:py-2.5 font-semibold uppercase tracking-[2px] group text-xs sm:text-sm"
            >
              Book Your Flight
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaArrowRight size={14} />
              </motion.span>
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 1)",
                color: "#111827",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="rounded-md border-2 border-white/80 hover:border-white px-4 sm:px-5 py-2 sm:py-2.5 uppercase tracking-[2px] font-semibold text-white hover:bg-white hover:text-gray-900 transition-all duration-300 text-xs sm:text-sm"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
