"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Separator from "../ui/Seperator";
import {
  container,
  riseIn,
  slideInLeft,
  slideInRight,
  slideInBottom,
  fadeIn,
  createStaggerContainer,
} from "@/lib/animations";

// Custom stagger container with specific delays
const featureContainer = createStaggerContainer(0.08, 0.1);

export default function Feature() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={container}
      className="py-16 sm:py-20 md:py-24 bg-linear-to-b from-gray-50 to-white w-full overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Heading */}
        <motion.div
          variants={riseIn}
          className="text-center mb-12 sm:mb-16 max-w-7xl mx-auto"
        >
          <p className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-500 font-medium">
            Why Choose Us
          </p>

          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight text-gray-800">
            Experience The Difference
          </h2>

          <motion.div variants={riseIn}>
            <Separator />
          </motion.div>
        </motion.div>

        {/* Top Row - Arch Pattern */}
        <motion.div
          variants={featureContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 lg:items-end max-w-7xl mx-auto"
        >
          {/* Card 1 */}
          <motion.div
            variants={slideInLeft}
            className="group rounded-xl sm:rounded-2xl bg-linear-to-br from-gray-900 to-black text-white p-6 sm:p-7 min-h-60 lg:h-85 flex flex-col justify-between gap-6 hover:-translate-y-2 transition duration-300 overflow-hidden border-2 border-sky-400/30"
          >
            <div>
              <div className="flex items-center justify-between">
                <span
                  className="text-3xl sm:text-4xl lg:text-5xl font-black leading-none transition-colors duration-300 group-hover:text-sky-400"
                  style={{
                    WebkitTextStroke: "1.5px rgba(255,255,255,0.3)",
                    color: "transparent",
                  }}
                >
                  01
                </span>
              </div>

              <h3 className="mt-3 sm:mt-4 text-xl sm:text-xl lg:text-xl xl:text-2xl font-black uppercase leading-tight wrap-break-word">
                Discover Pokhara
              </h3>
            </div>

            <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-gray-300">
              Fly over Phewa Lake with expert instructors and enjoy breathtaking
              Himalayan views.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={fadeIn}
            className="group rounded-xl sm:rounded-2xl bg-white p-6 sm:p-7 min-h-50 lg:h-75 flex flex-col justify-between gap-6 hover:-translate-y-2 transition duration-300 overflow-hidden border-2 border-sky-400/30"
          >
            <div>
              <div className="flex items-center justify-between">
                <span
                  className="text-3xl sm:text-4xl lg:text-5xl font-black leading-none transition-colors duration-300 group-hover:text-sky-500"
                  style={{
                    WebkitTextStroke: "1.5px rgba(0,0,0,0.15)",
                    color: "transparent",
                  }}
                >
                  02
                </span>
              </div>

              <h3 className="mt-3 sm:mt-4 text-xl sm:text-xl lg:text-xl xl:text-2xl font-black uppercase leading-tight text-gray-800 wrap-break-word">
                Expert Pilots
              </h3>
            </div>

            <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-gray-600">
              Certified tandem pilots ensuring safe and thrilling flights every
              time.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={fadeIn}
            className="group rounded-xl sm:rounded-2xl bg-white p-6 sm:p-7 min-h-45 lg:h-65 flex flex-col justify-between gap-6 hover:-translate-y-2 transition duration-300 overflow-hidden border-2 border-sky-400/30"
          >
            <div>
              <h3 className="mt-3 sm:mt-4 text-xl sm:text-xl lg:text-xl xl:text-2xl font-black uppercase leading-tight text-gray-800 wrap-break-word">
                Premium Gear
              </h3>
            </div>

            <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-gray-600">
              Internationally certified equipment inspected before every flight.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            variants={fadeIn}
            className="group rounded-xl sm:rounded-2xl bg-white p-6 sm:p-7 min-h-50 lg:h-75 flex flex-col justify-between gap-6 hover:-translate-y-2 transition duration-300 overflow-hidden border-2 border-sky-400/30"
          >
            <div>
              <div className="flex items-center justify-between">
                <span
                  className="text-3xl sm:text-4xl lg:text-5xl font-black leading-none transition-colors duration-300 group-hover:text-sky-500"
                  style={{
                    WebkitTextStroke: "1.5px rgba(0,0,0,0.15)",
                    color: "transparent",
                  }}
                >
                  04
                </span>
              </div>

              <h3 className="mt-3 sm:mt-4 text-xl sm:text-xl lg:text-xl xl:text-2xl font-black uppercase leading-tight text-gray-800 wrap-break-word">
                Unforgettable Memories
              </h3>
            </div>

            <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-gray-600">
              Capture stunning photos and videos above the Annapurna range.
            </p>
          </motion.div>

          {/* Card 5 */}
          <motion.div
            variants={slideInRight}
            className="group rounded-xl sm:rounded-2xl bg-linear-to-br from-gray-900 to-black text-white p-6 sm:p-7 min-h-60 lg:h-85 flex flex-col justify-between gap-6 hover:-translate-y-2 transition duration-300 overflow-hidden border-2 border-sky-400/30"
          >
            <div>
              <div className="flex items-center justify-between">
                <span
                  className="text-3xl sm:text-4xl lg:text-5xl font-black leading-none transition-colors duration-300 group-hover:text-sky-400"
                  style={{
                    WebkitTextStroke: "1.5px rgba(255,255,255,0.3)",
                    color: "transparent",
                  }}
                >
                  05
                </span>
              </div>

              <h3 className="mt-3 sm:mt-4 text-xl sm:text-xl lg:text-xl xl:text-2xl font-black uppercase leading-tight wrap-break-word">
                Easy Booking
              </h3>
            </div>

            <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-gray-300">
              Reserve your tandem flight in minutes and prepare for adventure.
            </p>
          </motion.div>
        </motion.div>

        {/* Image Row - Between top and bottom cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 mt-4 sm:mt-5 lg:mt-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative h-60 sm:h-75 md:h-90 overflow-hidden rounded-xl sm:rounded-2xl group"
          >
            <Image
              src="https://images.unsplash.com/photo-1620720970374-5b7e67e1e610?w=600&auto=format&fit=crop&crop=center"
              alt="Paragliding above Pokhara"
              fill
              className="object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              viewport={{ once: true }}
              className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white pr-4"
            >
              <p className="text-xs sm:text-sm font-light tracking-wider uppercase opacity-80">
                Adventure Awaits
              </p>
              <h3 className="text-base sm:text-xl md:text-2xl font-bold leading-tight">
                Fly Above the Himalayas
              </h3>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative h-60 sm:h-75 md:h-90 overflow-hidden rounded-xl sm:rounded-2xl group"
          >
            <Image
              src="https://images.unsplash.com/photo-1607815705213-104c87ea8d0f?w=600&auto=format&fit=crop&crop=center"
              alt="Tandem paragliding pilot over Pokhara"
              fill
              className="object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              viewport={{ once: true }}
              className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white pr-4"
            >
              <p className="text-xs sm:text-sm font-light tracking-wider uppercase opacity-80">
                Expert Guidance
              </p>
              <h3 className="text-base sm:text-xl md:text-2xl font-bold leading-tight">
                Professional Instructors
              </h3>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Row - Arch Pattern (inverted) */}
        <motion.div
          variants={featureContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 mt-4 sm:mt-5 lg:mt-6 lg:items-start max-w-7xl mx-auto"
        >
          {/* Card 6 */}
          <motion.div
            variants={slideInBottom}
            className="group rounded-xl sm:rounded-2xl bg-linear-to-br from-gray-900 to-black text-white p-6 sm:p-7 min-h-50 lg:h-75 flex flex-col justify-between gap-6 hover:-translate-y-2 transition duration-300 overflow-hidden border-2 border-sky-400/30"
          >
            <div>
              <div className="flex items-center justify-between">
                <span
                  className="text-3xl sm:text-4xl lg:text-5xl font-black leading-none transition-colors duration-300 group-hover:text-sky-400"
                  style={{
                    WebkitTextStroke: "1.5px rgba(255,255,255,0.3)",
                    color: "transparent",
                  }}
                >
                  06
                </span>
              </div>

              <h3 className="mt-3 sm:mt-4 text-xl sm:text-xl lg:text-xl xl:text-2xl font-black uppercase leading-tight wrap-break-word">
                Best Value
              </h3>
            </div>

            <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-gray-300">
              Competitive rates without compromising safety or experience.
            </p>
          </motion.div>

          {/* Card 7 */}
          <motion.div
            variants={fadeIn}
            className="group rounded-xl sm:rounded-2xl bg-white p-6 sm:p-7 min-h-45 lg:h-65 flex flex-col justify-between gap-6 hover:-translate-y-2 transition duration-300 overflow-hidden border-2 border-sky-400/30"
          >
            <div>
              <div className="flex items-center justify-between">
                <span
                  className="text-3xl sm:text-4xl lg:text-5xl font-black leading-none transition-colors duration-300 group-hover:text-sky-500"
                  style={{
                    WebkitTextStroke: "1.5px rgba(0,0,0,0.15)",
                    color: "transparent",
                  }}
                >
                  07
                </span>
              </div>

              <h3 className="mt-3 sm:mt-4 text-xl sm:text-xl lg:text-xl xl:text-2xl font-black uppercase leading-tight text-gray-800 wrap-break-word">
                Group Savings
              </h3>
            </div>

            <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-gray-600">
              Special discounted rates for groups and families.
            </p>
          </motion.div>

          {/* Card 8 */}
          <motion.div
            variants={fadeIn}
            className="rounded-xl sm:rounded-2xl bg-linear-to-br from-sky-500 to-sky-600 text-white min-h-40 lg:h-55 flex items-center justify-center p-6 sm:p-7 transition duration-300 hover:scale-[1.02] overflow-hidden"
          >
            <h3 className="text-xl sm:text-xl lg:text-xl xl:text-2xl font-black uppercase leading-tight text-center wrap-break-word">
              Your Next Adventure Starts Here
            </h3>
          </motion.div>

          {/* Card 9 */}
          <motion.div
            variants={fadeIn}
            className="group rounded-xl sm:rounded-2xl bg-white p-6 sm:p-7 min-h-45 lg:h-65 flex flex-col justify-between gap-6 hover:-translate-y-2 transition duration-300 overflow-hidden border-2 border-sky-400/30"
          >
            <div>
              <div className="flex items-center justify-between">
                <span
                  className="text-3xl sm:text-4xl lg:text-5xl font-black leading-none transition-colors duration-300 group-hover:text-sky-500"
                  style={{
                    WebkitTextStroke: "1.5px rgba(0,0,0,0.15)",
                    color: "transparent",
                  }}
                >
                  09
                </span>
              </div>

              <h3 className="mt-3 sm:mt-4 text-xl sm:text-xl lg:text-xl xl:text-2xl font-black uppercase leading-tight text-gray-800 wrap-break-word">
                Flexible Timing
              </h3>
            </div>

            <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-gray-600">
              Book at your convenience with flexible scheduling.
            </p>
          </motion.div>

          {/* Card 10 */}
          <motion.div
            variants={slideInBottom}
            className="group rounded-xl sm:rounded-2xl bg-linear-to-br from-gray-900 to-black text-white p-6 sm:p-7 min-h-50 lg:h-75 flex flex-col justify-between gap-6 hover:-translate-y-2 transition duration-300 overflow-hidden border-2 border-sky-400/30"
          >
            <div>
              <div className="flex items-center justify-between">
                <span
                  className="text-3xl sm:text-4xl lg:text-5xl font-black leading-none transition-colors duration-300 group-hover:text-sky-400"
                  style={{
                    WebkitTextStroke: "1.5px rgba(255,255,255,0.3)",
                    color: "transparent",
                  }}
                >
                  10
                </span>
              </div>

              <h3 className="mt-3 sm:mt-4 text-xl sm:text-xl lg:text-xl xl:text-2xl font-black uppercase leading-tight wrap-break-word">
                Safety Priority
              </h3>
            </div>

            <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-gray-300">
              Certified equipment and trained pilots ensuring your safety.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
