"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

interface ArchCoordinates {
  x: number;
  y: number;
}

const IMAGES = [
  "https://plus.unsplash.com/premium_photo-1666797173828-e93427443e3b?w=600&auto=format&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1677856216675-a397a342cdd2?w=600&auto=format&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1530007874544-a6f7674b5a47?w=600&auto=format&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1607815705213-104c87ea8d0f?w=600&auto=format&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1620720970374-5b7e67e1e610?w=600&auto=format&fit=crop&crop=center",
];

const ANGLES = [-66, -33, 0, 33, 66];
const WHEEL_SENSITIVITY = 0.0015;
const TOUCH_SENSITIVITY = 0.0025;

// Phase boundary: everything before this = image dispersal, after = text reveal
const PHASE_SPLIT = 0.5;

// Sub-ranges within phase 2 — each element reveals in sequence, with slight overlap
const EYEBROW_RANGE: [number, number] = [0.5, 0.62];
const HEADING_RANGE: [number, number] = [0.6, 0.75];
const PARA_RANGE: [number, number] = [0.73, 0.88];
const BUTTON_RANGE: [number, number] = [0.86, 1];

// --- Responsive breakpoint config ---
// Everything the arch needs (radius, image box size, dispersal travel) is
// derived from viewport width so the whole gallery scales down cleanly on
// mobile instead of overflowing a fixed 420px radius built for desktop.
interface ArchConfig {
  radius: number;
  boxSize: number; // px, square image box
  verticalBias: number; // fine-tune nudge only — 0 keeps the arch perfectly centered
}

function getArchConfig(width: number): ArchConfig {
  if (width < 480) return { radius: 110, boxSize: 96, verticalBias: 0 };
  if (width < 640) return { radius: 140, boxSize: 112, verticalBias: 0 };
  if (width < 768) return { radius: 190, boxSize: 136, verticalBias: 0 };
  if (width < 1024) return { radius: 280, boxSize: 168, verticalBias: 0 };
  return { radius: 420, boxSize: 200, verticalBias: 0 };
}

// The arch spans from the apex (angle 0, highest point) down to the outer
// images (angle = max |ANGLES|, lowest point). To get equal gap above and
// below, we find the midpoint of that span and subtract it from every y —
// so the whole arc is centered on 0 instead of measured up from a bottom edge.
const MAX_ARCH_ANGLE = Math.max(...ANGLES.map((a) => Math.abs(a)));

function getArchVerticalCenter(radius: number): number {
  const apexY = -radius; // angle 0
  const outerRad = (MAX_ARCH_ANGLE * Math.PI) / 180;
  const outerY = -Math.cos(outerRad) * radius; // outermost images
  return (apexY + outerY) / 2;
}

