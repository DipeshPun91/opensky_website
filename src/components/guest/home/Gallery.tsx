"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  container,
  riseIn,
  slideInBottom,
  createStaggerContainer,
  EASE,
} from "@/lib/animations";
import Seperator from "../../ui/Seperator";
import type { GalleryItem } from "@/lib/gallery";

const galleryContainer = createStaggerContainer(0.1, 0.1);
const FALLBACK_IMAGE = "/images/background.png";

function createPlaceholderItem(index: number): GalleryItem {
  return {
    id: `placeholder-${index}`,
    imageUrl: FALLBACK_IMAGE,
    caption: "Adventure gallery coming soon",
    order: index,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// Takes real curated images as a prop instead of a hardcoded array.
// The DB fetch (getAllGalleryItems()) happens wherever this component
// is rendered — this stays a single, "use client" file so it can keep
// using Framer Motion directly, same as the original.
export default function Gallery({ items }: { items: GalleryItem[] }) {
  const displayItems = Array.isArray(items) && items.length > 0 ? items : [];
  const safeItems = [
    ...displayItems.slice(0, 6),
    ...Array.from(
      { length: Math.max(0, 6 - displayItems.length) },
      (_, index) => createPlaceholderItem(index),
    ),
  ].slice(0, 6);

  const [a, b, c, d, e, f] = safeItems;

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
                  src={b.imageUrl || FALLBACK_IMAGE}
                  alt={b.caption || "Gallery image"}
                  fill
                  className="object-cover hover:scale-105 transition duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </motion.div>

            <motion.div variants={slideInBottom} className="md:p-2 p-1 w-1/2">
              <div className="relative aspect-5/3 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
                <Image
                  src={c.imageUrl || FALLBACK_IMAGE}
                  alt={c.caption || "Gallery image"}
                  fill
                  className="object-cover hover:scale-105 transition duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </motion.div>

            <motion.div variants={slideInBottom} className="md:p-2 p-1 w-full">
              <div className="relative aspect-5/3 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
                <Image
                  src={a.imageUrl || FALLBACK_IMAGE}
                  alt={a.caption || "Gallery image"}
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
                  src={d.imageUrl || FALLBACK_IMAGE}
                  alt={d.caption || "Gallery image"}
                  fill
                  className="object-cover hover:scale-105 transition duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            <motion.div variants={slideInBottom} className="md:p-2 p-1 w-1/2">
              <div className="relative aspect-5/3 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
                <Image
                  src={e.imageUrl || FALLBACK_IMAGE}
                  alt={e.caption || "Gallery image"}
                  fill
                  className="object-cover hover:scale-105 transition duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </motion.div>

            <motion.div variants={slideInBottom} className="md:p-2 p-1 w-1/2">
              <div className="relative aspect-5/3 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
                <Image
                  src={f.imageUrl || FALLBACK_IMAGE}
                  alt={f.caption || "Gallery image"}
                  fill
                  className="object-cover hover:scale-105 transition duration-700"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Button — previously had no href/onClick at all, a dead
            button. Now links to the full gallery page. */}
        <motion.div
          variants={riseIn}
          className="mt-12 sm:mt-16 flex justify-center max-w-7xl mx-auto"
        >
          <Link href="/gallery">
            <motion.span
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
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
