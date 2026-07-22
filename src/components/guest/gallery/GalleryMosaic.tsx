"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { slideInBottom, createStaggerContainer } from "@/lib/animations";
import type { GalleryItem } from "@/lib/gallery";

const gridStagger = createStaggerContainer(0.05, 0.08);

type TileSize = "half" | "full";
type Column = "left" | "right";

// Left column cycles half, half, full. Right column cycles full, half,
// half — the offset between them is what creates the zigzag: left
// starts small-small-big, right starts big-small-small. Repeating this
// pattern (rather than hardcoding exactly 3 slots) lets any number of
// images keep the same asymmetric look, not just multiples of 3.
function sizeForSlot(column: Column, slotIndex: number): TileSize {
  const cycle: TileSize[] =
    column === "left" ? ["half", "half", "full"] : ["full", "half", "half"];
  return cycle[slotIndex % 3];
}

interface Tile {
  item: GalleryItem;
  size: TileSize;
}

// Images are assigned to columns in alternating groups of 3 — first 3
// go left, next 3 go right, next 3 go left, and so on — exactly how the
// original fixed 6-image blocks worked. This generalizes to any count:
// a trailing group of 1 or 2 images just uses that many slots from the
// size pattern above instead of needing a full group of 3 to render at
// all, so nothing gets dropped or pushed into a separate plain grid.
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

function MosaicTile({ tile }: { tile: Tile }) {
  const widthClass = tile.size === "full" ? "w-full" : "w-1/2";

  return (
    <motion.div variants={slideInBottom} className={`${widthClass} p-1 md:p-2`}>
      <div className="relative aspect-5/3 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
        <Image
          src={tile.item.imageUrl}
          alt={tile.item.caption || "Gallery image"}
          fill
          className="object-cover hover:scale-105 transition duration-700"
          sizes={
            tile.size === "full"
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 50vw, 25vw"
          }
        />
      </div>
    </motion.div>
  );
}

export default function GalleryMosaic({ items }: { items: GalleryItem[] }) {
  if (items.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No gallery images yet — check back soon.
      </p>
    );
  }

  const { left, right } = buildColumns(items);

  return (
    <motion.div
      variants={gridStagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex flex-wrap w-full -m-1 md:-m-2"
    >
      <div className="flex flex-wrap w-full md:w-1/2">
        {left.map((tile) => (
          <MosaicTile key={tile.item.id} tile={tile} />
        ))}
      </div>

      <div className="flex flex-wrap w-full md:w-1/2">
        {right.map((tile) => (
          <MosaicTile key={tile.item.id} tile={tile} />
        ))}
      </div>
    </motion.div>
  );
}
