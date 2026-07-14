"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  container,
  riseIn,
  slideInBottom,
  createStaggerContainer,
  EASE,
} from "@/lib/animations";
import Seperator from "../ui/Seperator";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1620720970374-5b7e67e1e610?w=800&auto=format&fit=crop&crop=center",
    alt: "Paragliding over mountains",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1530007874544-a6f7674b5a47?w=600&auto=format&fit=crop&crop=center",
    alt: "Paraglider flying",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1607815705213-104c87ea8d0f?w=600&auto=format&fit=crop&crop=center",
    alt: "Tandem paragliding",
  },
  {
    id: 4,
    src: "https://plus.unsplash.com/premium_photo-1666797173828-e93427443e3b?w=800&auto=format&fit=crop&crop=center",
    alt: "Paragliding above Pokhara",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1677856216675-a397a342cdd2?w=600&auto=format&fit=crop&crop=center",
    alt: "Sunset paragliding",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&crop=center",
    alt: "Professional pilot",
  },
];

const galleryContainer = createStaggerContainer(0.1, 0.1);

export default function Gallery() {
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
            Gallery
          </p>

          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight text-gray-800">
            Our Adventures
          </h2>

          <motion.div variants={riseIn}>
            <Seperator />
          </motion.div>
          <motion.p
            variants={riseIn}
            className="mt-6 max-w-2xl mx-auto text-gray-600 leading-7 sm:leading-8 text-sm sm:text-base"
          >
            Experience the beauty of Pokhara Valley and the Himalayas through
            the lens of our adventures.
          </motion.p>
        </motion.div>

        {/* Gallery Grid — mirrored mosaic: left column is two tiles then one
            full-width image, right column is one full-width image then two
            tiles, so the two columns visually zigzag against each other. */}
        <motion.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap max-w-7xl mx-auto md:-m-2 -m-1"
        >
          {/* Left Column - 50% width */}
          <div className="flex flex-wrap w-full md:w-1/2">
            <motion.div variants={slideInBottom} className="md:p-2 p-1 w-1/2">
              <div className="relative aspect-5/3 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
                <Image
                  src={galleryImages[1].src}
                  alt={galleryImages[1].alt}
                  fill
                  className="object-cover hover:scale-105 transition duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </motion.div>

            <motion.div variants={slideInBottom} className="md:p-2 p-1 w-1/2">
              <div className="relative aspect-5/3 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
                <Image
                  src={galleryImages[2].src}
                  alt={galleryImages[2].alt}
                  fill
                  className="object-cover hover:scale-105 transition duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </motion.div>

            <motion.div variants={slideInBottom} className="md:p-2 p-1 w-full">
              <div className="relative aspect-5/3 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
                <Image
                  src={galleryImages[0].src}
                  alt={galleryImages[0].alt}
                  fill
                  className="object-cover hover:scale-105 transition duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Column - 50% width */}
          <div className="flex flex-wrap w-full md:w-1/2">
            <motion.div variants={slideInBottom} className="md:p-2 p-1 w-full">
              <div className="relative aspect-5/3 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
                <Image
                  src={galleryImages[3].src}
                  alt={galleryImages[3].alt}
                  fill
                  className="object-cover hover:scale-105 transition duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            <motion.div variants={slideInBottom} className="md:p-2 p-1 w-1/2">
              <div className="relative aspect-5/3 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
                <Image
                  src={galleryImages[4].src}
                  alt={galleryImages[4].alt}
                  fill
                  className="object-cover hover:scale-105 transition duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </motion.div>

            <motion.div variants={slideInBottom} className="md:p-2 p-1 w-1/2">
              <div className="relative aspect-5/3 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
                <Image
                  src={galleryImages[5].src}
                  alt={galleryImages[5].alt}
                  fill
                  className="object-cover hover:scale-105 transition duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          variants={riseIn}
          className="mt-12 sm:mt-16 flex justify-center max-w-7xl mx-auto"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="inline-flex items-center gap-2 rounded-md bg-sky-500 hover:bg-sky-600 transition-all duration-300 text-white px-5 sm:px-6 py-2.5 sm:py-3 font-semibold uppercase tracking-[2px] shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 group text-xs sm:text-sm"
          >
            View Full Gallery
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
