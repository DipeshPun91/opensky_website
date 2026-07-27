// components/guest/gallery/GalleryMosaic.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { slideInBottom, createStaggerContainer } from "@/lib/animations";
import type { GalleryItem } from "@/lib/gallery";
import { useState, useCallback, useEffect, useMemo } from "react";
import { ImageLightbox } from "./ImageLightbox";
import { FiZoomIn } from "react-icons/fi";

const gridStagger = createStaggerContainer(0.05, 0.08);

type TileSize = "half" | "full";
type Column = "left" | "right";

function sizeForSlot(column: Column, slotIndex: number): TileSize {
  const cycle: TileSize[] =
    column === "left" ? ["half", "half", "full"] : ["full", "half", "half"];
  return cycle[slotIndex % 3];
}

interface Tile {
  item: GalleryItem;
  size: TileSize;
}

function buildColumns(items: GalleryItem[]): { left: Tile[]; right: Tile[] } {
  const left: Tile[] = [];
  const right: Tile[] = [];

  items.forEach((item, i) => {
    const groupIndex = Math.floor(i / 3);
    const slotIndex = i % 3;
    const column: Column = groupIndex % 2 === 0 ? "left" : "right";
    const size = sizeForSlot(column, slotIndex);

    (column === "left" ? left : right).push({ item, size });
  });

  return { left, right };
}

// Skeleton Tile Component - Matches the exact same structure as MosaicTile
function SkeletonTile({ size, index }: { size: TileSize; index: number }) {
  const widthClass = size === "full" ? "w-full" : "w-1/2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`${widthClass} p-1 md:p-2`}
    >
      <div className="relative aspect-5/3 overflow-hidden rounded-2xl bg-gray-200 animate-pulse">
        <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
      </div>
    </motion.div>
  );
}

// Skeleton Grid - Matches the exact same pattern as the gallery
function GallerySkeleton({ count = 12 }: { count?: number }) {
  const skeletonItems = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const groupIndex = Math.floor(i / 3);
      const slotIndex = i % 3;
      const column: Column = groupIndex % 2 === 0 ? "left" : "right";
      const size = sizeForSlot(column, slotIndex);

      items.push({
        id: `skeleton-${i}`,
        size,
        column,
        slotIndex,
        groupIndex,
      });
    }
    return items;
  }, [count]);

  const leftItems = skeletonItems.filter((item) => item.column === "left");
  const rightItems = skeletonItems.filter((item) => item.column === "right");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-wrap w-full"
    >
      <div className="flex flex-wrap w-full md:w-1/2">
        {leftItems.map((item, index) => (
          <SkeletonTile key={item.id} size={item.size} index={index} />
        ))}
      </div>

      <div className="flex flex-wrap w-full md:w-1/2">
        {rightItems.map((item, index) => (
          <SkeletonTile
            key={item.id}
            size={item.size}
            index={leftItems.length + index}
          />
        ))}
      </div>
    </motion.div>
  );
}

function MosaicTile({
  tile,
  onImageClick,
  onImageLoad,
  index,
}: {
  tile: Tile;
  onImageClick: (item: GalleryItem) => void;
  onImageLoad?: () => void;
  index: number;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const widthClass = tile.size === "full" ? "w-full" : "w-1/2";

  const shouldBeEager = index < 4;

  return (
    <motion.div variants={slideInBottom} className={`${widthClass} p-1 md:p-2`}>
      <div
        className="relative aspect-5/3 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer group bg-gray-100"
        onClick={() => onImageClick(tile.item)}
      >
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse">
            <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
          </div>
        )}

        <Image
          src={tile.item.imageUrl}
          alt={tile.item.caption || "Gallery image"}
          fill
          loading={shouldBeEager ? "eager" : "lazy"}
          priority={shouldBeEager}
          className={`object-cover group-hover:scale-105 transition duration-700 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          sizes={
            tile.size === "full"
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 50vw, 25vw"
          }
          onLoad={() => {
            setIsLoading(false);
            onImageLoad?.();
          }}
          onError={() => {
            setIsLoading(false);
            onImageLoad?.();
          }}
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <FiZoomIn className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-lg" />
          </div>
        </div>

        {tile.item.caption && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-sm font-medium line-clamp-2">
              {tile.item.caption}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface GalleryMosaicProps {
  items: GalleryItem[];
  isLoading?: boolean;
}

export default function GalleryMosaic({
  items,
  isLoading = false,
}: GalleryMosaicProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);

  const handleImageClick = useCallback(
    (item: GalleryItem) => {
      const index = items.findIndex((i) => i.id === item.id);
      setCurrentIndex(index);
      setSelectedImage(item);
    },
    [items],
  );

  const handleClose = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setSelectedImage(items[currentIndex - 1]);
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex, items]);

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      setSelectedImage(items[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, items]);

  const handleImageLoad = useCallback(() => {
    setLoadedCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, handlePrevious, handleNext, handleClose]);

  if (isLoading) {
    return <GallerySkeleton count={Math.max(items.length || 12, 12)} />;
  }

  if (!items || items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-16"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-sky-50 to-blue-50 border border-sky-100/50 mb-4 shadow-sm">
          <svg
            className="w-10 h-10 text-sky-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          No Photos Yet
        </h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          We&apos;re currently curating our best moments. Check back soon to
          explore the beauty of Pokhara Valley through our lens.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-sky-200"
              style={{
                animation: `pulse 2s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  const { left, right } = buildColumns(items);

  return (
    <>
      <motion.div
        variants={gridStagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-wrap w-full"
      >
        <div className="flex flex-wrap w-full md:w-1/2">
          {left.map((tile, index) => (
            <MosaicTile
              key={tile.item.id}
              tile={tile}
              index={index}
              onImageClick={handleImageClick}
              onImageLoad={handleImageLoad}
            />
          ))}
        </div>

        <div className="flex flex-wrap w-full md:w-1/2">
          {right.map((tile, index) => (
            <MosaicTile
              key={tile.item.id}
              tile={tile}
              index={left.length + index}
              onImageClick={handleImageClick}
              onImageLoad={handleImageLoad}
            />
          ))}
        </div>
      </motion.div>

      {loadedCount < items.length && loadedCount > 0 && (
        <div className="mt-8 text-center text-sm text-gray-500">
          Loading {loadedCount} of {items.length} images...
        </div>
      )}

      <ImageLightbox
        imageUrl={selectedImage?.imageUrl || ""}
        caption={selectedImage?.caption || undefined}
        isOpen={!!selectedImage}
        onClose={handleClose}
      />
    </>
  );
}
