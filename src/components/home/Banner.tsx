"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import Lightfall from "../ui/Lightfall";

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

// --- Scroll feel tuning -----------------------------------------------
// The raw wheel/touch delta only ever moves a *target* value. What the
// user actually sees (`progress`) is a spring that chases that target,
// so no matter how hard or fast someone flicks the wheel/trackpad, the
// visible animation can't outrun the spring's own pace.
const WHEEL_SENSITIVITY = 0.00055;
const TOUCH_SENSITIVITY = 0.0009;

// Hard cap on how much a *single* wheel/touch event can move the target,
// regardless of how large deltaY is. This stops one aggressive flick
// (which can report deltaY in the hundreds) from teleporting the target
// from one end to the other — every flick, fast or slow, advances the
// target by at most this much.
const MAX_DELTA_PER_EVENT = 45;

// Spring that the visible progress uses to chase the target. Lower
// stiffness / higher damping = slower, more "felt" motion. Tweak these
// two numbers first if you want it to feel even more/less viscous.
const PROGRESS_SPRING = { stiffness: 55, damping: 22, mass: 1 };

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
  if (width < 480) return { radius: 130, boxSize: 120, verticalBias: 0 };
  if (width < 640) return { radius: 170, boxSize: 140, verticalBias: 0 };
  if (width < 768) return { radius: 230, boxSize: 170, verticalBias: 0 };
  if (width < 1024) return { radius: 350, boxSize: 210, verticalBias: 0 };
  return { radius: 500, boxSize: 250, verticalBias: 0 };
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

// Default used for BOTH the server render and the client's very first
// render (pre-hydration). Must be a plain constant — never read from
// `window` here, or the server and the client's first paint will disagree
// and React will log a hydration mismatch (which is exactly what you're
// seeing in the console for every ArchImage's width/margin/transform).
const SSR_DEFAULT_WIDTH = 1280;

// SSR-safe viewport width hook. Always starts at the same constant on
// server and client so hydration matches, then corrects to the real
// viewport size in an effect that only runs after mount (client-only).
// That correction can cause a brief one-time layout shift right after
// hydration on non-desktop screens — that's expected and is the standard
// tradeoff for viewport-dependent layout in SSR apps.
function useViewportWidth() {
  const [width, setWidth] = useState<number>(SSR_DEFAULT_WIDTH);

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

  // `progressTarget` is what wheel/touch input directly drives — it can
  // jump around instantly. `progress` is a spring chasing that target,
  // and is what every visual transform below actually reads from. That
  // split is what makes a fast flick still feel slow: the target may hit
  // 1 immediately, but the spring takes its own sweet time getting there.
  const progressTarget = useMotionValue(shouldReduceMotion ? 1 : 0);
  const progress = useSpring(progressTarget, PROGRESS_SPRING);

  // Boundary checks (below) need to know when the *visible* animation has
  // actually finished, not just when the target was set — otherwise we'd
  // release scroll capture before the user ever sees the end of the
  // sequence. So this ref tracks the smoothed spring value.
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

      // Clamp the raw delta before it ever touches the target, so one
      // aggressive flick can't advance things any faster than a gentle one.
      const clampedDelta = Math.max(
        -MAX_DELTA_PER_EVENT,
        Math.min(MAX_DELTA_PER_EVENT, e.deltaY),
      );

      const next = Math.min(
        1,
        Math.max(0, progressTarget.get() + clampedDelta * WHEEL_SENSITIVITY),
      );
      progressTarget.set(next);
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

      const clampedDelta = Math.max(
        -MAX_DELTA_PER_EVENT,
        Math.min(MAX_DELTA_PER_EVENT, deltaY),
      );

      const next = Math.min(
        1,
        Math.max(0, progressTarget.get() + clampedDelta * TOUCH_SENSITIVITY),
      );
      progressTarget.set(next);
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
  }, [locked, progressTarget, shouldReduceMotion]);

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
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Lightfall Background - Full screen */}
        <div className="absolute inset-0 z-0">
          <Lightfall
            colors={["#0EA5E9", "#2563EB", "#7C3AED"]}
            backgroundColor="#1E3A5F"
            speed={0.3}
            streakCount={3}
            streakWidth={1.2}
            streakLength={1.2}
            glow={1.2}
            density={0.7}
            twinkle={1}
            zoom={2.5}
            backgroundGlow={0}
            opacity={0.9}
            mouseInteraction={true}
            mouseStrength={0.4}
            mouseRadius={1.2}
            mouseDampening={0.15}
          />
        </div>

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
              className="group inline-flex items-center gap-3 rounded-full border-2 border-white/60 hover:border-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-white hover:text-sky-600 hover:bg-white/90 backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-black/20"
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
        </div>
      </div>
    </section>
  );
}
