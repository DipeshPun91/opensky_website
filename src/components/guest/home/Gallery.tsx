"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
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

// Shared shimmer skeleton — same visual treatment as GalleryMosaic.tsx's
// SkeletonTile, kept in sync so the homepage teaser and the full
// gallery page feel like the same product.
function TileSkeleton() {
  return (
    <div className="absolute inset-0 bg-gray-200 animate-pulse">
      <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
    </div>
  );
}

// A full-section skeleton for this component's FIXED 6-slot layout
// (left: half, half, full — right: full, half, half). This intentionally
// does NOT reuse GalleryMosaic's generic buildColumns() skeleton, since
// this teaser always renders exactly 6 tiles in a fixed arrangement, not
// an arbitrary count.
function GalleryTeaserSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-wrap w-full max-w-7xl mx-auto"
    >
      <div className="flex flex-wrap w-full md:w-1/2">
        <div className="w-1/2 p-1 md:p-2">
          <div className="relative aspect-5/3 overflow-hidden rounded-2xl">
            <TileSkeleton />
          </div>
        </div>
        <div className="w-1/2 p-1 md:p-2">
          <div className="relative aspect-5/3 overflow-hidden rounded-2xl">
            <TileSkeleton />
          </div>
        </div>
        <div className="w-full p-1 md:p-2">
          <div className="relative aspect-5/3 overflow-hidden rounded-2xl">
            <TileSkeleton />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap w-full md:w-1/2">
        <div className="w-full p-1 md:p-2">
          <div className="relative aspect-5/3 overflow-hidden rounded-2xl">
            <TileSkeleton />
          </div>
        </div>
        <div className="w-1/2 p-1 md:p-2">
          <div className="relative aspect-5/3 overflow-hidden rounded-2xl">
            <TileSkeleton />
          </div>
        </div>
        <div className="w-1/2 p-1 md:p-2">
          <div className="relative aspect-5/3 overflow-hidden rounded-2xl">
            <TileSkeleton />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Image with per-tile skeleton loading. Fixed from the previous version:
// onLoadingComplete is a deprecated Next.js <Image> prop (removed in
// recent versions) — using it risked the skeleton getting stuck forever
// if the callback silently stopped firing. onLoad is the current,
// supported equivalent, matching what GalleryMosaic.tsx already uses.
const GalleryImage = ({
  src,
  alt,
  sizes,
  eager = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  eager?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {isLoading && <TileSkeleton />}
      <Image
        src={src}
        alt={alt || "Gallery image"}
        fill
        loading={eager ? "eager" : "lazy"}
        priority={eager}
        className={`object-cover transition-all duration-700 ${
          isLoading
            ? "opacity-0 scale-100"
            : "opacity-100 group-hover:scale-105"
        }`}
        sizes={sizes}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
    </div>
  );
};

export default function Gallery({
  items,
  isLoading = false,
}: {
  items: GalleryItem[];
  isLoading?: boolean;
}) {
  const displayItems = Array.isArray(items) && items.length > 0 ? items : [];
  const safeItems = displayItems.slice(0, 6);

  // Full skeleton state — shown while a parent that fetches this data
  // client-side hasn't resolved yet. Since this component is currently
  // fed by a server component (items arrives already-fetched via
  // props), isLoading defaults to false and this branch won't trigger
  // in that setup — but it's here so this component behaves correctly
  // if it's ever wired to a client-side fetch instead.
  if (isLoading) {
    return (
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={container}
        className="py-16 sm:py-20 md:py-24 bg-linear-to-b from-gray-50 to-white w-full overflow-hidden"
      >
        <div className="w-full px-6 sm:px-10 lg:px-16">
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

          <GalleryTeaserSkeleton />
        </div>
      </motion.section>
    );
  }

  // If no items, show empty state
  if (safeItems.length === 0) {
    return (
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={container}
        className="py-16 sm:py-20 md:py-24 bg-linear-to-b from-gray-50 to-white w-full overflow-hidden"
      >
        <div className="w-full px-6 sm:px-10 lg:px-16">
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

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 py-12"
          >
            No gallery images yet — check back soon.
          </motion.p>
        </div>
      </motion.section>
    );
  }

  const [a, b, c, d, e, f] = safeItems;

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={container}
      className="py-16 sm:py-20 md:py-24 bg-linear-to-b from-gray-50 to-white w-full overflow-hidden"
    >
      <div className="w-full px-6 sm:px-10 lg:px-16">
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

        {/* Gallery Grid */}
        <motion.div
          variants={galleryContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap w-full max-w-7xl mx-auto"
        >
          {/* Left Column - 50% width */}
          <div className="flex flex-wrap w-full md:w-1/2">
            <motion.div variants={slideInBottom} className="w-1/2 p-1 md:p-2">
              <div className="relative aspect-5/3 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gray-100 group">
                <GalleryImage
                  src={b.imageUrl}
                  alt={b.caption || "Gallery image"}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  eager
                />
              </div>
            </motion.div>

            <motion.div variants={slideInBottom} className="w-1/2 p-1 md:p-2">
              <div className="relative aspect-5/3 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gray-100 group">
                <GalleryImage
                  src={c.imageUrl}
                  alt={c.caption || "Gallery image"}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  eager
                />
              </div>
            </motion.div>

            <motion.div variants={slideInBottom} className="w-full p-1 md:p-2">
              <div className="relative aspect-5/3 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gray-100 group">
                <GalleryImage
                  src={a.imageUrl}
                  alt={a.caption || "Gallery image"}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  eager
                />
              </div>
            </motion.div>
          </div>

          {/* Right Column - 50% width */}
          <div className="flex flex-wrap w-full md:w-1/2">
            <motion.div variants={slideInBottom} className="w-full p-1 md:p-2">
              <div className="relative aspect-5/3 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gray-100 group">
                <GalleryImage
                  src={d.imageUrl}
                  alt={d.caption || "Gallery image"}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            <motion.div variants={slideInBottom} className="w-1/2 p-1 md:p-2">
              <div className="relative aspect-5/3 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gray-100 group">
                <GalleryImage
                  src={e.imageUrl}
                  alt={e.caption || "Gallery image"}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </motion.div>

            <motion.div variants={slideInBottom} className="w-1/2 p-1 md:p-2">
              <div className="relative aspect-5/3 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-gray-100 group">
                <GalleryImage
                  src={f.imageUrl}
                  alt={f.caption || "Gallery image"}
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