// SSR-safe viewport width hook with resize listener
function useViewportWidth() {
  const [width, setWidth] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerWidth : 1280,
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

function archPosition(
  angleDeg: number,
  radius: number,
  verticalBias: number,
): ArchCoordinates {
  const rad = (angleDeg * Math.PI) / 180;
  const rawY = -Math.cos(rad) * radius;
  const center = getArchVerticalCenter(radius);
  return {
    x: Math.sin(rad) * radius,
    // Subtract the arc's own midpoint so y=0 is the true vertical center —
    // apex goes slightly negative (up), outer images slightly positive (down),
    // giving equal space above and below. verticalBias is an optional nudge.
    y: rawY - center + verticalBias,
  };
}

interface ArchImageProps {
  src: string;
  angle: number;
  indexOffset: number;
  dispersal: MotionValue<number>; // 0 = formed, 1 = fully dispersed off-screen
  config: ArchConfig;
  viewportWidth: number;
}

function ArchImage({
  src,
  angle,
  indexOffset,
  dispersal,
  config,
  viewportWidth,
}: ArchImageProps) {
  const { radius, boxSize, verticalBias } = config;
  const { x, y } = archPosition(angle, radius, verticalBias);

  // Disperse sideways off the left/right edges, scaled to actual viewport
  // width so images clear the screen on every device instead of overshooting
  // wildly on mobile or falling short on ultra-wide screens.
  const throwDistance = viewportWidth * 0.85;
  const dispersedX =
    x * 1.6 +
    (indexOffset === 0 ? throwDistance * 0.8 : indexOffset * throwDistance);
  const dispersedY = y + radius * 0.7; // drifts down and out, away from center

  const translateX = useTransform(dispersal, [0, 1], [x, dispersedX]);
  const translateY = useTransform(dispersal, [0, 1], [y, dispersedY]);
  const rotate = useTransform(dispersal, [0, 1], [angle * 0.22, angle * 0.9]);
  const scale = useTransform(dispersal, [0, 1], [1, 0.7]);
  const opacity = useTransform(dispersal, [0, 0.7, 1], [1, 0.4, 0]);

  return (
    <motion.div
      style={{
        x: translateX,
        y: translateY,
        rotate,
        scale,
        opacity,
        width: boxSize,
        height: boxSize,
        marginLeft: -boxSize / 2,
        marginTop: -boxSize / 2,
      }}
      className="absolute left-1/2 top-1/2 overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20"
    >
      <Image
        src={src}
        alt="Paragliding scenic view"
        fill
        sizes="(max-width: 480px) 96px, (max-width: 768px) 136px, 200px"
        className="object-cover"
        priority
      />
    </motion.div>
  );
}

export default function Banner() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const viewportWidth = useViewportWidth();
  const archConfig = getArchConfig(viewportWidth);

  // Overall interaction progress: 0 = start (gallery formed), 1 = end (text fully shown)
  const progress = useMotionValue(shouldReduceMotion ? 1 : 0);
  const progressRef = useRef(shouldReduceMotion ? 1 : 0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const unsubscribe = progress.on("change", (v) => {
      progressRef.current = v;
    });
    return unsubscribe;
  }, [progress]);

  // Determine when the sticky content is pinned (section top hit viewport top,
  // section bottom hasn't reached viewport top yet)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || shouldReduceMotion) return;

    const checkPinned = () => {
      const rect = section.getBoundingClientRect();
      const isPinned = rect.top <= 0 && rect.bottom >= window.innerHeight;
      setLocked(isPinned);
    };

    checkPinned();
    window.addEventListener("scroll", checkPinned, { passive: true });
    window.addEventListener("resize", checkPinned);
    return () => {
      window.removeEventListener("scroll", checkPinned);
      window.removeEventListener("resize", checkPinned);
    };
  }, [shouldReduceMotion]);

  // Intercept wheel/touch ONLY while pinned AND progress is mid-sequence.
  // Once progress hits 1 (forward) or 0 (backward), release control back to native scroll.
  useEffect(() => {
    if (!locked || shouldReduceMotion) return;

    const handleWheel = (e: WheelEvent) => {
      const current = progressRef.current;
      const goingForward = e.deltaY > 0;

      // At the boundaries, let native scroll carry the user out of the section
      if (goingForward && current >= 1) return;
      if (!goingForward && current <= 0) return;

      e.preventDefault();

      const next = Math.min(
        1,
        Math.max(0, current + e.deltaY * WHEEL_SENSITIVITY),
      );
      progress.set(next);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      const current = progressRef.current;
      const goingForward = deltaY > 0;

      if (goingForward && current >= 1) return;
      if (!goingForward && current <= 0) return;

      e.preventDefault();

      const next = Math.min(
        1,
        Math.max(0, current + deltaY * TOUCH_SENSITIVITY),
      );
      progress.set(next);
      touchStartY = currentY;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [locked, progress, shouldReduceMotion]);

  // --- Phase 1: image dispersal (progress 0 -> PHASE_SPLIT) ---
  const dispersal = useTransform(progress, [0, PHASE_SPLIT], [0, 1], {
    clamp: true,
  });

  // --- Phase 2: staggered text/button reveal (progress PHASE_SPLIT -> 1) ---
  const eyebrowOpacity = useTransform(progress, EYEBROW_RANGE, [0, 1], {
    clamp: true,
  });
  const eyebrowY = useTransform(progress, EYEBROW_RANGE, [24, 0], {
    clamp: true,
  });

  const headingOpacity = useTransform(progress, HEADING_RANGE, [0, 1], {
    clamp: true,
  });
  const headingY = useTransform(progress, HEADING_RANGE, [32, 0], {
    clamp: true,
  });

  const paraOpacity = useTransform(progress, PARA_RANGE, [0, 1], {
    clamp: true,
  });
  const paraY = useTransform(progress, PARA_RANGE, [24, 0], {
    clamp: true,
  });

  const buttonOpacity = useTransform(progress, BUTTON_RANGE, [0, 1], {
    clamp: true,
  });
  const buttonY = useTransform(progress, BUTTON_RANGE, [20, 0], {
    clamp: true,
  });
  const buttonScale = useTransform(progress, BUTTON_RANGE, [0.9, 1], {
    clamp: true,
  });

  return (
    <section ref={sectionRef} className="relative h-[300vh] w-full bg-sky-500">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-linear-to-br from-sky-500 to-sky-600">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <svg
          className="pointer-events-none absolute bottom-0 left-0 w-full text-white/10"
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0,300 C400,100 1000,100 1440,300"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="10,10"
          />
        </svg>

        <div className="relative flex h-full w-full items-center justify-center px-6 py-16 sm:px-10 lg:px-20">
          <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
            <motion.p
              style={{ opacity: eyebrowOpacity, y: eyebrowY }}
              className="mb-4 text-sm font-bold uppercase tracking-[4px] text-white/80 sm:text-base"
            >
              Ready For Adventure?
            </motion.p>

            <motion.h1
              style={{ opacity: headingOpacity, y: headingY }}
              className="mb-6 text-5xl font-black uppercase leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Soar Above
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-sky-200">
                The Himalayas
              </span>
            </motion.h1>

            <motion.p
              style={{ opacity: paraOpacity, y: paraY }}
              className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl"
            >
              Experience the ultimate freedom of tandem paragliding over Pokhara
              Valley, Phewa Lake, and the majestic Annapurna range with our
              certified expert pilots.
            </motion.p>

            <motion.button
              style={{ opacity: buttonOpacity, y: buttonY, scale: buttonScale }}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-sky-600 shadow-xl shadow-sky-900/20 transition-all duration-300 hover:scale-105 hover:bg-sky-50 active:scale-95"
            >
              Book Your Flight
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </div>

          {/* Arch Gallery Container — full-bleed + centered, so the arc's own
              center point lands on the true vertical center of the section,
              giving equal breathing room above and below. */}
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            {IMAGES.map((src, i) => (
              <ArchImage
                key={src}
                src={src}
                angle={ANGLES[i]}
                indexOffset={i - 2}
                dispersal={dispersal}
                config={archConfig}
                viewportWidth={viewportWidth}
              />
            ))}
          </div>

          {/* Scroll Indicator Dots */}
          <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full bg-white transition-opacity duration-300 ${
                  i === 3 ? "opacity-100" : "opacity-40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
