"use client";

import { motion } from "framer-motion";
import {
  container,
  riseIn,
  createStaggerContainer,
  EASE,
} from "@/lib/animations";

const statsData = [
  {
    number: "2500+",
    label: "Happy Clients",
  },
  {
    number: "10+",
    label: "Years Experience",
  },
  {
    number: "100%",
    label: "Safety Record",
  },
  {
    number: "4.9★",
    label: "Average Rating",
  },
];

const statsContainer = createStaggerContainer(0.12, 0.1);

interface StatsProps {
  className?: string;
  bgColor?: string;
  textColor?: string;
  numberColor?: string;
}

export default function Stats({
  className = "",
  bgColor = "bg-white",
  textColor = "text-gray-600",
  numberColor = "text-sky-500",
}: StatsProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
      className={`py-8 sm:py-12 ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          variants={statsContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto text-center"
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              variants={riseIn}
              className={`${bgColor} rounded-2xl p-6 sm:p-8`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 0.15 + index * 0.1,
                  duration: 0.6,
                  ease: EASE,
                }}
                viewport={{ once: true }}
              >
                <h3
                  className={`text-3xl sm:text-4xl md:text-5xl font-black ${numberColor}`}
                >
                  {stat.number}
                </h3>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  delay: 0.3 + index * 0.1,
                  duration: 0.5,
                  ease: EASE,
                }}
                viewport={{ once: true }}
                className={`mt-2 uppercase tracking-[2px] text-xs sm:text-sm font-medium ${textColor}`}
              >
                {stat.label}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
