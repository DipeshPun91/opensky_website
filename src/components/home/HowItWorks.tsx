"use client";

import { motion } from "framer-motion";
import {
  FaCalendarCheck,
  FaUsers,
  FaParachuteBox,
  FaCamera,
} from "react-icons/fa";
import {
  container,
  riseIn,
  slideInBottom,
  createStaggerContainer,
  EASE,
} from "@/lib/animations";
import Seperator from "../ui/Seperator";

const steps = [
  {
    number: "01",
    title: "Book Your Flight",
    description:
      "Choose your preferred tandem flight package and reserve your date online.",
    icon: <FaCalendarCheck size={34} />,
  },
  {
    number: "02",
    title: "Meet Your Pilot",
    description:
      "Our certified instructors will welcome you and explain everything before takeoff.",
    icon: <FaUsers size={34} />,
  },
  {
    number: "03",
    title: "Take Off & Fly",
    description:
      "Enjoy breathtaking panoramic views while safely soaring above Pokhara Valley.",
    icon: <FaParachuteBox size={34} />,
  },
  {
    number: "04",
    title: "Photos & Memories",
    description:
      "Receive amazing photos and videos to remember your adventure forever.",
    icon: <FaCamera size={34} />,
  },
];

// Custom stagger for steps
const stepContainer = createStaggerContainer(0.15, 0.1);

export default function HowItWorks() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={container}
      className="py-16 sm:py-20 md:py-24 bg-white w-full overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Heading */}
        <motion.div
          variants={riseIn}
          className="text-center mb-12 sm:mb-16 max-w-7xl mx-auto"
        >
          <p className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-500 font-medium">
            Simple Process
          </p>

          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight text-gray-800">
            How It Works
          </h2>

          <motion.div variants={riseIn}>
            <Seperator />
          </motion.div>

          <motion.p
            variants={riseIn}
            className="mt-6 max-w-2xl mx-auto text-gray-600 leading-7 sm:leading-8 text-sm sm:text-base"
          >
            From booking your flight to landing with unforgettable memories,
            your paragliding adventure in Pokhara is just four simple steps
            away.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-7xl mx-auto">
          {/* Dashed Line (Desktop) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            viewport={{ once: true }}
            className="hidden lg:block absolute left-0 right-0 top-1/2 border-t-2 border-dashed border-sky-200 origin-left"
          />

          <motion.div
            variants={stepContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={index % 2 === 0 ? slideInBottom : slideInBottom}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  index % 2 === 0 ? "lg:items-start" : "lg:items-end lg:pt-24"
                }`}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-7 md:p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300 w-full"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
                    viewport={{ once: true }}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center mb-4 sm:mb-6"
                  >
                    {step.icon}
                  </motion.div>

                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
                    viewport={{ once: true }}
                    className="text-sky-500 font-bold tracking-[3px] text-xs sm:text-sm"
                  >
                    {step.number}
                  </motion.span>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5, ease: EASE }}
                    viewport={{ once: true }}
                    className="mt-3 sm:mt-4 text-xl sm:text-2xl font-black uppercase leading-tight text-gray-800"
                  >
                    {step.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
                    viewport={{ once: true }}
                    className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 leading-6 sm:leading-7"
                  >
                    {step.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={riseIn}
          className="text-center mt-12 sm:mt-16 max-w-7xl mx-auto"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="inline-flex items-center gap-3 rounded-md bg-sky-500 hover:bg-sky-600 transition-all duration-300 text-white px-6 sm:px-8 py-3 sm:py-4 font-semibold uppercase tracking-[2px] shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 group text-sm"
          >
            Start Your Adventure
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaParachuteBox size={18} />
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
