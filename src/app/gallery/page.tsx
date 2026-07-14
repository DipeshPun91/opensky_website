"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  container,
  riseIn,
  slideInBottom,
  createStaggerContainer,
} from "@/lib/animations";
import Seperator from "@/components/ui/Seperator";

const basePhotos = [
  {
    src: "https://images.unsplash.com/photo-1620720970374-5b7e67e1e610?w=800&auto=format&fit=crop&crop=center",
    alt: "Paragliding over mountains",
  },
  {
    src: "https://images.unsplash.com/photo-1530007874544-a6f7674b5a47?w=600&auto=format&fit=crop&crop=center",
    alt: "Paraglider flying",
  },
  {
    src: "https://images.unsplash.com/photo-1607815705213-104c87ea8d0f?w=600&auto=format&fit=crop&crop=center",
    alt: "Tandem paragliding",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1666797173828-e93427443e3b?w=800&auto=format&fit=crop&crop=center",
    alt: "Paragliding above Pokhara",
  },
  {
    src: "https://images.unsplash.com/photo-1677856216675-a397a342cdd2?w=600&auto=format&fit=crop&crop=center",
    alt: "Sunset paragliding",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&crop=center",
    alt: "Professional pilot",
  },
];

// Repeats the base set 3x (18 slots) so the mosaic pattern has enough
// images to fill a dedicated gallery page rather than just the homepage
// teaser. Each block below consumes exactly 6 images.
const galleryImages = [...basePhotos, ...basePhotos, ...basePhotos].map(
  (img, i) => ({ ...img, id: i + 1 }),
);

// Splits the flat image list into chunks of 6 — one chunk per mosaic block.
function chunkBySix<T>(arr: T[]): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += 6) {
    chunks.push(arr.slice(i, i + 6));
  }
  return chunks;
}

const galleryBlocks = chunkBySix(galleryImages);
const blockStagger = createStaggerContainer(0.1, 0.1);

function MosaicBlock({
  images,
}: {
  images: { id: number; src: string; alt: string }[];
}) {
  // Each block expects exactly 6 images: [half, half, full] on the left,
  // [full, half, half] on the right — same zigzag pattern as the
  // homepage Gallery section.
  const [a, b, c, d, e, f] = images;

  return (
    <motion.div
      variants={blockStagger}
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
              src={a.src}
              alt={a.alt}
              fill
              className="object-cover hover:scale-105 transition duration-700"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        </motion.div>

        <motion.div variants={slideInBottom} className="md:p-2 p-1 w-1/2">
          <div className="relative aspect-5/3 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <Image
              src={b.src}
              alt={b.alt}
              fill
              className="object-cover hover:scale-105 transition duration-700"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        </motion.div>

        <motion.div variants={slideInBottom} className="md:p-2 p-1 w-full">
          <div className="relative aspect-5/3 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <Image
              src={c.src}
              alt={c.alt}
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
              src={d.src}
              alt={d.alt}
              fill
              className="object-cover hover:scale-105 transition duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </motion.div>

        <motion.div variants={slideInBottom} className="md:p-2 p-1 w-1/2">
          <div className="relative aspect-5/3 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <Image
              src={e.src}
              alt={e.alt}
              fill
              className="object-cover hover:scale-105 transition duration-700"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        </motion.div>

        <motion.div variants={slideInBottom} className="md:p-2 p-1 w-1/2">
          <div className="relative aspect-5/3 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <Image
              src={f.src}
              alt={f.alt}
              fill
              className="object-cover hover:scale-105 transition duration-700"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function GalleryPage() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-linear-to-b from-gray-50 to-white w-full overflow-hidden">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={container}
          className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto"
        >
          <motion.p
            variants={riseIn}
            className="uppercase tracking-[4px] text-xs sm:text-sm text-sky-500 font-medium"
          >
            Gallery
          </motion.p>

          <motion.h1
            variants={riseIn}
            className="mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-tight text-gray-900"
          >
            Full Gallery
          </motion.h1>

          <motion.div variants={riseIn}>
            <Seperator />
          </motion.div>

          <motion.p
            variants={riseIn}
            className="mt-6 max-w-2xl mx-auto text-gray-600 leading-7 sm:leading-8 text-sm sm:text-base"
          >
            A closer look at the skies, the valley, and the flights that brought
            people back to Open Sky again and again.
          </motion.p>
        </motion.div>

        {/* Repeating mosaic blocks */}
        <div className="flex flex-col gap-8 sm:gap-10">
          {galleryBlocks.map((block, i) => (
            <MosaicBlock key={i} images={block} />
          ))}
        </div>
      </div>
    </section>
  );
}
