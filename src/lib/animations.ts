import { type Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

// Container animations for staggered children
export const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

// Fade in with upward motion
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
};

// Line reveal animation (clip path from bottom to top)
export const lineReveal: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  show: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.9, ease: EASE },
  },
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

// Slide in from bottom
export const slideInBottom: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

// Slide in from top
export const slideInTop: Variants = {
  hidden: { opacity: 0, y: -60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

// Fade in only
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

// Scale in with fade
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

// Card hover animation (for glass cards)
export const cardHover = {
  hover: {
    y: -6,
    borderColor: "rgba(255, 255, 255, 0.35)",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    transition: { duration: 0.35, ease: EASE },
  },
};

// Button hover animation
export const buttonHover = {
  hover: {
    x: 4,
    scale: 1.02,
    transition: { duration: 0.3, ease: EASE },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1, ease: EASE },
  },
};

// Staggered children container with custom delay
export const createStaggerContainer = (
  staggerChildren = 0.12,
  delayChildren = 0.15,
): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Custom slide in with configurable direction and distance
export const createSlideIn = (
  direction: "left" | "right" | "up" | "down" = "up",
  distance = 60,
  duration = 0.7,
): Variants => {
  const directions = {
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
    up: { x: 0, y: -distance },
    down: { x: 0, y: distance },
  };

  const offset = directions[direction];

  return {
    hidden: { opacity: 0, ...offset },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, ease: EASE },
    },
  };
};
