"use client";

import { motion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const riseIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

const lineReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  show: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.9, ease: EASE },
  },
};

// Slide in animations for cards
const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

// Card data
const cardData = [
  {
    id: 1,
    flight: "Flight 01",
    title: "Explore our flying options with pro instructors",
    badge: "Certified · Insured",
    number: "01",
    slideVariant: slideInRight,
  },
  {
    id: 2,
    flight: "Flight 02",
    title: "Experience flying above Pokhara",
    description: "Professional guides, breathtaking views",
    badge: "800m · ~25 min",
    number: "02",
    slideVariant: slideInLeft,
  },
];

// Card component with black glass effect
function FlightCard({ data }: { data: (typeof cardData)[0] }) {
  return (
    <motion.div
      variants={data.slideVariant}
      initial="hidden"
      animate="show"
      whileHover={{
        y: -6,
        borderColor: "rgba(255, 255, 255, 0.35)",
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        transition: { duration: 0.35, ease: EASE },
      }}
      className="group relative w-full sm:max-w-sm lg:w-72 xl:w-80 overflow-hidden rounded-xl sm:rounded-2xl bg-black/30 backdrop-blur-xl backdrop-saturate-150 border border-white/15 p-4 sm:p-5 lg:p-6 text-white shadow-2xl"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[10px] tracking-[0.2em] text-sky-300 font-semibold uppercase">
          {data.flight}
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_2px_rgba(56,189,248,0.5)]" />
      </div>
      <h3 className="mt-3 uppercase text-xs sm:text-sm md:text-base lg:text-lg font-bold leading-snug tracking-tight text-white">
        {data.title}
      </h3>
      {data.description && (
        <p className="text-[10px] sm:text-xs lg:text-sm text-white/70 mt-1 font-light">
          {data.description}
        </p>
      )}
      <div className="mt-4 h-px w-full bg-white/15" />
      <div className="mt-3 flex items-center justify-between">
        <span className="font-mono text-[10px] text-white/50">
          {data.badge}
        </span>
        <span
          className="text-xl sm:text-2xl lg:text-3xl font-black leading-none transition-colors duration-300 group-hover:text-sky-300"
          style={{
            WebkitTextStroke: "1.5px rgba(255,255,255,0.3)",
            color: "transparent",
          }}
        >
          {data.number}
        </span>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-svh lg:min-h-screen overflow-hidden flex flex-col justify-center lg:block">
      {/* Static Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient overlay - black only */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/50 to-black/70" />

      {/* HUD coordinate strip */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="hidden md:flex absolute top-24 inset-x-0 z-30 justify-center px-4"
      >
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-white/90 uppercase bg-black/30 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
          <span className="h-1 w-1 rounded-full bg-sky-400" />
          <span>28.2096&deg; N</span>
          <span className="text-white/30">/</span>
          <span>83.9856&deg; E</span>
          <span className="text-white/30">/</span>
          <span>Pokhara, Nepal</span>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col gap-8 px-4 sm:px-6 md:px-10 py-20
                   lg:block lg:absolute lg:inset-x-0 lg:top-28 xl:top-32 lg:px-16 lg:py-0"
      >
        {/* Main text */}
        <div>
          <h1 className="text-[12vw] sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[140px] 2xl:text-[180px] font-black leading-[0.9] uppercase tracking-tight drop-shadow-2xl">
            <motion.span
              variants={lineReveal}
              className="block text-white"
              style={{
                WebkitTextStroke: "2px rgba(255,255,255,0.9)",
                color: "transparent",
                textShadow: "0 4px 30px rgba(0,0,0,0.3)",
              }}
            >
              Paragliding
            </motion.span>
            <motion.span
              variants={lineReveal}
              className="block text-white"
              style={{
                WebkitTextStroke: "2px rgba(255,255,255,0.9)",
                color: "transparent",
                textShadow: "0 4px 30px rgba(0,0,0,0.3)",
              }}
            >
              Pokhara
            </motion.span>
          </h1>

          <motion.p
            variants={riseIn}
            className="text-white/95 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mt-2 sm:mt-3 md:mt-4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl font-light tracking-wide drop-shadow-lg"
          >
            Experience the thrill of flying over the stunning Himalayas
          </motion.p>

          <motion.div variants={riseIn} className="mt-6 hidden lg:block">
            <motion.a
              href="#book"
              whileHover={{ x: 4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="inline-flex items-center gap-2 border border-white/30 hover:border-sky-400 bg-white/10 hover:bg-sky-500/20 backdrop-blur-md px-6 py-3 rounded-full text-white font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-lg hover:shadow-sky-500/20"
            >
              Book a flight
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-sky-400"
              >
                &rarr;
              </motion.span>
            </motion.a>
          </motion.div>
        </div>

        {/* Cards — mobile/tablet with slide animations */}
        <div className="flex flex-col gap-3 sm:gap-4 lg:hidden">
          {cardData.map((card) => (
            <FlightCard key={card.id} data={card} />
          ))}
        </div>
      </motion.div>

      {/* Cards — desktop with slide animations */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="hidden lg:flex absolute bottom-10 xl:bottom-16 right-10 xl:right-16 z-20 gap-4 items-end"
      >
        {cardData.map((card) => (
          <FlightCard key={card.id} data={card} />
        ))}
      </motion.div>
    </section>
  );
}
